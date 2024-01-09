<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;

	import Empty from '$lib/components/Empty.svelte';
	import PageHeading from '$lib/components/PageHeading.svelte';
	import Icon from '$lib/components/Icon.svelte';
</script>

<PageHeading heading="Clients">
	<a href="/clients/manage" class="variant-filled-primary btn btn-sm">New Client</a>
</PageHeading>

{#if data.clients.length === 0}
	<Empty subtitle="Click new client to get started" />
{/if}

<div class="grid w-full gap-4 sm:grid-cols-3">
	{#each data.clients as client}
		<div class="card-primary gap-2 p-4">
			<div class="flex w-full justify-between">
				<h6 class="h6 flex w-full items-center gap-2 text-left">
					{client.name}
				</h6>
				<Icon name="user" />
			</div>
			<p class="w-full text-left text-xs">
				{client.email}
			</p>
			<div class="flex w-full justify-end">
				<a href="/clients/manage?id={client.id}" class="variant-soft-surface btn btn-sm">Manage</a>
			</div>
		</div>
	{/each}
</div>
