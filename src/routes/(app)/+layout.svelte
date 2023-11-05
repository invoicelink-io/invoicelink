<script>
	import Header from '$lib/components/Header.svelte';
	import { page } from '$app/stores';
	import { shortcut } from '@svelte-put/shortcut';
	// Floating UI
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
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
				const theme = document.documentElement.className;
				document.documentElement.className = theme === 'dark' ? 'light' : 'dark';
			}
		}
	}}
/>

<Header />
<main class="w-full max-w-7xl p-4">
	<slot />
</main>
