// import { prisma } from '$lib/server/prisma';
// import { validateStripeSignature } from '@invoicelink/lib/payments';
// import { Status } from '@prisma/client';
// import {} from '@invoicelink/lib/payments';
import { json } from '@sveltejs/kit';

// export async function POST({ request, params }) {
export async function POST() {
	return json({ received: true });
	// const userId = params.id;
	// let event = await request.json();

	// // TODO: Figure out how to get this from the event
	// const checkoutId = event.data.object.client_reference_id;

	// // check for a quick link or invoice with this checkoutId
	// const res = await prisma.user.findUnique({
	// 	where: {
	// 		id: userId
	// 	},
	// 	include: {
	// 		integrations: {
	// 			include: {
	// 				stripe: true
	// 			}
	// 		},
	// 		invoice: {
	// 			where: {
	// 				stripeCheckoutId: checkoutId
	// 			}
	// 		},
	// 		quickLinks: {
	// 			where: {
	// 				stripeCheckoutId: checkoutId
	// 			}
	// 		}
	// 	}
	// });

	// // Handle the event
	// switch (event.type) {
	// 	case 'payment_intent.succeeded':
	// 		// const paymentIntent = event.data.object;
	// 		event = validateStripeSignature({
	// 			headers: request.headers,
	// 			webhookSecret: res?.integrations?.stripe[0].webhookSecret,
	// 			body: JSON.stringify(event),
	// 			secretKey: res?.integrations?.stripe[0].secretKey
	// 		});
	// 		if (res?.invoice && res?.invoice.length > 0) {
	// 			// update the invoice
	// 			await prisma.invoice.update({
	// 				where: {
	// 					id: res.invoice[0].id
	// 				},
	// 				data: {
	// 					status: Status.PAID
	// 				}
	// 			});
	// 		} else if (res?.quickLinks && res?.quickLinks.length > 0) {
	// 			// update the quick link
	// 			await prisma.quickLink.update({
	// 				where: {
	// 					id: res.quickLinks[0].id
	// 				},
	// 				data: {
	// 					status: Status.PAID
	// 				}
	// 			});
	// 		}
	// 		break;
	// 	default:
	// 		console.log(`Unhandled event type ${event.type}`);
	// }

	// // Return a response to acknowledge receipt of the event
	// return json({ received: true });
}
