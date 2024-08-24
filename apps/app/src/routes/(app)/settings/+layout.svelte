<script lang="ts">
	import { page } from '$app/stores';
	import PageHeading from '$lib/components/PageHeading.svelte';

	console.log($page.data);
</script>

<PageHeading />
<div class="flex w-full flex-col gap-4 md:mt-0 md:flex-row">
	<ul class="menu rounded-box bg-base-200 lg:min-w-max">
		<li>
			<a href="/settings/general">General</a>
			<ul>
				<li>
					<a href="/settings/general">Profile</a>
				</li>
				<li>
					<a href="/settings/general/invoicing">Invoicing</a>
				</li>
			</ul>
		</li>
		<li>
			<a href="/settings/gateway">Payment Gateway</a>
			<ul>
				{#each $page.data.gateways as { name, href }}
					<li>
						<a class="capitalize" {href}>{name}</a>
					</li>
				{/each}
			</ul>
		</li>
	</ul>
	<section class="w-full sm:px-4 lg:flex-auto">
		<slot />
	</section>
</div>
