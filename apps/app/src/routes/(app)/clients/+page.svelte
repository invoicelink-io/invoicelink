<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;

	import Empty from '$lib/components/Empty.svelte';
	import PageHeading from '$lib/components/PageHeading.svelte';
	import { Icon, Card } from '@invoicelink/ui';
	import ClientDrawer from '$lib/components/ClientDrawer.svelte';
</script>

<PageHeading>
	<ClientDrawer />
</PageHeading>

{#if data.clients.length === 0}
	<Empty subtitle="Click new client to get started" />
{/if}

<div class="grid w-full gap-4 sm:grid-cols-3">
	{#each data.clients as client}
		<a href="/clients/manage?id={client.id}">
			<Card>
				<div slot="title" class="flex w-full justify-between">
					<h2 class="card-title">
						{client.name}
					</h2>
					<Icon name="user" />
				</div>
				<p slot="description" class="w-full text-left text-sm">
					{client.email}
				</p>
			</Card>
		</a>
	{/each}
</div>
