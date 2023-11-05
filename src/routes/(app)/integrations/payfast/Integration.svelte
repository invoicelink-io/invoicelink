<script lang="ts">
	export let form: any;
	export let requireSecurity: boolean;

	import { isAppleMobile } from '$lib/utils/platform';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';

	let testInCurrentWindow = false;
	if (browser) {
		testInCurrentWindow = isAppleMobile(navigator.userAgent);
	}
</script>

<form
	target={testInCurrentWindow ? `_self` : `_blank`}
	name="payfast_test"
	action="https://www.payfast.co.za/eng/process"
	method="POST"
	class="hidden"
>
	<input type="hidden" name="merchant_id" value={$form.merchant_id} />
	<input type="hidden" name="merchant_key" value={$form.merchant_key} />
	<input type="hidden" name="return_url" value={$page.url.href} />
	<input type="hidden" name="cancel_url" value={$page.url.href} />
	<input type="hidden" name="amount" value="10.00" />
	<input type="hidden" name="item_name" value="Invoicelink integration successful" />
</form>
<button
	type="button"
	class="variant-ghost-primary btn btn-sm text-primary-500"
	on:click|preventDefault={() => {
		const payfastTestForm = document.forms.namedItem('payfast_test');
		if (payfastTestForm) {
			const signatureInputs = payfastTestForm.querySelectorAll('input[name="signature"]');
			if (signatureInputs) {
				for (const signatureInput of signatureInputs) {
					payfastTestForm.removeChild(signatureInput);
				}
			}
			if ($form.passphrase && requireSecurity) {
				fetch('/api/payfast/generate_signature', {
					method: 'POST',
					body: JSON.stringify({
						data: Object.fromEntries(new FormData(payfastTestForm)),
						passphrase: $form.passphrase
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
	}}>Test integration</button
>
