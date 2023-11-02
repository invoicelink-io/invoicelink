<script lang="ts">
	export let name = 'Switch';
	import { createSwitch, melt } from '@melt-ui/svelte';
	export let isChecked: boolean;

	const {
		elements: { root, input },
		states: { checked }
	} = createSwitch({
		defaultChecked: isChecked
	});

	$: isChecked = $checked;
</script>

<form>
	<div class="flex items-center">
		<label class="pr-4 text-xs leading-none" for={name} id="{name}-label">
			{name}
		</label>
		<button
			use:melt={$root}
			class="relative h-6 cursor-default rounded-full bg-neutral-100 transition-colors data-[state=checked]:!bg-primary-200 dark:bg-neutral-400"
			id={name}
			aria-labelledby="{name}-label"
		>
			<span class="thumb block rounded-full bg-white transition" />
		</button>
		<input use:melt={$input} />
	</div>
</form>

<style>
	button {
		--w: 2.75rem;
		--padding: 0.125rem;
		width: var(--w);
	}

	.thumb {
		--size: 1.25rem;
		width: var(--size);
		height: var(--size);
		transform: translateX(var(--padding));
	}

	:global([data-state='checked']) .thumb {
		transform: translateX(calc(var(--w) - var(--size) - var(--padding)));
	}
</style>
