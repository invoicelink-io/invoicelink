<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	import { page } from '$app/stores';
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	import Divider from '$lib/components/ui/Divider.svelte';

	const gateways = [
		{
			name: 'payfast',
			href: '/settings/gateway/payfast'
		},
		{
			name: 'yoco',
			href: '/settings/gateway/yoco'
		}
	];
</script>

<Divider>Connect an existing payment gateway account</Divider>
<ul role="list" class="settings-list">
	{#each gateways as { name, href }}
		<li>
			<div class="flex w-full items-center justify-between">
				<div class="capitalize">{name}</div>
				<a {href} class="btn btn-sm"
					>{data.integrationStatus[name] === `enabled` ? `Connected` : `Connect`}</a
				>
			</div>
		</li>
	{/each}
</ul>
