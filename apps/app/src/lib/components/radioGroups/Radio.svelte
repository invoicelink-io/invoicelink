<script lang="ts">
	export let selected: string;
	export let options: {
		value: string;
		label: string;
	}[];
</script>

<div class="join">
	{#each options as option}
		<button
			class:btn-active={option.value === selected}
			class="btn join-item btn-sm text-xs"
			type="button"
			on:click={() => {
				selected = option.value;
			}}>{option.label}</button
		>
	{/each}
</div>
