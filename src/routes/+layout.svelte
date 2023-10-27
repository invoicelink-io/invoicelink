<script lang="ts">
	import '../app.css';
	import { Toaster, type ToastOptions } from 'svelte-french-toast';
	const toastOptions = {
		style: `background-color: oklch(var(--color-toast)); color: oklch(var(--color-foreground)); font-size: 0.875rem;`,
		error: {
			iconTheme: {
				primary: `oklch(var(--color-error-100))`,
				secondary: `oklch(100% 0 0)`
			}
		},
		success: {
			iconTheme: {
				primary: `oklch(var(--color-success-100))`,
				secondary: `oklch(100% 0 0)`
			}
		}
	} as ToastOptions;
</script>

<slot />
<Toaster {toastOptions} />
