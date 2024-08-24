import type { PageServerLoad } from './$types';
import { getIntegrations } from '$lib/utils/integrations';

export const load = (async ({ parent, locals }) => {
	await parent();
	const { user } = locals;

	const integrationStatus: Record<string, 'disabled' | 'enabled' | 'coming soon'> = {
		payfast: 'disabled'
	};

	// fetch users integrations
	const userIntegrations = await getIntegrations(user?.id);

	// update integration statuses
	if (userIntegrations?.payfast[0]?.active) {
		integrationStatus.payfast = 'enabled';
	}

	if (userIntegrations?.yoco[0]?.active) {
		integrationStatus.yoco = 'enabled';
	}

	return {
		user,
		title: 'Payment Gateway Settings',
		integrationStatus
	};
}) satisfies PageServerLoad;
