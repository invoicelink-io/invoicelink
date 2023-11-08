import { superValidate } from 'sveltekit-superforms/server';
import type { PageServerLoad } from './$types';
import { schema } from './validation';

export const load = (async ({ parent, locals }) => {
	await parent();
	// fetch users integrations
	const quickLink = {
		id: '123',
		amount: 250
	};

	const form = await superValidate(quickLink, schema);

	const links = await prisma.quickLink.findMany({
		where: {
			user_id: locals?.session?.user?.id
		}
	});

	return { user: locals?.session?.user, title: 'Quick Links', form, links };
}) satisfies PageServerLoad;
