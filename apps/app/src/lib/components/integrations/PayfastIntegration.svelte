<script lang="ts">
	import { isAppleMobile } from '$lib/utils/platform';
	import { browser, dev } from '$app/environment';
	import { page } from '$app/stores';
	// props
	export let userId: string;
	export let merchantId: string;
	export let merchantKey: string;
	export let amount: number;
	export let itemName: string;
	export let paymentId: string = 'test';
	export let requireSecurity: boolean = false;
	export let passphrase: string | null = null;
	export let returnUrl: string = $page.url.href;
	export let cancelUrl: string = $page.url.href;
	export let notifyUrl: string = `${$page.url.origin}/api/payfast/notify/${userId}`;
	export let endpoint: string = dev
		? 'https://sandbox.payfast.co.za/eng/process'
		: 'https://www.payfast.co.za/eng/process';
	export let buttonLabel: string = 'Pay now';
	export let buttonClass: string = 'btn btn-sm text-xs';
	export let demo = false;

	if (demo) {
		endpoint = 'https://sandbox.payfast.co.za/eng/process';
		returnUrl = `${$page.url.href}&paid=true`;
	}

	let testInCurrentWindow = false;
	if (browser) {
		testInCurrentWindow = isAppleMobile(navigator.userAgent);
	}
</script>

<form
	target={testInCurrentWindow ? `_self` : `_blank`}
	name="payfast"
	action={endpoint}
	method="POST"
	class="hidden"
>
	<input type="hidden" name="merchant_id" value={merchantId} />
	<input type="hidden" name="merchant_key" value={merchantKey} />
	<input type="hidden" name="return_url" value={returnUrl} />
	<input type="hidden" name="cancel_url" value={cancelUrl} />
	<input type="hidden" name="notify_url" value={notifyUrl} />
	<input type="hidden" name="m_payment_id" value={paymentId} />
	<input type="hidden" name="amount" value={amount} />
	<input type="hidden" name="item_name" value={itemName} />
</form>
<button
	type="button"
	class={buttonClass}
	on:click|preventDefault={() => {
		const payfastForm = document.forms.namedItem('payfast');
		if (payfastForm) {
			const signatureInputs = payfastForm.querySelectorAll('input[name="signature"]');
			if (signatureInputs) {
				for (const signatureInput of signatureInputs) {
					payfastForm.removeChild(signatureInput);
				}
			}
			if (passphrase && requireSecurity) {
				fetch('/api/payfast/generate_signature', {
					method: 'POST',
					body: JSON.stringify({
						data: Object.fromEntries(new FormData(payfastForm)),
						passphrase
					})
				})
					.then((res) => {
						return res.json();
					})
					.then((signature) => {
						// add signature to form
						payfastForm.appendChild(
							Object.assign(document.createElement('input'), {
								type: 'hidden',
								name: 'signature',
								value: signature
							})
						);
						console.log(payfastForm);
						payfastForm.submit();
					});
			} else {
				payfastForm.submit();
			}
		}
	}}>{buttonLabel}</button
>
