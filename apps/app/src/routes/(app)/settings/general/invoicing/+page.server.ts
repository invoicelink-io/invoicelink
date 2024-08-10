import type { PageServerLoad, Actions } from './$types';
import { superValidate, message } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import { addressSchema, bankSchema, currencySchema } from '$lib/validation';
import { prisma } from '$lib/server/prisma';

export const load = (async ({ parent, locals, cookies }) => {
	await parent();
	const { user } = locals;

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

	const dbUser = await prisma.user.findFirst({
		where: {
			id: user?.id
		},
		select: {
			id: true,
			currency: true
		}
	});

	const currencyForm = await superValidate(dbUser, zod(currencySchema))

	return {
		user,
		title: 'Settings',
		theme: cookies.get('colortheme'),
		addressForm,
		bankingForm,
		currencyForm
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
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
	},
	updateCurrency: async ({ request, locals }) => {
		const { user } = locals;
		const currencyForm = await superValidate(request, zod(currencySchema));

		if (!currencyForm.valid) {
			return message(currencyForm, 'Invalid currency');
		}

		await prisma.user.update({
			where: {
				id: user?.id,
			},
			data: {
				currency: currencyForm.data.currency,
			},
		});
		return message(currencyForm, 'Currency choice updated');
	}
};
