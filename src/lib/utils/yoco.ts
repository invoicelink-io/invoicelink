import { z } from 'zod';
import { NODE_ENV } from '$env/static/private';
import { createId } from '@paralleldrive/cuid2';

const secretKeyStartsWith = NODE_ENV === 'development' ? 'sk_' : 'sk_live_';

export const schema = z.object({
	secretKey: z.string().startsWith(secretKeyStartsWith, {
		message: `Secret Key must start with ${secretKeyStartsWith}`
	}),
	amount: z.number().min(1),
	cancelUrl: z.string().url(),
	failureUrl: z.string().url(),
	successUrl: z.string().url()
});

type YocoCheckout = z.infer<typeof schema>;
type YocoCheckoutErrors = z.inferFlattenedErrors<typeof schema>;

type Checkout = {
	id: string;
	amount: number;
	totalTaxAmount: number;
	subtotalAmount: number;
	currency: string;
	cancelUrl: string;
	failureUrl: string;
	successUrl: string;
	// Add the following properties based on the response
	status: string;
	metadata: {
		checkoutId: string;
		paymentFacilitator: string;
	};
	lineItems: null;
	paymentId: null;
	externalId: null;
	redirectUrl: string;
	totalDiscount: null;
	processingMode: string;
};

export async function createCheckout({
	secretKey,
	amount,
	cancelUrl,
	failureUrl,
	successUrl
}: YocoCheckout): Promise<{ errors?: YocoCheckoutErrors; checkout?: Checkout }> {
	// validate zod schema
	const validate = schema.safeParse({
		secretKey,
		amount,
		cancelUrl,
		failureUrl,
		successUrl
	});

	if (!validate.success) {
		return { errors: validate.error.flatten(), checkout: undefined };
	}

	const checkout = await fetch(`https://payments.yoco.com/api/checkouts`, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${secretKey}`,
			'Idempotency-Key': createId()
		},
		method: 'POST',
		body: JSON.stringify({
			amount: amount * 100,
			totalTaxAmount: 0,
			subtotalAmount: amount * 100,
			currency: 'ZAR',
			cancelUrl,
			failureUrl,
			successUrl
		})
	}).then((res) => res.json());

	return { errors: undefined, checkout };
}
