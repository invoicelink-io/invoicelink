import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';

export const load = (async ({ url }) => {
	const type = url.searchParams.get('type') as 'quick' | 'invoice';
	const id = url.searchParams.get('id');

	if (type === 'quick' && id) {
		const data = await prisma.quickLink.findUnique({
			where: {
				id
			},
			include: {
				user: {
					include: {
						address: true
					}
				}
			}
		});
		return { type, data };
	} else {
		return { type };
	}
}) satisfies PageServerLoad;
