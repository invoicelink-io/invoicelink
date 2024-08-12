import type { WelcomeStore } from '$lib/types';
import { prisma } from '$lib/server/prisma';
import { userSchema, currency as currencySchema } from '$lib/validation';
import type { Currency } from '@prisma/client';

export async function POST({ request }) {
	const body = (await request.json()) as WelcomeStore;

	const user = userSchema.safeParse(body.user);
	const currency = currencySchema.safeParse(body.currency);

	// update the users currency
	if (user.success && currency.success) {
		await prisma.user.update({
			where: {
				id: body.user.id
			},
			data: {
				currency: body.currency as Currency
			}
		});
		return new Response('User currency updated', { status: 200 });
	} else {
		console.log(user.error);
		return new Response('User not found', { status: 500 });
	}
}
