<script lang="ts">
	import { createRadioGroup, melt } from '@melt-ui/svelte';

	export let options: string[] = [];
	export let orientation: 'horizontal' | 'vertical' = 'horizontal';
	export let defaultValue: string = options[0] ?? '';
	export let disabled: boolean = false;
	export let onChange = (value: string) => {
		console.log(value);
	};

	const {
		elements: { root, item, hiddenInput },
		helpers: { isChecked },
		states: { value }
	} = createRadioGroup({
		defaultValue,
		orientation,
		disabled
	});

	$: onChange($value);
</script>

<div
	use:melt={$root}
	class="flex flex-col gap-3 data-[orientation='horizontal']:flex-row"
	aria-label="View density"
>
	{#each options as option}
		<div class="flex items-center gap-3">
			<button
				use:melt={$item(option)}
				class="grid h-6 w-6 cursor-default place-items-center rounded-full bg-dark-50 shadow-sm hover:bg-primary-100
      dark:bg-dark-300"
				id={option}
				aria-labelledby="{option}-label"
			>
				{#if $isChecked(option)}
					<div class="h-3 w-3 rounded-full bg-primary-200" />
				{/if}
			</button>
			<label class="capitalize leading-none" for={option} id="{option}-label">
				{option}
			</label>
		</div>
	{/each}
	<input name="line-height" use:melt={$hiddenInput} />
</div>
