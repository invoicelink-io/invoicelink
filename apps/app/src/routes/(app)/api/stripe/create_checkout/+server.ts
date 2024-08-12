import { json } from '@sveltejs/kit';
import { createStripeCheckout } from '@invoicelink/lib/payments';

export async function POST({ request }) {
	const { id, secretKey, amount, currency, returnUrl, cancelUrl, itemName } =
		await request.json();

	try {
		const checkout = await createStripeCheckout({
			id,
			itemName,
			secretKey,
			amount,
			currency,
			returnUrl,
			cancelUrl
		});

		return json(checkout);
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message);
			return new Response(JSON.stringify({ message: error.message }), { status: 500 });
		}
	}
}
