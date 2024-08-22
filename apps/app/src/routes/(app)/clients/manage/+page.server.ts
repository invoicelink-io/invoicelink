import { superValidate } from 'sveltekit-superforms/server';
import { clientAddressSchema } from '$lib/validation';
import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types';
import { defaultAddress, defaultClient } from '@invoicelink/lib/defaults';
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

	const form = await superValidate(client, zod(clientAddressSchema));

	return { session, user, form, title: 'Clients' };
}) satisfies PageServerLoad;
