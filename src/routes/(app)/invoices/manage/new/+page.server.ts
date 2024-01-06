import type { PageServerLoad, Actions } from './$types';
import { prisma } from '$lib/server/prisma';
import { defaultInvoice } from '$lib/utils/defaults';
import { InvoiceSchema } from '$lib/zod';
import { message, superValidate } from 'sveltekit-superforms/server';
import { createCheckout } from '$lib/utils/yoco';
import { SerialType } from '@prisma/client';
import { incrementSerialNumber, initializeSerialNumber } from '$lib/utils/serialNumbers';

export const load = (async ({ parent, locals }) => {
	await parent();

	const user = await prisma.user.findUnique({
		where: {
			id: locals.user?.id
		},
		include: {
			bankAccount: true,
			address: true,
			client: true,
			invoiceStyles: true
		}
	});

	let serial = initializeSerialNumber(SerialType.INVOICE);
	if (user) {
		// get last used serial
		const lastSerial = (
			await prisma.lastUsedSerial.findUnique({
				where: {
					userId_type: {
						userId: user?.id,
						type: SerialType.INVOICE
					}
				}
			})
		)?.serial;
		serial = lastSerial
			? incrementSerialNumber(lastSerial)
			: initializeSerialNumber(SerialType.INVOICE);
	}

	const form = await superValidate({ ...defaultInvoice, serial }, InvoiceSchema);
	return { user, form, title: 'Invoice templates' };
}) satisfies PageServerLoad;

export const actions: Actions = {
	create: async ({ request, locals, url }) => {
		const { user } = locals;
		const form = await superValidate(request, InvoiceSchema);

		if (!form.valid) {
			return message(form, 'Invalid quick link!');
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

			// Check the user has an active integration
			if (bankDetails?.accountNo !== '') {
				// skip the remaining checks
			} else if (userIntegration?.payfast.length === 0 && userIntegration?.yoco.length === 0) {
				return message(form, 'Payment or bank details required', {
					status: 400
				});
			}

			// create the quick link
			if (user?.id) {
				let invoice = await prisma.invoice.create({
					data: {
						...form.data,
						sendersAddress: {
							connect: {
								id: userAddress.id
							}
						},
						user: {
							connect: {
								id: user?.id
							}
						},
						client: {}
					}
				});

				// If the user has a yoco integration, create and store a checkout
				if (userIntegration && userIntegration.yoco.length > 0) {
					const yocoIntegration = userIntegration.yoco[0];
					const { errors: yocoErrors, checkout: yocoCheckout } = await createCheckout({
						secretKey: yocoIntegration.secretKey,
						amount: form.data.total,
						cancelUrl: `${url.origin}/pay?id=${invoice.id}`,
						failureUrl: `${url.origin}/pay?id=${invoice.id}`,
						successUrl: `${url.origin}/pay?id=${invoice.id}`
					});

					if (yocoErrors) {
						// delete the quick link
						await prisma.quickLink.delete({
							where: {
								id: invoice.id
							}
						});

						return message(form, 'Failed to create yoco checkout', {
							status: 400
						});
					}

					// update the quick link with the yoco checkoutId
					invoice = await prisma.invoice.update({
						where: {
							id: invoice.id
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
						type: SerialType.INVOICE
					},
					update: {
						serial: form.data.serial
					},
					where: {
						userId_type: {
							userId: user?.id,
							type: SerialType.INVOICE
						}
					}
				});

				form.data.id = invoice.id;
				return message(form, 'Invoice created!');
			}
		} catch (error) {
			console.error(error);
			return message(form, 'Failed to create invoice', {
				status: 400
			});
		}
	}
};
