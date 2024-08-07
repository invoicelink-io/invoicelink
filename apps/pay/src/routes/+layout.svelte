<script lang="ts">
	import '../app.css';
	import { Toaster, type ToastOptions } from 'svelte-french-toast';

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
</script>

<slot />
<Toaster {toastOptions} />
