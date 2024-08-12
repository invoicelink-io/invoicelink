import { prisma } from '$lib/server/prisma';
import { validateStripeSignature } from '@invoicelink/lib/payments';
import { Status } from '@prisma/client';
import { json } from '@sveltejs/kit';
import Stripe from 'stripe';

export async function POST({ request, params }) {
	const userId = params.id;
	const payload = await request.text();
	const signature = request.headers.get('Stripe-Signature') ?? '';

	let event: Stripe.Event;

	// fetch the user's stripe secret key and webhook secret
	const user = await prisma.user.findUnique({
		where: {
			id: userId
		},
		include: {
			integrations: {
				include: {
					stripe: true
				}
			}
		}
	});

	const secretKey = user?.integrations[0].stripe[0]?.secretKey ?? '';
	const webhookSecret = user?.integrations[0].stripe[0]?.webhookSecret ?? '';

	try {
		event = validateStripeSignature({
			payload,
			secretKey,
			signature,
			webhookSecret
		});
	} catch (err) {
		console.error(err);
		return new Response('Webhook Error: Invalid signature', { status: 400 });
	}

	// Handle the event
	if (event.type === 'payment_intent.succeeded') {
		const paymentIntent = event.data.object;
		const checkoutId = paymentIntent.metadata?.id;

		if (!checkoutId) {
			return new Response('Webhook Error: Invalid metadata', { status: 400 });
		}

		if (checkoutId === 'test') {
			return json({ received: true });
		}

		// find the checkout invoice or quick link
		const res = await prisma.user.findUnique({
			where: {
				id: userId
			},
			include: {
				invoice: {
					where: {
						id: checkoutId
					}
				},
				quickLinks: {
					where: {
						id: checkoutId
					}
				}
			}
		});
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
	}

	// Return a response to acknowledge receipt of the event
	return json({ received: true });
}
