<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import posthog from 'posthog-js';
	import { Toaster, type ToastOptions } from 'svelte-french-toast';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import {
		storePopup,
		initializeStores,
		Modal,
		Drawer,
		getDrawerStore
	} from '@skeletonlabs/skeleton';
	import type { ModalComponent } from '@skeletonlabs/skeleton';
	import ModalDeleteConfirm from '$lib/components/ui/modals/ModalDeleteConfirm.svelte';
	import { browser } from '$app/environment';
	import FirstStep from '$lib/components/tour/FirstStep.svelte';
	import SecondStep from '$lib/components/tour/SecondStep.svelte';
	import ThirdStep from '$lib/components/tour/ThirdStep.svelte';
	import FourthStep from '$lib/components/tour/FourthStep.svelte';

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	initializeStores();
	const drawerStore = getDrawerStore();

	const modalRegistry: Record<string, ModalComponent> = {
		ModalDeleteConfirm: { ref: ModalDeleteConfirm }
	};
	const toastOptions = {
		className: `!bg-surface-100 dark:!bg-surface-800 !text-surface-900 dark:!text-white !text-sm`,
		error: {
			iconTheme: {
				primary: `rgb(var(--color-error-500))`,
				secondary: `rgb(255 255 255)`
			}
		},
		success: {
			iconTheme: {
				primary: `rgb(var(--color-success-600))`,
				secondary: `rgb(255 255 255)`
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
	buttonPositive="btn btn-sm variant-filled-primary"
	buttonNeutral="btn btn-sm variant-soft-surface"
	components={modalRegistry}
/>
<Drawer
	bgDrawer="bg-surface-50-900-token text-surface-900-50-token max-w-3xl sm:mx-auto"
	bgBackdrop="bg-gradient-to-br from-[#984EF0]/50 via-primary-500/50 to-[#3976EA]/50 z-[500]"
	border="border border-surface-200-700-token"
	padding="p-4"
	position="bottom"
	rounded="rounded-xl"
	regionDrawer="text-center text-sm sm:text-base p-4 sm:p-8 flex flex-col gap-y-4 h-max"
>
	{#if $drawerStore.id === 'tour-1'}
		<FirstStep />
	{:else if $drawerStore.id === 'tour-2'}
		<SecondStep />
	{:else if $drawerStore.id === 'tour-3'}
		<ThirdStep />
	{:else if $drawerStore.id === 'tour-4'}
		<FourthStep />
	{:else}
		Nothing to show. Tour complete.
	{/if}
</Drawer>
<slot />
<Toaster {toastOptions} />
