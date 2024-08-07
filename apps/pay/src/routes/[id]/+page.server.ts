import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ url, params }) => {
	const id = params?.id;

	if (!id) {
		error(404, 'Not found');
	}

	if (id === 'demo') {
		const paid = url.searchParams.get('paid');
		const pay = {
			id: 'demo',
			subtotal: 250,
			tax: 0,
			total: 250,
			status: paid === 'true' ? 'PAID' : 'PENDING',
			yocoCheckoutId: 'demo',
			user: {
				id: 'demo',
				name: 'Invoicelink Demo',
				email: 'demo@invoicelink.io',
				avatarUrl: '/apple-touch-icon.png',
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
		return { pay, type: 'quick' };
	} else {
		const quickLink = await prisma.quickLink.findUnique({
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

		if (quickLink) {
			return {
				pay: quickLink,
				type: 'quick'
			};
		} else {
			const invoice = await prisma.invoice.findUnique({
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
				pay: invoice,
				type: 'invoice'
			};
		}
	}
};
