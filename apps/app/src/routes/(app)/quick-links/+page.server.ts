import type { Actions, PageServerLoad } from './$types';
import { superValidate, message } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import { prisma } from '$lib/server/prisma';
import { SerialType } from '@prisma/client';
import { incrementSerialNumber } from '$lib/utils/serialNumbers';
import { createYocoCheckout } from '@invoicelink/lib/payments';
import { quickLinkSchema, deleteSchema } from '$lib/validation';
import { generateId } from '@invoicelink/lib';

export const load = (async ({ parent, locals }) => {
	await parent();
	const { user } = locals;

	const deleteForm = await superValidate({ id: '' }, zod(deleteSchema));

	const links = await prisma.quickLink.findMany({
		where: {
			userId: user?.id
		},
		orderBy: {
			createdAt: 'desc'
		}
	});

	return { user, title: 'Quick Links', deleteForm, links };
}) satisfies PageServerLoad;

export const actions: Actions = {
	create: async ({ request, locals, url }) => {
		const { user } = locals;
		const form = await superValidate(request, zod(quickLinkSchema));

		if (!form.valid) {
			return message(form, 'Invalid quick link');
		}

		try {
			// NOTE: Update this when adding more payment gateways
			// check if the user has an active integration
			const userIntegration = await prisma.integration.findFirst({
				where: {
					userId: user?.id
				},
				include: {
					payfast: true,
					yoco: true
				}
			});

			const userAddress = await prisma.address.findFirst({
				where: {
					userId: user?.id
				}
			});

			const bankDetails = await prisma.bankAccount.findFirst({
				where: {
					userId: user?.id
				}
			});

			// Check the user has an address
			if (!userAddress) {
				return message(form, 'No user address found', {
					status: 400
				});
			} else if (userAddress && userAddress.line1 === '') {
				return message(form, 'Please update user address', {
					status: 400
				});
			}

			// Check the user has an active integration or bank details
			const bankDetailsCaptured = !!bankDetails && bankDetails?.accountNo !== '';
			const userGatewayConfigured = userIntegration
				? (userIntegration?.payfast && userIntegration?.payfast.length > 0) ||
					(userIntegration?.yoco && userIntegration?.yoco.length > 0)
				: false;

			if (bankDetailsCaptured) {
				// skip the remaining checks
				console.log('User has bank details. Skipping remaining checks');
			} else if (userGatewayConfigured) {
				console.log('User has gateway configured. Skipping remaining checks');
			} else {
				return message(form, 'Payment or bank details required', {
					status: 400
				});
			}

			// create the quick link
			if (user?.id) {
				let quickLink = await prisma.quickLink.create({
					data: {
						id: generateId(),
						subtotal: form.data.amount,
						tax: 0,
						total: form.data.amount,
						serial: form.data.serial,
						description: form.data.description,
						sendersAddress: {
							connect: {
								id: userAddress.id
							}
						},
						user: {
							connect: {
								id: user?.id
							}
						}
					}
				});

				// If the user has a yoco integration, create and store a checkout
				if (userIntegration && userIntegration.yoco.length > 0) {
					const yocoIntegration = userIntegration.yoco[0];
					const { errors: yocoErrors, checkout: yocoCheckout } = await createYocoCheckout({
						secretKey: yocoIntegration.secretKey,
						amount: form.data.amount,
						cancelUrl: `${url.origin}/${quickLink.id}`,
						failureUrl: `${url.origin}/${quickLink.id}`,
						successUrl: `${url.origin}/${quickLink.id}`
					});

					if (yocoErrors) {
						// delete the quick link
						await prisma.quickLink.delete({
							where: {
								id: quickLink.id
							}
						});

						return message(form, 'Failed to create yoco checkout', {
							status: 400
						});
					}

					// update the quick link with the yoco checkoutId
					quickLink = await prisma.quickLink.update({
						where: {
							id: quickLink.id
						},
						data: {
							yocoCheckoutId: yocoCheckout?.id
						}
					});
				}

				await prisma.lastUsedSerial.upsert({
					create: {
						serial: form.data.serial,
						userId: user?.id,
						type: SerialType.QUICK_LINK
					},
					update: {
						serial: form.data.serial
					},
					where: {
						userId_type: {
							userId: user?.id,
							type: SerialType.QUICK_LINK
						}
					}
				});

				form.data.id = quickLink.id;
				form.data.serial = incrementSerialNumber(quickLink.serial);
				form.data.description = '';
				return message(form, 'Quick link created');
			}
		} catch (error) {
			console.error(error);
			return message(form, 'Failed to create quick link', {
				status: 400
			});
		}
	},
	delete: async ({ request, url }) => {
		const deleteForm = await superValidate(request, zod(deleteSchema));
		const quickLinkId = url.searchParams.get('id');
		if (quickLinkId) {
			try {
				await prisma.quickLink.delete({
					where: {
						id: quickLinkId
					}
				});

				return message(deleteForm, 'Quick link deleted');
			} catch (error) {
				console.error(error);
				return message(deleteForm, 'Failed to delete quick link', {
					status: 400
				});
			}
		}
	}
};
