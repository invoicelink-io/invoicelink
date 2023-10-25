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
		}
	];
</script>

<div class="flex items-center justify-center gap-4">
	{#each integrations as { name, status }}
		<a
			href="/integrations/{name}"
			class="flex h-24 w-60 flex-col items-center justify-center whitespace-nowrap rounded-lg border border-dark-400 bg-dark-400 bg-opacity-10 p-4 hover:bg-opacity-40"
		>
			<span>{name}</span>
			<p class="text-xs">{status}</p>
		</a>
	{/each}
</div>
