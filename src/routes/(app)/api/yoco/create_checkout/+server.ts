import { json } from '@sveltejs/kit';
import { createId } from '@paralleldrive/cuid2';

export async function POST({ request }) {
	const { secretKey, amountInCents, returnUrl, cancelUrl } = await request.json();

	const checkout = await fetch(`https://payments.yoco.com/api/checkouts`, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${secretKey}`,
			'Idempotency-Key': createId()
		},
		method: 'POST',
		body: JSON.stringify({
			amount: amountInCents * 100,
			totalTaxAmount: 0,
			subtotalAmount: amountInCents * 100,
			currency: 'ZAR',
			cancelUrl,
			failureUrl: cancelUrl,
			successUrl: returnUrl
		})
	}).then((res) => res.json());

	return json(checkout);
}
