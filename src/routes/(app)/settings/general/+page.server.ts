import type { PageServerLoad, Actions } from './$types';
import { superValidate, message } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import { profileSchema } from './validation';
import { prisma } from '$lib/server/prisma';

export const load = (async ({ parent, locals, cookies, url }) => {
	await parent();
	const { user } = locals;

	const profileForm = await superValidate(user, zod(profileSchema));

	return {
		user,
		title: 'Settings',
		theme: cookies.get('colortheme'),
		profileForm
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	updateProfile: async ({ request, locals }) => {
		const { user } = locals;
		const profileForm = await superValidate(request, zod(profileSchema));

		if (!profileForm.valid) {
			return message(profileForm, 'Invalid profile');
		}

		await prisma.user.update({
			data: {
				name: profileForm.data.name
			},
			where: {
				id: user?.id
			}
		});

		return message(profileForm, 'Profile updated');
	}
};
