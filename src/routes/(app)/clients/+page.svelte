<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;

	import Empty from '$lib/components/Empty.svelte';
	import PageHeading from '$lib/components/PageHeading.svelte';
	import Icon from '$lib/components/Icon.svelte';
</script>

<PageHeading>
	<a href="/clients/manage" class="btn btn-accent btn-sm text-xs">New Client</a>
</PageHeading>

{#if data.clients.length === 0}
	<Empty subtitle="Click new client to get started" />
{/if}

<div class="grid w-full gap-4 sm:grid-cols-3">
	{#each data.clients as client}
		<div class="card card-bordered">
			<div class="card-body">
				<div class="flex w-full justify-between">
					<h2 class="card-title">
						{client.name}
					</h2>
					<Icon name="user" />
				</div>
				<p class="w-full text-left text-xs">
					{client.email}
				</p>
				<div class="card-actions justify-end">
					<a href="/clients/manage?id={client.id}" class="btn btn-primary btn-sm text-xs">Manage</a>
				</div>
			</div>
		</div>
	{/each}
</div>
