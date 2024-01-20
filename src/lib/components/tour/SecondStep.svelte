<script>
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	const drawerStore = getDrawerStore();
</script>

<h3 class="h3">Tell us about yourself 💁</h3>
<p>
	In order to ensure that the invoices we create for you are compliant with your local tax laws, we
	need some info.
</p>
<p>
	Here on the settings page you can capture your display name, address and banking details for your
	invoices. Once you've completed this step, you can click continue below.
</p>
<div class="flex w-full items-center justify-end gap-2">
	<button type="button" class="variant-soft-surface btn btn-sm" on:click={() => drawerStore.close()}
		>Update Profile</button
	>
	<a class="variant-filled-primary btn btn-sm" href="/settings/gateway?tour=3">Continue</a>
</div>
