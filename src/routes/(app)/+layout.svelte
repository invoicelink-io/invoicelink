<script>
	import Header from '$lib/components/Header.svelte';
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>{$page.data.title ?? `invoicelink.io`}</title>
</svelte:head>

<Header />
<main class="w-full max-w-7xl p-4">
	<slot />
</main>
