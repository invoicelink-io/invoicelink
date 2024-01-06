<script lang="ts">
	const links = [
		{
			href: '/',
			text: 'Home'
		},
		{
			href: '/quick-links',
			text: 'Quick Links'
		},
		{
			href: '/invoices',
			text: 'Invoices'
		},
		{
			href: '/clients',
			text: 'Clients'
		},
		{
			href: '/settings',
			text: 'Settings'
		}
	];
</script>

<nav class="flex w-full max-w-7xl flex-row items-center justify-between py-1">
	<ul
		class="no-scrollbar flex h-full w-full flex-row gap-2 overflow-y-hidden overflow-x-scroll pb-2 pt-2 transition-all"
	>
		{#each links as { href, text }}
			<li>
				<a
					class="variant-filled-surface bg-surface-100-800-token text-surface-900-50-token btn btn-sm px-2 text-xs hover:variant-filled-primary"
					{href}
				>
					{text}
				</a>
			</li>
		{/each}
	</ul>
</nav>
