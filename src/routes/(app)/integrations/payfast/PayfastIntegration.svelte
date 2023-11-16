<script lang="ts">
	import { isAppleMobile } from '$lib/utils/platform';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	// props
	export let merchant_id: string;
	export let merchant_key: string;
	export let amount: number;
	export let item_name: string;
	export let requireSecurity: boolean = false;
	export let passphrase: string | null = null;
	export let return_url: string = $page.url.href;
	export let cancel_url: string = $page.url.href;
	export let endpoint: string = 'https://www.payfast.co.za/eng/process';
	export let button_label: string = 'Pay now';
	export let button_class: string = 'variant-filled-surface bg-surface-800-100-token btn';

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
	<input type="hidden" name="merchant_id" value={merchant_id} />
	<input type="hidden" name="merchant_key" value={merchant_key} />
	<input type="hidden" name="return_url" value={return_url} />
	<input type="hidden" name="cancel_url" value={cancel_url} />
	<input type="hidden" name="amount" value={amount} />
	<input type="hidden" name="item_name" value={item_name} />
</form>
<button
	type="button"
	class={button_class}
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
	}}>{button_label}</button
>
