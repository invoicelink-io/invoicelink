<script lang="ts">
	export let color: string = '#000000';
</script>

<div class="grid w-full grid-cols-[auto_1fr] gap-2">
	<input type="color" bind:value={color} />
	<input class="input-primary" type="text" bind:value={color} readonly tabindex="-1" />
</div>

<style>
	input[type='color'] {
		appearance: none;
		border: none;
		border-radius: var(--rounded-btn);
		height: 100%;
		width: 3rem;
	}
	input[type='color']::-webkit-color-swatch-wrapper {
		padding: 0;
	}
	input[type='color']::-webkit-color-swatch {
		border: none;
		border-radius: var(--rounded-btn);
	}
	input[type='color']::-moz-color-swatch {
		border: none;
		border-radius: var(--rounded-btn);
	}
	input[type='color']::-moz-focus-inner {
		border: none;
	}
	input[type='color']::-moz-focusring {
		border: none;
	}
</style>
