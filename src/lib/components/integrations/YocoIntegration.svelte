<script lang="ts">
	import { page } from '$app/stores';
	import toast from 'svelte-french-toast';
	import { followUrl } from '$lib/utils/platform';
	// props
	export let checkoutId: string | undefined;
	export let publicKey: string;
	export let secretKey: string;
	export let amount: number;
	export let itemName: string;
	export let returnUrl: string = $page.url.href;
	export let cancelUrl: string = $page.url.href;
	export let buttonLabel: string = 'Pay now';
	export let buttonClass: string = 'variant-filled bg-surface-800 text-surface-50 btn';
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
			const res = await fetch(`/api/yoco/create_checkout`, {
				method: 'POST',
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
				toast.error('Could not create a yoco checkout.');
			}
			loading = false;
		}}>{loading ? `Busy` : buttonLabel}</button
	>
{/if}
