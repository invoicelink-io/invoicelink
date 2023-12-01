import type { PageServerLoad } from './$types';

export const load = (async ({ parent, locals, cookies }) => {
	await parent();
	const { user } = await locals?.lucia.validate();
	return { user, title: 'Settings', theme: cookies.get('colortheme') };
}) satisfies PageServerLoad;
