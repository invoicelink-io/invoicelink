<script lang="ts">
	import { Autocomplete, popup } from '@skeletonlabs/skeleton';
	import type { AutocompleteOption, PopupSettings } from '@skeletonlabs/skeleton';

	export let disabled: boolean = false;
	export let targetName: string = 'popupAutocomplete';
	export let placeholder: string = 'Search...';
	export let options: AutocompleteOption<string>[] = [];

	let popupSettings: PopupSettings = {
		event: 'focus-click',
		target: targetName,
		placement: 'bottom'
	};
	export let selected: string | null = options[0].value ?? null;
	let search: string = selected ? options.find((item) => item.value === selected)?.label ?? '' : '';

	// TODO: Check why -ml-2 is needed in the below div
</script>

<input
	class="autocomplete input-primary"
	type="search"
	name="autocomplete-search"
	{disabled}
	bind:value={search}
	{placeholder}
	use:popup={popupSettings}
/>

<div data-popup={targetName} class="w-full sm:-ml-2">
	<Autocomplete
		regionEmpty="bg-surface-100-800-token rounded-lg w-full flex flex-col gap-2 p-4 justify-center text-sm"
		regionList="bg-surface-100-800-token rounded-lg w-full flex flex-col gap-2 p-2"
		regionButton="btn btn-sm w-full variant-soft-surface bg-surface-100-800-token rounded-lg justify-start"
		bind:input={search}
		{options}
		on:selection={({ detail }) => {
			search = detail.label;
			selected = detail.value;
		}}
	/>
</div>
