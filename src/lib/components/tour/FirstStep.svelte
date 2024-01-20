<script>
	import { page } from '$app/stores';
	const name = $page.data.user?.name.split(' ')[0] || 'there';
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	const drawerStore = getDrawerStore();
</script>

<h3 class="h3">Hi {name}! 👋</h3>
<p>Welcome to the tour of invoicelink.io - We're so excited to have you here!</p>
<p>
	To help you get the most out of this app, we've put together a quick tour to bring you up to speed
	on how things work around here.
</p>
<p>
	To bring back this guide at any point, look for the <span class="variant-soft-surface btn btn-sm"
		>🚀</span
	>
	button in the page header.
</p>
<div class="flex w-full items-center justify-end gap-2">
	<button
		type="button"
		class="variant-soft-surface btn btn-sm"
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
		}}>Skip for now</button
	>
	<a class="variant-filled-primary btn btn-sm" href="/settings?tour=2">Start tour</a>
</div>
