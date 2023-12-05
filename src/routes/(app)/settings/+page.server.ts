import type { PageServerLoad, Actions } from './$types';
import { superValidate, message } from 'sveltekit-superforms/server';
import { profileSchema, addressSchema } from './validation';
import { prisma } from '$lib/server/prisma';

export const load = (async ({ parent, locals, cookies }) => {
	await parent();
	const { user } = await locals.lucia.validate();
	const profileForm = superValidate(user, profileSchema);

	const res = await prisma.address.findFirst({
		where: {
			userId: user?.id
		}
	});

	let address = res;
	if (!res) {
		// create an address entry
		address = await prisma.address.create({
			data: {
				line1: '',
				postalCode: '',
				user: {
					connect: {
						id: user?.id
					}
				}
			}
		});
	}

	const addressForm = superValidate(address, addressSchema);
	return {
		user,
		title: 'Settings',
		theme: cookies.get('colortheme'),
		profileForm,
		addressForm
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	updateProfile: async ({ request, locals }) => {
		const { user } = await locals.lucia.validate();
		const profileForm = await superValidate(request, profileSchema);

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
	updateAddress: async ({ request, locals }) => {
		const { user } = await locals.lucia.validate();
		const addressForm = await superValidate(request, addressSchema);

		if (!addressForm.valid) {
			return message(addressForm, 'Invalid address');
		}

		await prisma.address.update({
			data: {
				...addressForm.data
			},
			where: {
				id: addressForm.data.id,
				userId: user?.id
			}
		});
		return message(addressForm, 'Address updated!');
	}
};
