import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';
import { error } from '@sveltejs/kit';
import { supportedIntegrations } from '@invoicelink/lib/payments';

export const load: PageServerLoad = async ({ url, params, request }) => {
	const id = params?.id;

	if (!id) {
		error(404, 'Not found');
	}

	const currency = url.searchParams.get('currency') ?? 'USD';
	const locale = request.headers.get('Accept-Language')?.split(',')[0] ?? 'en-US';

	if (id === 'demo') {
		const paid = url.searchParams.get('paid');
		const pay = {
			id: 'demo',
			subtotal: 100,
			tax: 0,
			total: 100,
			status: paid === 'true' ? 'PAID' : 'PENDING',
			yocoCheckoutId: 'demo',
			user: {
				id: 'demo',
				name: 'Invoicelink Demo',
				email: 'demo@invoicelink.io',
				avatarUrl: '/apple-touch-icon.png',
				integrations: [
					// NOTE: Update this when adding more payment gateways
					{
						payfast: [
							{
								merchantId: '10020305',
								merchantKey: 'woyd110xtf4j3',
								passphrase: 'SuperSecretPassphrase'
							}
						],
						yoco: [],
						coinbase: [],
						stripe: [
							{
								secretKey: 'sk_test_4eC39HqLyjWDarjtT1zdp7dc'
							}
						]
					}
				]
			}
		};
		return { pay, type: 'quick', locale, currency };
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
						currency: true,
						integrations: {
							select: supportedIntegrations
						}
					}
				}
			}
		});

		if (quickLink) {
			return {
				pay: quickLink,
				type: 'quick',
				locale,
				currency: quickLink.user.currency
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
							currency: true,
							integrations: {
								select: supportedIntegrations
							}
						}
					}
				}
			});

			return {
				pay: invoice,
				type: 'invoice',
				locale,
				currency: invoice?.user.currency
			};
		}
	}
};
