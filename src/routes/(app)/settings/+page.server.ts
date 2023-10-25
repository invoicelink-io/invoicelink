import type { PageServerLoad } from './$types';

export const load = (async ({ parent, locals, cookies }) => {
	await parent();
	return { user: locals?.session?.user, title: 'Settings', theme: cookies.get('colortheme') };
}) satisfies PageServerLoad;
