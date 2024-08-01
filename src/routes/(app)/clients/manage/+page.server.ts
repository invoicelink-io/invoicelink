import { schema } from './validation';
import { message, superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad, Actions } from './$types';
import { defaultAddress, defaultClient } from '$lib/utils/defaults';
import { prisma } from '$lib/server/prisma';

export const load = (async ({ parent, locals, url }) => {
	await parent();
	const { session, user } = locals;
	const id = url.searchParams.get('id');

	let client = {
		...defaultClient,
		...defaultAddress
	};

	if (id) {
		const dbClient = await prisma.client.findUnique({
			where: {
				id
			},
			include: {
				address: true
			}
		});

		if (dbClient && dbClient.address) {
			client = {
				id: dbClient?.id ?? '',
				name: dbClient?.name ?? '',
				email: dbClient?.email ?? '',
				phone: dbClient?.phone ?? '',
				vatNumber: dbClient?.vatNumber ?? '',
				userId: dbClient?.userId ?? '',
				createdAt: dbClient?.createdAt ?? new Date(),
				updatedAt: dbClient?.updatedAt ?? new Date(),
				addressId: dbClient?.addressId ?? '',
				line1: dbClient?.address.line1 ?? '',
				line2: dbClient?.address.line2 ?? '',
				line3: dbClient?.address.line3 ?? '',
				postalCode: dbClient?.address.postalCode ?? ''
			};
		}
	}

	const form = await superValidate(client, zod(schema));

	return { session, user, form, title: 'Clients' };
}) satisfies PageServerLoad;

export const actions: Actions = {
	create: async ({ locals, request }) => {
		const { user } = locals;
		const form = await superValidate(request, zod(schema));

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
	update: async ({ locals, request }) => {
		const { user } = locals;
		const form = await superValidate(request, zod(schema));

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
	delete: async ({ request }) => {
		const form = await superValidate(request, zod(schema));
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
