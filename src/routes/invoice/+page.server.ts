import type { PageServerLoad } from './$types';

export const load = (async ({ url }) => {
	const type = url.searchParams.get('type');
	const id = url.searchParams.get('id');
	return { id, type };
}) satisfies PageServerLoad;
