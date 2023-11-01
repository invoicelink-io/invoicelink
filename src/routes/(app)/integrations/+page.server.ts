import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';

export const load = (async ({ parent, locals }) => {
	await parent();

	const integrationStatus: Record<string, 'disabled' | 'enabled' | 'coming soon'> = {
		payfast: 'disabled'
	};

	// fetch users integrations
	const userIntegrations = await prisma.integration.findFirst({
		where: {
			user_id: locals?.session?.user?.id
		},
		include: {
			payfast: true
		}
	});

	// update integration statuses
	if (userIntegrations?.payfast[0]) {
		if (userIntegrations.payfast[0].active) {
			integrationStatus.payfast = 'enabled';
		}
	}

	return {
		user: locals?.session?.user,
		title: 'Integrations',
		integrationStatus
	};
}) satisfies PageServerLoad;
