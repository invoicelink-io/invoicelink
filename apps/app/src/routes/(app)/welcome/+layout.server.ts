import type { LayoutServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';

export const load: LayoutServerLoad = async ({ parent, locals }) => {
	await parent();
	const { user } = locals;

	if (!user) {
		return {
			status: 401,
			redirect: '/login'
		};
	}

	const dbUser = await prisma.user.findFirst({
		where: {
			id: user.id
		},
		include: {
			address: true,
			bankAccount: true
		}
	});

	return {
		user,
		address: dbUser?.address[0],
		bankDetails: dbUser?.bankAccount[0]
	};
};
