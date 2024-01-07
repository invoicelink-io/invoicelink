import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';

export const load = (async ({ parent, locals }) => {
	await parent();
	const { user } = locals;

	const invoices = await prisma.invoice.findMany({
		where: {
			userId: user?.id
		},
		include: {
			client: true
		},
		orderBy: {
			issueDate: 'desc'
		}
	});

	return { user, invoices, title: 'Invoices' };
}) satisfies PageServerLoad;
