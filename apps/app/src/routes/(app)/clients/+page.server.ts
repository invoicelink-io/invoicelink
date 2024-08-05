import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';

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
	return { session, user, clients, title: 'Clients' };
}) satisfies PageServerLoad;
