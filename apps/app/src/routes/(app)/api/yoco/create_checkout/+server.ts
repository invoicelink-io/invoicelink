import { json } from '@sveltejs/kit';
import { createCheckout } from '@invoicelink/lib/payments';

export async function POST({ request }) {
	const { secretKey, amount, returnUrl, cancelUrl } = await request.json();

	const { errors, checkout } = await createCheckout({
		secretKey,
		amount,
		cancelUrl,
		failureUrl: returnUrl,
		successUrl: returnUrl
	});

	if (errors) {
		return json(errors, {
			status: 400
		});
	} else {
		return json(checkout);
	}
}
