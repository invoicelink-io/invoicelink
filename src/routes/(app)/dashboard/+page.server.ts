import type { PageServerLoad } from './$types';

export const load = (async ({ parent, locals }) => {
	await parent();
	return { user: locals?.session?.user };
}) satisfies PageServerLoad;
