<script lang="ts">
	import { page } from '$app/stores';
	import { followUrl } from '@invoicelink/lib';
	// props
	export let checkoutId: string | undefined;
	export let publicKey: string;
	export let secretKey: string;
	export let amount: number;
	export let itemName: string;
	export let returnUrl: string = $page.url.href;
	export let cancelUrl: string = $page.url.href;
	export let buttonLabel: string = 'Pay now';
	export let buttonClass: string = 'btn btn-sm text-xs';
	export let openInNewTab: boolean = true;

	let loading = false;
</script>

{#if checkoutId}
	<a
		href={`https://c.yoco.com/checkout/${checkoutId}`}
		target={openInNewTab ? '_blank' : '_self'}
		class={buttonClass}>{buttonLabel}</a
	>
{:else}
	<button
		type="button"
		class={buttonClass}
		on:click|preventDefault={async () => {
			loading = true;
			const res = await fetch(`https://app.invoicelink.io/api/yoco/create_checkout`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					publicKey,
					secretKey,
					amount,
					itemName,
					returnUrl,
					cancelUrl
				})
			});
			const data = await res.json();
			const redirectUrl = data.redirectUrl;

			if (redirectUrl) {
				followUrl(redirectUrl, openInNewTab);
			} else {
				console.error('Could not create a yoco checkout.');
			}
			loading = false;
		}}>{loading ? `Busy` : buttonLabel}</button
	>
{/if}
