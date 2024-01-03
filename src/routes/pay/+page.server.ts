import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ url }) => {
	const id = url.searchParams.get('id');

	if (!id) {
		error(404, 'Not found');
	}

	if (id === 'demo') {
		const pay = {
			id: 'demo',
			subtotal: 250,
			tax: 0,
			total: 250,
			status: 'PENDING',
			yocoCheckoutId: 'demo',
			user: {
				id: 'demo',
				name: 'Demo User',
				email: 'demo@invoicelink.io',
				avatarUrl: 'https://i.pravatar.cc/300',
				integrations: [
					{
						payfast: [
							{
								merchantId: '10020305',
								merchantKey: 'woyd110xtf4j3',
								passphrase: 'SuperSecretPassphrase'
							}
						],
						yoco: []
					}
				]
			}
		};
		return { pay };
	}
	const pay = await prisma.quickLink.findUnique({
		where: {
			id
		},
		include: {
			user: {
				select: {
					id: true,
					avatarUrl: true,
					email: true,
					name: true,
					integrations: {
						select: {
							payfast: true,
							yoco: true
						}
					}
				}
			}
		}
	});

	return {
		pay
	};
};
