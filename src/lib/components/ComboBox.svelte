<script lang="ts">
	import { createCombobox, melt, type ComboboxOptionProps } from '@melt-ui/svelte';
	import Icon from './Icon.svelte';
	import { fly } from 'svelte/transition';

	// props
	type Option = {
		value: string;
		label: string;
		disabled?: boolean;
	};
	export let options: Option[] = [];
	export let placeholder: string = 'Select an option';
	export let labelText: string = '';
	export let value: string | null = null;

	const toOption = (option: Option): ComboboxOptionProps<Option> => ({
		value: option,
		label: option.label,
		disabled: option.disabled
	});

	const {
		elements: { menu, input, option, label },
		states: { open, inputValue, touchedInput, selected
		 },
		helpers: { isSelected }
	} = createCombobox<Option>({
		forceVisible: true
	});

	$: if (!$open) {
		$inputValue = $selected?.label ?? '';
	}

	$: filteredOptions = $touchedInput
		? options.filter(({ label }) => {
				const normalizedInput = $inputValue.toLowerCase();
				return label.toLowerCase().includes(normalizedInput);
			})
		: options;

	$: {
		value = $selected?.value.value ?? null;
	}
</script>

<div class="flex flex-col gap-1">
	<!-- svelte-ignore a11y-label-has-associated-control  -->
	{#if labelText}
		<label use:melt={$label}>
			<span class="label-text-alt">{labelText}</span>
		</label>
	{/if}

	<div class="relative">
		<input use:melt={$input} class="input-primary" {placeholder} />
		<div class="absolute right-4 top-1/2 -translate-y-1/2 opacity-50">
			<Icon name="caret-up-down" />
		</div>
	</div>
</div>
{#if $open}
	<ul
		class="menu dropdown-content z-[1] rounded-box bg-base-200 p-2 shadow"
		use:melt={$menu}
		transition:fly={{ duration: 150, y: -5 }}
	>
		<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
		<div class="" tabindex="0">
			{#each filteredOptions as item, index (index)}
				<li
					use:melt={$option(toOption(item))}
					class:btn-active={$isSelected(item)}
					class="relative cursor-pointer scroll-my-2 rounded-btn data-[disabled]:btn-disabled data-[highlighted]:btn-active data-[disabled]:opacity-50"
				>
					<span>{item.label}</span>
				</li>
			{:else}
				<li class="relative cursor-pointer rounded-btn py-1 pl-8 pr-4">No results found</li>
			{/each}
		</div>
	</ul>
{/if}

