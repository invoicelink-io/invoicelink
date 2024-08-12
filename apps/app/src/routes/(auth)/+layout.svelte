<script>
	import { onNavigate } from '$app/navigation';
	import ShapeShift from '$lib/components/ShapeShift.svelte';
	import { Icon, Meta } from '@invoicelink/ui';

	onNavigate((navigation) => {
		// @ts-expect-error view transitions not yet fully supported
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			// @ts-expect-error view transitions not yet fully supported
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<svelte:head>
	<Meta title="Invoicelink.io Auth" description="Sign in or sign up to invoicelink.io" />
</svelte:head>

<div
	data-theme="dark"
	class="flex h-screen w-screen flex-col items-center justify-center gap-y-2 p-4"
>
	<ShapeShift />
	<div
		class="card flex w-full flex-col gap-y-2 bg-base-100 p-4 text-center shadow-lg [view-transition-name:welcome-card] sm:w-96"
	>
		<div class="mb-2 flex scale-150 items-center justify-center">
			<Icon name="invoicelink" />
		</div>
		<slot />
	</div>
</div>
