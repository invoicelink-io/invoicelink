<script lang="ts">
	import { isAppleMobile } from '$lib/utils/platform';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	// props
	export let merchantId: string;
	export let merchantKey: string;
	export let amount: number;
	export let itemName: string;
	export let requireSecurity: boolean = false;
	export let passphrase: string | null = null;
	export let returnUrl: string = $page.url.href;
	export let cancelUrl: string = $page.url.href;
	export let endpoint: string = 'https://www.payfast.co.za/eng/process';
	export let buttonLabel: string = 'Pay now';
	export let buttonClass: string = 'variant-filled bg-surface-800 text-surface-50 btn';
	export let demo = false;

	if (demo) {
		endpoint = 'https://sandbox.payfast.co.za/eng/process';
	}

	let testInCurrentWindow = false;
	if (browser) {
		testInCurrentWindow = isAppleMobile(navigator.userAgent);
	}
</script>

<form
	target={testInCurrentWindow ? `_self` : `_blank`}
	name="payfast_test"
	action={endpoint}
	method="POST"
	class="hidden"
>
	<input type="hidden" name="merchant_id" value={merchantId} />
	<input type="hidden" name="merchant_key" value={merchantKey} />
	<input type="hidden" name="return_url" value={returnUrl} />
	<input type="hidden" name="cancel_url" value={cancelUrl} />
	<input type="hidden" name="amount" value={amount} />
	<input type="hidden" name="item_name" value={itemName} />
</form>
<button
	type="button"
	class={buttonClass}
	on:click|preventDefault={() => {
		const payfastTestForm = document.forms.namedItem('payfast_test');
		if (payfastTestForm) {
			const signatureInputs = payfastTestForm.querySelectorAll('input[name="signature"]');
			if (signatureInputs) {
				for (const signatureInput of signatureInputs) {
					payfastTestForm.removeChild(signatureInput);
				}
			}
			if (passphrase && requireSecurity) {
				fetch('/api/payfast/generate_signature', {
					method: 'POST',
					body: JSON.stringify({
						data: Object.fromEntries(new FormData(payfastTestForm)),
						passphrase
					})
				})
					.then((res) => {
						return res.json();
					})
					.then((signature) => {
						// add signature to form
						payfastTestForm.appendChild(
							Object.assign(document.createElement('input'), {
								type: 'hidden',
								name: 'signature',
								value: signature
							})
						);
						payfastTestForm.submit();
					});
			} else {
				payfastTestForm.submit();
			}
		}
	}}>{buttonLabel}</button
>
