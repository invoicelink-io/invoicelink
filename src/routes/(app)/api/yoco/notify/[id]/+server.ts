import { prisma } from '$lib/server/prisma';
import { Status } from '@prisma/client';
import { validateSignature } from '$lib/utils/yoco';

export async function POST({ request, url }) {
	const userId = url.href.split('/').pop();
	const headers = request.headers;
	const body = await request.text();
	const data = JSON.parse(body);

	// extract checkout id
	const checkoutId = data?.payload.metadata.checkoutId;

	// check for a quick link with this checkoutId
	const quicklink = await prisma.quickLink.findUnique({
		where: {
			yocoCheckoutId: checkoutId,
			userId
		},
		include: {
			user: {
				include: {
					integrations: {
						include: {
							yoco: true
						}
					}
				}
			}
		}
	});

	// validate webhook signature
	const isValid = validateSignature({
		headers,
		body,
		secretKey: quicklink?.user?.integrations?.[0]?.yoco[0]?.webhookSecret ?? ''
	});

	if (isValid && quicklink?.id) {
		// update the quick link
		await prisma.quickLink.update({
			where: {
				id: quicklink.id
			},
			data: {
				status: Status.PAID
			}
		});
		// process webhook event
		return new Response('OK', { status: 200 });
	} else {
		return new Response(null, { status: 403 });
	}
}
