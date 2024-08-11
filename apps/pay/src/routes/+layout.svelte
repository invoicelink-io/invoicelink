<script lang="ts">
	import '../app.css';
	import { Toaster } from 'svelte-french-toast';
	import { toastOptions } from '@invoicelink/lib';
</script>

<slot />
<Toaster {toastOptions} />
