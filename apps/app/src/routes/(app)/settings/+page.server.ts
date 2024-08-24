import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	if (url.pathname === '/settings') {
		redirect(301, '/settings/general');
	}

	return {};
};
