import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ parent, locals }) => {
	await parent();
	const { user } = locals;

	return {
		user
	};
};
