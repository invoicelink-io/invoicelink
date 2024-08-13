import { prisma } from '$lib/server/prisma';

export async function getProfileTasks(userId: string | undefined) {
	if (!userId) {
		return [];
	}

	const userProfile = await prisma.user.findUnique({
		where: {
			id: userId
		},
		include: {
			address: true,
			integrations: {
				include: {
					payfast: true,
					yoco: true,
					stripe: true
				}
			},
			bankAccount: true
		}
	});

	const userAddressCaptured = !!userProfile?.address[0] && userProfile?.address?.[0]?.line1 !== '';
	const bankDetailsCaptured =
		!!userProfile?.bankAccount[0] && userProfile?.bankAccount?.[0]?.accountNo !== '';
	const userIntegration = userProfile?.integrations[0];
	const userGatewayConfigured = userIntegration
		? (userIntegration?.payfast && userIntegration?.payfast.length > 0) ||
			(userIntegration?.yoco && userIntegration?.yoco.length > 0) ||
			(userIntegration?.stripe && userIntegration?.stripe.length > 0)
		: false;

	return [
		{
			title: 'Address',
			complete: userAddressCaptured,
			link: '/settings/general/invoicing'
		},
		{
			title: 'Banking Details',
			complete: bankDetailsCaptured,
			link: '/settings/general/invoicing'
		},
		{
			title: 'Payment Gateway',
			complete: userGatewayConfigured,
			link: '/settings/gateway'
		}
	];
}
