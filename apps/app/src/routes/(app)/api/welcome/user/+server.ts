import type { WelcomeStore } from '$lib/types';
import { prisma } from '$lib/server/prisma';
import { userSchema } from '$lib/validation';

export async function POST({ request }) {
	const body = (await request.json()) as WelcomeStore;

	const user = userSchema.safeParse(body.user);

	// get the users address
	if (user.success) {
		await prisma.user.update({
			where: {
				id: body.user.id
			},
			data: {
				name: body.user.name
			}
		});
		return new Response('User updated', { status: 200 });
	} else {
		console.log(user.error);
		return new Response('User not found', { status: 500 });
	}
}
