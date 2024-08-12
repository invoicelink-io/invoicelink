<script lang="ts">
	import { page } from '$app/stores';
	import toast from 'svelte-french-toast';
	import { followUrl } from '@invoicelink/lib';
	// props
	export let id: string;
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

<button
	type="button"
	class={buttonClass}
	on:click|preventDefault={async () => {
		loading = true;
		const res = await fetch(`/api/stripe/create_checkout`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				id,
				secretKey,
				amount,
				itemName,
				currency: $page.data.currency,
				returnUrl,
				cancelUrl
			})
		});
		const data = await res.json();
		console.log({ data });

		if (!res.ok) {
			console.error(data);
			toast.error(data.message);
			loading = false;
			return;
		}
		const redirectUrl = data.url;

		if (redirectUrl) {
			followUrl(redirectUrl, openInNewTab);
		} else {
			console.error('Could not create a stripe checkout.');
		}
		loading = false;
	}}
>
	{loading ? 'Busy' : buttonLabel}
</button>
