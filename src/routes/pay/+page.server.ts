import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ url }) => {
	const id = url.searchParams.get('id');

	if (!id) {
		throw error(404, 'Not found');
	}

	const pay = await prisma.quickLink.findUnique({
		where: {
			id
		},
		include: {
			user: {
				include: {
					Integration: {
						include: {
							payfast: true
						}
					}
				}
			}
		}
	});

	return {
		pay
	};
};
