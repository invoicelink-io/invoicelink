<script lang="ts">
	export let greeting: string | undefined = undefined;
	import { page } from '$app/stores';

	$: breadcrumbs = $page.url.pathname.split('/').filter(Boolean);

	function generateBreadcrumbLinks(breadcrumbs: string[]) {
		const links: string[] = [];
		breadcrumbs.reduce((acc: string, breadcrumb: string) => {
			acc = `${acc}/${breadcrumb}`;
			links.push(acc);
			return acc;
		}, '');
		return links;
	}

	$: breadcrumbLinks = generateBreadcrumbLinks(breadcrumbs);
</script>

<div
	class="mb-8 flex w-full flex-row items-center justify-between gap-x-2 border-b border-base-200 py-2"
>
	<div class="breadcrumbs text-sm capitalize">
		{#if greeting}
			<h1>{greeting}</h1>
		{:else}
			<ul>
				{#each breadcrumbs as breadcrumb, i}
					<li><a href={breadcrumbLinks.at(i)}>{breadcrumb}</a></li>
				{/each}
			</ul>
		{/if}
	</div>
	<slot />
</div>
