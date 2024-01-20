<script>
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	const drawerStore = getDrawerStore();
</script>

<h3 class="h3">Create a quick link 🔗</h3>
<p>
	Quick links are a great way to get paid quickly. These are instant payment requests that can be
	shared with others by sending them a link.
</p>
<p>
	In order to take full advantage of this feature, you would need to have captured your <a
		class="underline"
		on:click={() => {
			drawerStore.close();
		}}
		href="/settings#user-address">physical address</a
	>
	as well as either your <a class="underline" href="/settings#banking-details">banking details</a>
	or a <a class="underline" href="/settings/gateway">payment gateway</a>.
</p>

<div class="flex w-full items-center justify-end gap-2">
	<button type="button" class="variant-soft-surface btn btn-sm" on:click={() => drawerStore.close()}
		>Create Link</button
	>
	<button
		class="variant-filled-primary btn btn-sm"
		type="button"
		on:click={() => {
			// close the drawer
			drawerStore.close();
			// remove tour query param
			const params = $page.url.searchParams;
			params.delete('tour');
			// update the url
			history.replaceState(null, '', $page.url.toString());
			// reload the page
			location.reload();
		}}
	>
		Complete
	</button>
</div>
