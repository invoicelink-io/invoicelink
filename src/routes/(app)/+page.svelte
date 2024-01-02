<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;

	const name = data.user?.name || data?.user?.username;
	let greeting = 'Welcome back';
	if (name && name?.trim() !== '') {
		greeting += `, ${name.trim().split(' ').at(0)}`;
	}

	import PageHeading from '$lib/components/PageHeading.svelte';
</script>

<PageHeading heading={greeting} />

<div class="relative grid grid-cols-3 gap-2">
	<a
		href="/"
		class="card variant-soft-surface bg-surface-50-900-token border-surface-100-800-token flex flex-col items-center justify-center border p-4 hover:bg-surface-100-800-token hover:border-surface-200-700-token"
	>
		<h3>Manage payment gateways</h3>
		<p class="text-center text-sm font-light">
			You can create a new invoice or view your existing invoices below.
		</p>
	</a>
</div>
