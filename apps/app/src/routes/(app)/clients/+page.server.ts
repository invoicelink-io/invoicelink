import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';
import { clientActions } from '$lib/server/actions/client';

export const load = (async ({ parent, locals }) => {
	await parent();
	const { session, user } = locals;

	const clients = await prisma.client.findMany({
		where: {
			userId: user?.id
		},
		include: {
			address: true
		}
	});
	console.log('Running clients page server load', {
		clients
	});
	return { session, user, clients, title: 'Clients' };
}) satisfies PageServerLoad;

export const actions = {
	...clientActions
};
