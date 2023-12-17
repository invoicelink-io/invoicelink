import type { PageServerLoad } from './$types';

export const load = (async ({ parent, locals }) => {
	await parent();
	const { user } = locals;
	return { user, title: 'Invoices' };
}) satisfies PageServerLoad;
