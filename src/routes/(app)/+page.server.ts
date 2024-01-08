import { redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

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

	const bankDetailsCaptured =
		!!userProfile?.bankAccount[0] && userProfile?.bankAccount?.[0]?.accountNo !== '';
	const userIntegration = userProfile?.integrations[0];
	const userGatewayConfigured = userIntegration
		? (userIntegration?.payfast && userIntegration?.payfast.length > 0) ||
			(userIntegration?.yoco && userIntegration?.yoco.length > 0)
		: false;

	const profileTasks = [
		{
			title: 'Update Address',
			complete: !!userProfile?.address,
			link: '/settings#user-address'
		},
		{
			title: 'Configure Gateway',
			complete: userGatewayConfigured,
			link: '/settings/gateway'
		},
		{
			title: 'Add Banking Details',
			complete: bankDetailsCaptured,
			link: '/settings#banking-details'
		}
	];

	return { session, profileTasks, user, title: 'Home' };
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
