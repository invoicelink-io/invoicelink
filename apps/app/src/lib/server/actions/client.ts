import { clientAddressSchema } from '$lib/validation';
import { defaultAddress, defaultClient } from '@invoicelink/lib/defaults';
import type { Actions } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { message, superValidate } from 'sveltekit-superforms/server';
import { prisma } from '$lib/server/prisma';

export const clientActions: Actions = {
	createClient: async ({ locals, request }) => {
		const { user } = locals;
		const form = await superValidate(request, zod(clientAddressSchema));

		if (!form.valid) {
			return message(form, 'Invalid contact details');
		}

		if (!user?.id) {
			return message(form, 'User not found');
		}

		try {
			const createdClient = await prisma.client.create({
				data: {
					name: form.data.name,
					email: form.data.email ?? '',
					phone: form.data.phone ?? '',
					vatNumber: form.data.vatNumber ?? '',
					user: {
						connect: {
							id: user.id
						}
					},
					address: {
						create: {
							line1: form.data.line1,
							line2: form.data.line2 ?? '',
							line3: form.data.line3 ?? '',
							postalCode: form.data.postalCode
						}
					}
				}
			});

			form.data.id = createdClient.id;
			form.data.addressId = createdClient.addressId;
			return message(form, 'Client created');
		} catch (error) {
			console.error(error);
			return message(form, 'Failed to create client', {
				status: 400
			});
		}
	},
	updateClient: async ({ locals, request }) => {
		const { user } = locals;
		const form = await superValidate(request, zod(clientAddressSchema));

		if (!form.valid) {
			return message(form, 'Invalid contact details');
		}

		if (!user?.id) {
			return message(form, 'User not found');
		}

		try {
			const updatedClient = await prisma.client.update({
				where: {
					id: form.data.id
				},
				data: {
					name: form.data.name,
					email: form.data.email ?? '',
					phone: form.data.phone ?? '',
					vatNumber: form.data.vatNumber ?? '',
					address: {
						update: {
							line1: form.data.line1,
							line2: form.data.line2 ?? '',
							line3: form.data.line3 ?? '',
							postalCode: form.data.postalCode
						}
					}
				}
			});

			form.data.id = updatedClient.id;
			form.data.addressId = updatedClient.addressId;
			return message(form, 'Client updated');
		} catch (error) {
			console.error(error);
			return message(form, 'Failed to update client', {
				status: 400
			});
		}
	},
	deleteClient: async ({ request }) => {
		const form = await superValidate(request, zod(clientAddressSchema));
		const clientId = form.data.id;
		const clientAddressId = form.data.addressId;

		if (clientId) {
			try {
				// delete the client and associated address
				await prisma.client.delete({
					where: {
						id: clientId
					}
				});

				await prisma.address.delete({
					where: {
						id: clientAddressId
					}
				});

				form.data = {
					...defaultClient,
					...defaultAddress
				};
				return message(form, 'Client deleted');
			} catch (error) {
				if (error instanceof Error) {
					console.error(error.message);
					// check if fail is due to foreign key constraint
					if (error.message.toLowerCase().includes('invoice_clientid_fkey')) {
						return message(form, 'Client has associated invoices ', {
							status: 404
						});
					}
				}
				return message(form, 'Failed to delete client', {
					status: 400
				});
			}
		}
	}
};
