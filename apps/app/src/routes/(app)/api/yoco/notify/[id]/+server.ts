import { prisma } from '$lib/server/prisma';
import { Status } from '@invoicelink/db';
import { validateSignature } from '$lib/utils/yoco';

export async function POST({ request, url }) {
	const userId = url.href.split('/').pop();
	const headers = request.headers;
	const body = await request.text();
	const data = JSON.parse(body);

	// extract checkout id
	const checkoutId = data?.payload.metadata.checkoutId;

	// check for a quick link or invoice with this checkoutId
	const res = await prisma.user.findUnique({
		where: {
			id: userId
		},
		include: {
			integrations: {
				include: {
					yoco: true
				}
			},
			invoice: {
				where: {
					yocoCheckoutId: checkoutId
				}
			},
			quickLinks: {
				where: {
					yocoCheckoutId: checkoutId
				}
			}
		}
	});

	// validate webhook signature
	const isValid = validateSignature({
		headers,
		body,
		secretKey: res?.integrations?.[0]?.yoco[0]?.webhookSecret ?? ''
	});

	if (isValid) {
		if (res?.invoice && res?.invoice.length > 0) {
			// update the invoice
			await prisma.invoice.update({
				where: {
					id: res.invoice[0].id
				},
				data: {
					status: Status.PAID
				}
			});
		} else if (res?.quickLinks && res?.quickLinks.length > 0) {
			// update the quick link
			await prisma.quickLink.update({
				where: {
					id: res.quickLinks[0].id
				},
				data: {
					status: Status.PAID
				}
			});
		}

		// process webhook event
		return new Response('OK', { status: 200 });
	} else {
		return new Response(null, { status: 403 });
	}
}
