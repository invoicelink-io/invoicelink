<script lang="ts">
	import PageHeading from '$lib/components/PageHeading.svelte';
	const settingsPages = [
		{
			name: 'General',
			href: '/settings'
		},
		{
			name: 'Payment Gateway',
			href: '/settings/gateway'
		}
	];
</script>

<PageHeading heading="Settings" />
<div class="-mt-8 flex w-full flex-col gap-4 md:mt-0 md:flex-row">
	<aside
		class="no-scrollbar border-surface-100-800-token flex overflow-x-scroll border-b py-4 md:block md:w-64 md:flex-none md:border-0"
	>
		<nav class="no-scrollbar flex-none overflow-x-scroll">
			<ul role="list" class="flex gap-x-3 gap-y-1 whitespace-nowrap md:flex-col">
				{#each settingsPages as { name, href }}
					<li>
						<a
							{href}
							class="group flex w-full items-center justify-start gap-2 rounded-lg bg-transparent p-2 text-left text-sm font-medium hover:bg-surface-100-800-token"
						>
							{name}
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	</aside>
	<section class="w-full py-4 lg:flex-auto">
		<slot />
	</section>
</div>
