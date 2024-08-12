<script lang="ts">
	import { Combobox, type Selected } from 'bits-ui';
	import { fly } from 'svelte/transition';
	import Icon from './Icon.svelte';

	export let name: string;
	export let placeholder: string = 'Search an item';
	export let disabled: boolean = false;
	export let selected: Selected<string>;
	export let onSelectedChange: (selected: Selected<string> | undefined) => void = () => {};

	export let items: {
		value: string;
		label: string;
	}[] = [];

	let inputValue = '';
	let touchedInput = false;

	$: filteredItems =
		inputValue && touchedInput
			? items.filter((item) => {
					if (
						item.label.toLowerCase().includes(inputValue.toLowerCase()) ||
						item.value.toLowerCase().includes(inputValue.toLowerCase())
					) {
						return true;
					} else {
						return false;
					}
				})
			: items;
</script>

<Combobox.Root
	items={filteredItems}
	bind:inputValue
	bind:touchedInput
	bind:selected
	{disabled}
	{onSelectedChange}
>
	<div class="relative flex w-full items-center">
		<Combobox.Input class="input input-primary max-w-full" {placeholder} aria-label={placeholder} />
		<div class="absolute right-2 my-auto text-neutral opacity-50">
			<Icon name="caret-up-down" />
		</div>
	</div>
	<Combobox.Content
		class="menu dropdown-content rounded-btn bg-base-200"
		transition={fly}
		sideOffset={8}
	>
		{#each filteredItems as item (item.value)}
			<Combobox.Item class="btn btn-ghost" value={item.value} label={item.label}>
				{item.label}
				<Combobox.ItemIndicator class="ml-auto" asChild={false}></Combobox.ItemIndicator>
			</Combobox.Item>
		{:else}
			<span class="block px-5 py-2 text-sm text-muted-foreground"> No results found </span>
		{/each}
	</Combobox.Content>
	<Combobox.HiddenInput {name} />
</Combobox.Root>
