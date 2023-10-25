<script lang="ts">
	import '../app.css';
	import { Toaster, type ToastOptions } from 'svelte-french-toast';
</script>

<slot />
<Toaster
	toastOptions={{
		style: `background-color: oklch(var(--color-dark-300)); color: oklch(100% 0 0); font-size: 0.875rem;`
	}}
/>
