<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import { page } from '$app/stores';
	import Meta from '$lib/components/Meta.svelte';
</script>

<svelte:head>
	<Meta title={$page.data.title ?? `invoicelink.io`} />
	<script src="https://widget.cloudinary.com/v2.0/global/all.js" type="text/javascript"></script>
</svelte:head>

<Header />
<main class="drawer-content w-full max-w-7xl p-4 xl:px-0">
	<slot />
</main>
