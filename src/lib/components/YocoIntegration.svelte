<script lang="ts">
	import { page } from '$app/stores';
	import { redirect } from '@sveltejs/kit';
	import toast from 'svelte-french-toast';
	import { openInNewTab } from '$lib/utils/platform';
	// props
	export let publicKey: string;
	export let secretKey: string;
	export let amount: number;
	export let itemName: string;
	export let returnUrl: string = $page.url.href;
	export let cancelUrl: string = $page.url.href;
	export let buttonLabel: string = 'Pay now';
	export let buttonClass: string = 'variant-filled bg-surface-800 text-surface-50 btn';

	let loading = false;
</script>

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
				amountInCents: amount,
				itemName,
				returnUrl,
				cancelUrl
			})
		});
		const data = await res.json();
		const redirectUrl = data.redirectUrl;

		if (redirectUrl) {
			openInNewTab(redirectUrl);
		} else {
			toast.error('Could not create a yoco checkout.');
		}
		loading = false;
	}}>{loading ? `Testing Integration` : buttonLabel}</button
>
