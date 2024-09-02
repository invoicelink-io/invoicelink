<script>
	import { onNavigate } from '$app/navigation';
	import ShapeShift from '$lib/components/ShapeShift.svelte';
	import { onMount } from 'svelte';
	import { welcome } from '$lib/stores/welcome';
	import { page } from '$app/stores';
	import posthog from 'posthog-js';

	onMount(() => {
		if ($page.url.searchParams.get('newUser') === 'true') {
			console.log('posthog: Sign up');
			posthog.capture('Sign up', {
				email: $page.data.user?.email,
				name: $page.data.user?.name,
				username: $page.data.user?.username,
				id: $page.data.user?.id
			});
		}

		welcome.update((state) => {
			return {
				...state,
				user: $page.data.user ?? state.user,
				address: $page.data.address ?? state.address,
				bankDetails: $page.data.bankDetails ?? state.bankDetails,
				currency: $page.data.currency ?? state.currency
			};
		});
	});

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

<div class="flex h-screen w-screen flex-col items-center justify-center gap-y-2 p-4">
	<ShapeShift />
	<div
		class="card bg-base-100 flex w-full flex-col gap-y-2 p-4 text-center shadow-lg [view-transition-name:welcome-card] sm:w-96"
	>
		<slot />
	</div>
</div>
