<script>
	import Header from '$lib/components/Header.svelte';
	import { page } from '$app/stores';
	import { shortcut } from '@svelte-put/shortcut';
</script>

<svelte:head>
	<title>{$page.data.title ?? `invoicelink.io`}</title>
</svelte:head>

<svelte:window
	use:shortcut={{
		trigger: {
			key: '†',
			modifier: 'alt',
			callback: () => {
				const theme = document.documentElement.getAttribute('data-theme');
				document.documentElement.setAttribute('data-theme', theme === 'dark' ? 'light' : 'dark');
			}
		}
	}}
/>

<Header />
<main class="w-full max-w-7xl p-4">
	<slot />
</main>
