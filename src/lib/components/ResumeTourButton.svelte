<script>
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	const drawerStore = getDrawerStore();
	import { page } from '$app/stores';
	// get the tour query param value
	const params = $page.url.searchParams;
	const tour = params.get('tour');
</script>

{#if tour}
	<button
		type="button"
		class="variant-soft-surface btn btn-sm"
		on:click={() => {
			// open the drawer
			drawerStore.open({
				id: `tour-${tour}`,
				position: tour === '2' ? 'top' : 'bottom'
			});
		}}>🚀</button
	>
{/if}
