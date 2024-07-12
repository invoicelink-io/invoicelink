import { redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { prisma } from '$lib/server/prisma';

export const load = (async ({ parent, locals }) => {
	await parent();
	const { session, user } = locals;

	const userProfile = await prisma.user.findUnique({
		where: {
			id: user?.id
		},
		include: {
			address: true,
			integrations: {
				include: {
					payfast: true,
					yoco: true
				}
			},
			bankAccount: true
		}
	});

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

	console.log({ unpaidInvoices, unpaidQuickLinks });

	const userAddressCaptured = !!userProfile?.address[0] && userProfile?.address?.[0]?.line1 !== '';
	const bankDetailsCaptured =
		!!userProfile?.bankAccount[0] && userProfile?.bankAccount?.[0]?.accountNo !== '';
	const userIntegration = userProfile?.integrations[0];
	const userGatewayConfigured = userIntegration
		? (userIntegration?.payfast && userIntegration?.payfast.length > 0) ||
			(userIntegration?.yoco && userIntegration?.yoco.length > 0)
		: false;

	const profileTasks = [
		{
			title: 'Address',
			complete: userAddressCaptured,
			link: '/settings#user-address'
		},
		{
			title: 'Payment Gateway',
			complete: userGatewayConfigured,
			link: '/settings/gateway'
		},
		{
			title: 'Banking Details',
			complete: bankDetailsCaptured,
			link: '/settings#banking-details'
		}
	];

	return {
		session,
		profileTasks,
		user,
		title: 'Home',
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
