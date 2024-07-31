import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';

export const load = (async ({ parent, locals }) => {
	await parent();
	const { user } = locals;

	const templates =
		(await prisma.invoiceStyles.findMany({
			where: {
				userId: user?.id
			}
		})) ?? [];
	return { user, templates, title: 'Invoice Style Templates' };
}) satisfies PageServerLoad;
