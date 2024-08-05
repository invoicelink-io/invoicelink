import type { WelcomeStore } from '$lib/types';
import { prisma } from '$lib/server/prisma';
import { addressSchema } from '$lib/validation';

export async function POST({ request }) {
	const body = (await request.json()) as WelcomeStore;

	// get the users address
	const user = await prisma.user.findFirst({
		where: {
			id: body.user.id
		},
		include: {
			address: true
		}
	});

	// validate the address fields
	const address = addressSchema.safeParse(body.address);

	if (address.success) {
		// if the user has an address, update it
		if (user?.address) {
			await prisma.address.update({
				where: {
					id: user.address[0].id
				},
				data: address.data
			});
		} else {
			// if the user does not have an address, create one
			await prisma.address.create({
				data: {
					userId: body.user.id,
					line1: address.data.line1,
					line2: address.data.line2,
					line3: address.data.line3,
					postalCode: address.data.postalCode
				}
			});
		}
		return new Response('Address updated', { status: 200 });
	} else {
		console.log(address.error);
		return new Response('Address update failed', { status: 500 });
	}
}
