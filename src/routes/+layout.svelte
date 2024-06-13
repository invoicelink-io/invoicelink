<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import posthog from 'posthog-js';
	import { Toaster, type ToastOptions } from 'svelte-french-toast';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { storePopup, initializeStores, Modal } from '@skeletonlabs/skeleton';
	import type { ModalComponent } from '@skeletonlabs/skeleton';
	import ModalDeleteConfirm from '$lib/components/ui/modals/ModalDeleteConfirm.svelte';
	import { browser } from '$app/environment';

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	initializeStores();

	const modalRegistry: Record<string, ModalComponent> = {
		ModalDeleteConfirm: { ref: ModalDeleteConfirm }
	};
	const toastOptions = {
		className: `!bg-base-200 !text-base-content !text-sm`,
		error: {
			iconTheme: {
				primary: `oklch(var(--er))`,
				secondary: `oklch(var(--erc))`
			}
		},
		success: {
			iconTheme: {
				primary: `oklch(var(--su))`,
				secondary: `oklch(var(--succ))`
			}
		}
	} as ToastOptions;

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

			if ($page.url.searchParams.get('signedIn') === 'true' && $page.data.user) {
				console.log('posthog: identify');
				posthog.identify($page.data.user.email, {
					email: $page.data.user.email,
					name: $page.data.user.name,
					username: $page.data.user.username,
					id: $page.data.user.id
				});
			}

			if ($page.url.searchParams.get('newUser') === 'true') {
				console.log('posthog: Sign up');
				posthog.capture('Sign up', {
					email: $page.data.user?.email,
					name: $page.data.user?.name,
					username: $page.data.user?.username,
					id: $page.data.user?.id
				});
			}

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

<Modal
	regionHeader="h5"
	regionBody="text-sm"
	buttonPositive="btn btn-sm btn-primary"
	buttonNeutral="btn btn-sm"
	components={modalRegistry}
/>
<slot />
<Toaster {toastOptions} />
