<script lang="ts">
	import '../app.css';
	import { Toaster, type ToastOptions } from 'svelte-french-toast';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { initializeStores, Modal, type ModalComponent } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	initializeStores();

	import ModalDeleteConfirm from '$lib/components/ui/modals/ModalDeleteConfirm.svelte';

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
</script>

<Modal
	regionHeader="h5"
	regionBody="text-sm"
	buttonPositive="btn btn-sm variant-filled-primary"
	buttonNeutral="btn btn-sm variant-soft-surface"
	components={modalRegistry}
/>
<slot />
<Toaster {toastOptions} />
