import { test, expect } from 'vitest';
import { createCheckout } from './yoco';

test('Should error on invalid params', async () => {
	const invalidCheckout = {
		secretKey: 'invalidSecretKey',
		amount: -100,
		cancelUrl: '',
		failureUrl: '',
		successUrl: ''
	};

	const { errors, checkout } = await createCheckout(invalidCheckout);

	expect(errors).toBeDefined();

	expect(errors?.fieldErrors.secretKey).toBeDefined();
	expect(errors?.fieldErrors?.secretKey?.at(0)).toContain('Secret Key must start with');

	expect(errors?.fieldErrors.amount).toBeDefined();
	expect(errors?.fieldErrors?.amount?.at(0)).toContain('Number must be greater than or equal to 2');

	expect(errors?.fieldErrors.cancelUrl).toBeDefined();
	expect(errors?.fieldErrors?.cancelUrl?.at(0)).toContain('Invalid url');

	expect(errors?.fieldErrors.failureUrl).toBeDefined();
	expect(errors?.fieldErrors?.failureUrl?.at(0)).toContain('Invalid url');

	expect(errors?.fieldErrors.successUrl).toBeDefined();
	expect(errors?.fieldErrors?.successUrl?.at(0)).toContain('Invalid url');

	expect(checkout).toBeUndefined();
});
