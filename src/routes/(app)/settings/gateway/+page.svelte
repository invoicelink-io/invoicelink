<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;

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

<h2 class="text-base font-normal">Payment Integration</h2>
<p class="text-surface-700-200-token mt-1 text-sm">Integrate with your payment gateway of choice</p>

<ul role="list" class="settings-list">
	{#each gateways as { name, href }}
		<li>
			<div class="flex w-full items-center justify-between">
				<div class="capitalize">{name}</div>
				<a {href} class="variant-soft-surface btn btn-sm"
					>{data.integrationStatus[name] === `enabled` ? `Connected` : `Connect`}</a
				>
			</div>
		</li>
	{/each}
</ul>
