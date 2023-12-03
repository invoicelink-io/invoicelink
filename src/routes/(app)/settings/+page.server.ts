import type { PageServerLoad, Actions } from './$types';
import { superValidate, message } from 'sveltekit-superforms/server';
import { schema } from './validation';
import { prisma } from '$lib/server/prisma';

export const load = (async ({ parent, locals, cookies }) => {
	await parent();
	const { user } = await locals.lucia.validate();
	const form = superValidate(user, schema);
	return {
		user,
		title: 'Settings',
		theme: cookies.get('colortheme'),
		form
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	updateName: async ({ request, locals }) => {
		const { user } = await locals.lucia.validate();
		console.log({ request });
		const form = await superValidate(request, schema);
		console.log({ form });

		if (!form.valid) {
			return message(form, 'Invalid name');
		}

		await prisma.user.update({
			data: {
				name: form.data.name
			},
			where: {
				id: user?.id
			}
		});

		return message(form, 'Name updated');
	}
};
