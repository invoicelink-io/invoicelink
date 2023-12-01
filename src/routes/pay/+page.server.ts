import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ url }) => {
	const id = url.searchParams.get('id');

	if (!id) {
		throw error(404, 'Not found');
	}

	if (id === 'demo') {
		const pay = {
			id: 'demo',
			amount: 250,
			status: 'PENDING',
			user: {
				id: 'demo',
				name: 'Demo User',
				avatar_url: 'https://i.pravatar.cc/300',
				integrations: [
					{
						payfast: [
							{
								merchantId: '10020305',
								merchantKey: 'woyd110xtf4j3',
								passphrase: 'SuperSecretPassphrase'
							}
						]
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
				include: {
					integrations: {
						include: {
							payfast: true
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
