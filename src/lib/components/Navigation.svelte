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
		class="no-scrollbar join flex h-full w-full flex-row items-center overflow-y-hidden overflow-x-scroll py-2 transition-all"
	>
		{#each links as { href, text }}
			<li>
				<a class="btn join-item btn-sm whitespace-nowrap text-xs" {href}>
					{text}
				</a>
			</li>
		{/each}
	</ul>
</nav>
