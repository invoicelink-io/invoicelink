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
		<a href="/clients/manage?id={client.id}" class="card-primary gap-2 p-4">
			<span class="flex w-full items-center justify-center gap-1 sm:justify-start">
				<Icon name="user-circle" />
			</span>
			<span class="flex w-full flex-col justify-start">
				<h6 class="h6 w-full text-center sm:text-left">{client.name}</h6>
				<p class="w-full text-center text-sm font-light sm:text-left">
					{client.email}
				</p>
			</span>
		</a>
	{/each}
</div>
