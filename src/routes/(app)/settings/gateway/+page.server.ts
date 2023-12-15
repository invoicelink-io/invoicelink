import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';

export const load = (async ({ parent, locals }) => {
	await parent();
	const { user } = await locals.lucia.validate();

	const integrationStatus: Record<string, 'disabled' | 'enabled' | 'coming soon'> = {
		payfast: 'disabled'
	};

	// fetch users integrations
	const userIntegrations = await prisma.integration.findFirst({
		where: {
			userId: user?.id
		},
		include: {
			payfast: true,
			yoco: true
		}
	});

	// update integration statuses
	if (userIntegrations?.payfast[0]) {
		if (userIntegrations.payfast[0].active) {
			integrationStatus.payfast = 'enabled';
		}
	} else if (userIntegrations?.yoco[0]) {
		if (userIntegrations.yoco[0].active) {
			integrationStatus.yoco = 'enabled';
		}
	}

	return {
		user,
		title: 'Payment Gateway Settings',
		integrationStatus
	};
}) satisfies PageServerLoad;
