import type { PageServerLoad, Actions } from './$types';
import { superValidate, message } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import { profileSchema, addressSchema, bankSchema } from './validation';
import { prisma } from '$lib/server/prisma';

export const load = (async ({ parent, locals, cookies }) => {
	await parent();
	const { user } = locals;
	const profileForm = await superValidate(user, zod(profileSchema));

	const dbAddress = await prisma.address.findFirst({
		where: {
			userId: user?.id
		}
	});

	let address = dbAddress;
	if (!dbAddress) {
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

	const addressForm = await superValidate(address, zod(addressSchema));

	const dbBank = await prisma.bankAccount.findFirst({
		where: {
			userId: user?.id
		}
	});

	let bank = dbBank;
	if (!dbBank) {
		// create an address entry
		bank = await prisma.bankAccount.create({
			data: {
				accountHolder: '',
				bankName: '',
				accountNo: '',
				accountType: '',
				branchCode: '',
				user: {
					connect: {
						id: user?.id
					}
				}
			}
		});
	}

	const bankingForm = await superValidate(bank, zod(bankSchema));

	return {
		user,
		title: 'Settings',
		theme: cookies.get('colortheme'),
		profileForm,
		addressForm,
		bankingForm
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
	updateAddress: async ({ request, locals }) => {
		const { user } = locals;
		const addressForm = await superValidate(request, zod(addressSchema));

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
		return message(addressForm, 'Address updated');
	},
	updateBank: async ({ request, locals }) => {
		const { user } = locals;
		const bankForm = await superValidate(request, zod(bankSchema));

		if (!bankForm.valid) {
			return message(bankForm, 'Invalid banking details');
		}

		await prisma.bankAccount.update({
			data: {
				...bankForm.data
			},
			where: {
				id: bankForm.data.id,
				userId: user?.id
			}
		});
		return message(bankForm, 'Banking details updated');
	}
};
