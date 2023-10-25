<script lang="ts">
	import { createAvatar, melt } from '@melt-ui/svelte';
	import { getInitials } from '$lib/utils/stringHelpers';
	export let src = '';
	export let name = 'Invoice Link';

	const {
		elements: { image, fallback }
	} = createAvatar({ src });
</script>

<div class="flex w-full items-center justify-center gap-6">
	<div
		class="flex h-8 w-8 items-center justify-center rounded-lg bg-dark-100 font-medium text-white dark:text-dark-500"
	>
		<img use:melt={$image} alt="Avatar" class="h-full w-full rounded-[inherit]" />
		<span use:melt={$fallback} class="text-xs font-medium tracking-widest dark:text-white"
			>{getInitials(name)}</span
		>
	</div>
</div>
