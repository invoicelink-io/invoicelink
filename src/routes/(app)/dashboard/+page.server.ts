import type { PageServerLoad } from './$types';

export const load = (async ({ parent, locals }) => {
	await parent();
	const { user } = await locals.lucia.validate();
	return { user, title: 'Dashboard' };
}) satisfies PageServerLoad;
