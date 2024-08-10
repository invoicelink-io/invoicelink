import type { PageServerLoad, Actions } from './$types';
import { superValidate, message } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import { profileSchema } from './validation';
import { prisma } from '$lib/server/prisma';
import { currencySchema } from '$lib/validation';

export const load = (async ({ parent, locals, cookies }) => {
	await parent();
	const { user } = locals;

	const profileForm = await superValidate(user, zod(profileSchema));

	const dbUser = await prisma.user.findFirst({
		where: {
			id: user?.id
		},
		select: {
			id: true,
			currency: true
		}
	});

	const currencyForm = await superValidate(dbUser, zod(currencySchema));

	return {
		user,
		title: 'Settings',
		theme: cookies.get('colortheme'),
		profileForm,
		currencyForm
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
	},
	updateCurrency: async ({ request, locals }) => {
		const { user } = locals;
		const currencyForm = await superValidate(request, zod(currencySchema));

		if (!currencyForm.valid) {
			return message(currencyForm, 'Invalid currency');
		}

		await prisma.user.update({
			where: {
				id: user?.id
			},
			data: {
				currency: currencyForm.data.currency
			}
		});
		return message(currencyForm, 'Currency choice updated');
	}
};
