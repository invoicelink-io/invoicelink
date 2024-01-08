import type { PageServerLoad, Actions } from './$types';
import { prisma } from '$lib/server/prisma';
import { defaultInvoice } from '$lib/utils/defaults';
import { message, superValidate } from 'sveltekit-superforms/server';
import { createCheckout } from '$lib/utils/yoco';
import { SerialType } from '@prisma/client';
import { getNextSerial } from '$lib/utils/serialNumbers';
import { schema } from './validation';

export const load = (async ({ parent, locals, url }) => {
	await parent();
	const id = url.searchParams.get('id');

	// get the user
	const user = await prisma.user.findUnique({
		where: {
			id: locals.user?.id
		},
		include: {
			bankAccount: true,
			address: true,
			client: {
				include: {
					address: true
				}
			},
			invoiceStyles: true
		}
	});

	// set the default invoice
	let invoice = { ...defaultInvoice };

	// set the default serial
	invoice.serial = await getNextSerial(locals.user?.id, SerialType.INVOICE);

	// set user based defaults
	if (user) {
		invoice.userId = user.id;
		invoice.user.id = user.id;
		invoice.user.name = user.name;
		invoice.user.email = user.email;
		invoice.user.username = user.username;
		invoice.user.avatarUrl = user.avatarUrl;
		invoice.user.vatNumber = user.vatNumber;

		if (user.address) {
			invoice.sendersAddressId = user.address[0].id;
			invoice.sendersAddress = user.address[0];
		}

		if (user.bankAccount) {
			invoice.user.bankAccount = user.bankAccount;
		}
	}

	if (id) {
		const dbInvoice = await prisma.invoice.findUnique({
			where: {
				id
			},
			include: {
				client: {
					include: {
						address: true
					}
				},
				sendersAddress: true,
				lineItems: true,
				user: {
					include: {
						bankAccount: true
					}
				}
			}
		});

		if (dbInvoice) {
			invoice = dbInvoice;
		}
	}

	const form = await superValidate(invoice, schema);
	return { user, form, title: 'Invoice templates' };
}) satisfies PageServerLoad;

export const actions: Actions = {
	create: async ({ request, locals, url }) => {
		const { user } = locals;
		const form = await superValidate(request, schema);

		if (!form.valid) {
			return message(form, 'Invalid invoice');
		}

		if (form.data.clientId === '') {
			return message(form, 'Please select a client', {
				status: 400
			});
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

			// create the invoice
			if (user?.id) {
				let invoice = await prisma.invoice.create({
					data: {
						issueDate: form.data.issueDate,
						dueDate: form.data.dueDate,
						description: form.data.description,
						status: form.data.status,
						userId: user?.id,
						subtotal: form.data.subtotal,
						tax: form.data.tax,
						total: form.data.total,
						serial: form.data.serial,
						clientId: form.data.clientId,
						invoiceStyleId: form.data.invoiceStyleId,
						sendersAddressId: form.data.sendersAddressId,
						lineItems: {
							create: form.data.lineItems.map((item) => {
								return {
									description: item.description,
									quantity: item.quantity,
									amount: item.amount
								};
							})
						}
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
						console.log(yocoErrors);
						// delete the quick link
						await prisma.invoice.delete({
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
				return message(form, 'Invoice created');
			}
		} catch (error) {
			console.error(error);
			return message(form, 'Failed to create invoice', {
				status: 400
			});
		}
	},
	delete: async ({ request, locals }) => {
		const { user } = locals;
		const form = await superValidate(request, schema);

		if (!form.valid) {
			return message(form, 'Invalid invoice');
		}

		try {
			await prisma.invoice.delete({
				where: {
					id: form.data.id
				}
			});

			// get the next serial number
			const serial = await getNextSerial(user?.id, SerialType.INVOICE);

			form.data = { ...form, ...defaultInvoice, serial };
			return message(form, 'Invoice deleted');
		} catch (error) {
			console.error(error);
			return message(form, 'Failed to delete invoice', {
				status: 400
			});
		}
	},
	update: async ({ request, url, locals }) => {
		const form = await superValidate(request, schema);

		if (!form.valid) {
			return message(form, 'Invalid invoice');
		}

		try {
			const updatedInvoice = await prisma.invoice.update({
				where: {
					id: form.data.id
				},
				data: {
					issueDate: form.data.issueDate,
					dueDate: form.data.dueDate,
					description: form.data.description,
					status: form.data.status,
					userId: form.data.userId,
					subtotal: form.data.subtotal,
					tax: form.data.tax,
					total: form.data.total,
					serial: form.data.serial,
					clientId: form.data.clientId,
					invoiceStyleId: form.data.invoiceStyleId,
					sendersAddressId: form.data.sendersAddressId,
					lineItems: {
						deleteMany: {
							invoiceId: form.data.id
						},
						create: form.data.lineItems.map((item) => {
							return {
								description: item.description,
								quantity: item.quantity,
								amount: item.amount
							};
						})
					}
				},
				include: {
					client: {
						include: {
							address: true
						}
					},
					sendersAddress: true,
					lineItems: true,
					user: {
						include: {
							bankAccount: true
						}
					}
				}
			});

			// Update yoco link
			// NOTE: Update this when adding more payment gateways
			// check if the user has an active integration
			const userIntegration = await prisma.integration.findFirst({
				where: {
					userId: locals.user?.id
				},
				include: {
					payfast: true,
					yoco: true
				}
			});
			if (userIntegration && userIntegration.yoco.length > 0) {
				const yocoIntegration = userIntegration.yoco[0];
				const { errors: yocoErrors, checkout: yocoCheckout } = await createCheckout({
					secretKey: yocoIntegration.secretKey,
					amount: updatedInvoice.total,
					cancelUrl: `${url.origin}/pay?id=${updatedInvoice.id}`,
					failureUrl: `${url.origin}/pay?id=${updatedInvoice.id}`,
					successUrl: `${url.origin}/pay?id=${updatedInvoice.id}`
				});

				if (yocoErrors) {
					console.log(yocoErrors);
					// delete the invoice
					await prisma.invoice.delete({
						where: {
							id: updatedInvoice.id
						}
					});

					return message(form, 'Failed to create yoco checkout', {
						status: 400
					});
				}

				// update the invoice with the yoco checkoutId
				const updatedWithYoco = await prisma.invoice.update({
					where: {
						id: updatedInvoice.id
					},
					data: {
						yocoCheckoutId: yocoCheckout?.id
					}
				});
				updatedInvoice.yocoCheckoutId = updatedWithYoco.yocoCheckoutId;
			}

			form.data = updatedInvoice;
			return message(form, 'Invoice updated');
		} catch (error) {
			console.error(error);
			return message(form, 'Failed to update invoice', {
				status: 400
			});
		}
	}
};
