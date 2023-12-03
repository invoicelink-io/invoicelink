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
	updateProfile: async ({ request, locals }) => {
		const { user } = await locals.lucia.validate();
		const form = await superValidate(request, schema);

		if (!form.valid) {
			return message(form, 'Invalid profile');
		}

		await prisma.user.update({
			data: {
				name: form.data.name
			},
			where: {
				id: user?.id
			}
		});

		return message(form, 'Profile updated');
	}
};
