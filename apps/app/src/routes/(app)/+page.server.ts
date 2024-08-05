import { redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { prisma } from '$lib/server/prisma';

export const load = (async ({ parent, locals, cookies }) => {
	await parent();
	const { session, user } = locals;

	const unpaidInvoices = await prisma.invoice.aggregate({
		_sum: {
			total: true
		},
		where: {
			userId: user?.id,
			NOT: {
				status: 'PAID'
			}
		}
	});

	const unpaidQuickLinks = await prisma.quickLink.aggregate({
		_count: {
			id: true
		},
		where: {
			userId: user?.id,
			NOT: {
				status: 'PAID'
			}
		}
	});

	return {
		session,
		user,
		title: 'Home',
		theme: cookies.get('colortheme'),
		stats: {
			unpaidInvoices: unpaidInvoices?._sum?.total ?? 0,
			unpaidQuickLinks: unpaidQuickLinks?._count?.id ?? 0
		}
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	setTheme: async ({ url, cookies }) => {
		const theme = url.searchParams.get('theme');
		const redirectTo = url.searchParams.get('redirectTo');

		if (theme) {
			cookies.set('colortheme', theme, {
				maxAge: 60 * 60 * 24 * 365,
				path: '/'
			});
		}

		redirect(303, redirectTo ?? '/');
	}
};
