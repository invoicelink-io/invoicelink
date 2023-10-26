<script>
	const integrations = [
		{
			name: 'payfast',
			status: 'connected'
		},
		{
			name: 'paygate',
			status: 'not connected'
		},
		{
			name: 'peach payments',
			status: 'not connected'
		},
		{
			name: 'yoco',
			status: 'not connected'
		},
		{
			name: 'paypal',
			status: 'not connected'
		}
	];
</script>

<div class="grid grid-cols-2 gap-4 sm:grid-cols-2">
	{#each integrations as { name, status }}
		<a
			href="/integrations/{name}"
			class:connected={status === 'connected'}
			class="flex h-40 w-full flex-col items-center justify-center rounded-lg border border-neutral-400 bg-opacity-10 p-4 text-center text-sm capitalize hover:bg-opacity-40 dark:bg-neutral-400"
		>
			<span>{name}</span>
			<p class="text-xs">{status}</p>
		</a>
	{/each}
</div>

<style lang="postcss">
	.connected {
		@apply border border-success-200 bg-opacity-40 dark:border-success-50;
	}
</style>
