<script lang="ts">
	import { page } from '$app/stores';
	import Logo from '$lib/components/invoice/Logo.svelte';
</script>

<div class="flex h-screen w-screen flex-col items-center justify-center py-4">
	<div class="mb-4">
		<Logo
			data={{
				alt: 'invoicelink.io'
			}}
			hideTagline
		/>
	</div>
	<h1 class="h6 mb-2">Oopsie daisy, something went wrong</h1>
	<p class="text-xs font-normal italic">
		{$page.status} - {$page.error?.message}
	</p>
	<br />
	<a href="/" class="variant-soft-surface btn btn-sm">Back Home</a>
</div>
