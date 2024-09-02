<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import { page } from '$app/stores';
	import { Meta } from '@invoicelink/ui';
	import { onNavigate } from '$app/navigation';
	import { onMount } from 'svelte';
	import posthog from 'posthog-js';

	onMount(() => {
		if ($page.url.searchParams.get('signedIn') === 'true' && $page.data.user) {
			console.log('posthog: identify');
			posthog.identify($page.data.user.email, {
				email: $page.data.user.email,
				name: $page.data.user.name,
				username: $page.data.user.username,
				id: $page.data.user.id
			});
		}
	});

	onNavigate((navigation) => {
		// @ts-expect-error view transitions not yet fully supported
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			// @ts-expect-error view transitions not yet fully supported
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<svelte:head>
	<Meta title={$page.data.title ?? `invoicelink.io`} />
	<script src="https://widget.cloudinary.com/v2.0/global/all.js" type="text/javascript"></script>
</svelte:head>

<Header />
<main class="drawer-content w-full max-w-7xl p-4 xl:px-0">
	<slot />
</main>
