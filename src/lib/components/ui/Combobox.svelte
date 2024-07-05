<script lang="ts">
  import { Combobox } from "bits-ui";
  import { fly as flyAndScale } from 'svelte/transition';
  import Icon from "../Icon.svelte";
 
  const fruits = [
    { value: "mango", label: "Mango" },
    { value: "watermelon", label: "Watermelon" },
    { value: "apple", label: "Apple" },
    { value: "pineapple", label: "Pineapple" },
    { value: "orange", label: "Orange" }
  ];
 
  let inputValue = "";
  let touchedInput = false;
 
  $: filteredFruits =
    inputValue && touchedInput
      ? fruits.filter((fruit) => fruit.value.includes(inputValue.toLowerCase()))
      : fruits;
</script>

<Combobox.Root items={filteredFruits} bind:inputValue bind:touchedInput>
	<div class="relative">
		<Combobox.Input
			class="h-input rounded-9px border-border-input bg-background placeholder:text-foreground-alt/50 focus:ring-foreground focus:ring-offset-background inline-flex w-[296px] truncate border px-11 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
			placeholder="Search a fruit"
			aria-label="Search a fruit"
		/>
		<Icon name="caret-up-down" />
	</div>

	<Combobox.Content
		class="border-muted bg-background shadow-popover w-full rounded-xl border px-1 py-3 outline-none"
		transition={flyAndScale}
		sideOffset={8}
	>
		{#each filteredFruits as fruit (fruit.value)}
			<Combobox.Item
				class="rounded-button data-[highlighted]:bg-muted flex h-10 w-full select-none items-center py-3 pl-5 pr-1.5 text-sm capitalize outline-none transition-all duration-75"
				value={fruit.value}
				label={fruit.label}
			>
				{fruit.label}
				<Combobox.ItemIndicator class="ml-auto" asChild={false}></Combobox.ItemIndicator>
			</Combobox.Item>
		{:else}
			<span class="block px-5 py-2 text-sm text-muted-foreground"> No results found </span>
		{/each}
	</Combobox.Content>
	<Combobox.HiddenInput name="favoriteFruit" />
</Combobox.Root>
