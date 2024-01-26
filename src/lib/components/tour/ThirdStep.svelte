<script>
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	const drawerStore = getDrawerStore();
</script>

<h3 class="h3">Add a payment gateway 💳</h3>
<p>
	Here at invoicelink.io, we prefer to not handle your money. Instead, we integrate with leading
	payment gateways to facilitate payments. This way, you can rest assured that your funds are always
	safe and secure.
</p>
<p>
	If you already have a merchant account with one of our supported gateways, you can go ahead and
	set up the integration now.
</p>
<p>
	If not, or if you're unsure about how what this means, consider <a
		class="underline"
		target="_blank"
		href="https://docs.invoicelink.io/guides/payfast-integration/"
		>reading our guide on how to create a merchant account and setup up an integration.</a
	>
</p>

<div class="flex w-full items-center justify-end gap-2">
	<button type="button" class="variant-soft-surface btn btn-sm" on:click={() => drawerStore.close()}
		>Setup Gateway</button
	>
	<a class="variant-filled-primary btn btn-sm" href="/quick-links?tour=4">Continue</a>
</div>
