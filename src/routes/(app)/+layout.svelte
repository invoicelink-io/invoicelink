<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import { page } from '$app/stores';
	import { shortcut } from '@svelte-put/shortcut';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { initializeStores, Modal, type ModalComponent } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	initializeStores();

	import ModalDeleteConfirm from '$lib/components/ui/modals/ModalDeleteConfirm.svelte';

	const modalRegistry: Record<string, ModalComponent> = {
		ModalDeleteConfirm: { ref: ModalDeleteConfirm }
	};
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

<Modal
	regionHeader="h5"
	regionBody="text-sm"
	buttonPositive="btn btn-sm variant-filled-primary"
	buttonNeutral="btn btn-sm variant-soft-surface"
	components={modalRegistry}
/>
<Header />
<main class="w-full max-w-7xl p-4">
	<slot />
</main>
