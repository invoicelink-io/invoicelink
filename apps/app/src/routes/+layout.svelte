<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import posthog from 'posthog-js';
	import { Toaster } from 'svelte-french-toast';
	import { toastOptions } from '@invoicelink/lib';
	import { browser } from '$app/environment';

	// POSTHOG
	let currentPath = '';

	onMount(() => {
		if (browser) {
			// Subscribe to page store for navigation
			const unsubscribePage = page.subscribe(($page) => {
				if (currentPath && currentPath !== $page.url.pathname) {
					// Function to run on page exit
					posthog.capture('$pageleave');
				}

				// Update the current path
				currentPath = $page.url.pathname;

				// Function to run on page load
				posthog.capture('$pageview');
			});

			// Handler for hard reloads or page exits
			const handleBeforeUnload = () => {
				posthog.capture('$pageleave');
			};
			window.addEventListener('beforeunload', handleBeforeUnload);

			if ($page.url.searchParams.get('signedOut') === 'true') {
				console.log('posthog: reset');
				posthog.reset();
			}

			return () => {
				// Cleanup
				unsubscribePage();
				window.removeEventListener('beforeunload', handleBeforeUnload);
			};
		}
	});
</script>

<slot />
<Toaster {toastOptions} />
