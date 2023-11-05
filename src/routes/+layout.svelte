<script lang="ts">
	import '../app.css';
	import { Toaster, type ToastOptions } from 'svelte-french-toast';
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
				primary: `rgb(var(--color-success-500))`,
				secondary: `rgb(255 255 255)`
			}
		}
	} as ToastOptions;
</script>

<slot />
<Toaster {toastOptions} />
