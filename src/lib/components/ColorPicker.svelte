<script lang="ts">
	export let color: string = '#000000';
</script>

<div class="grid w-full grid-cols-[auto_1fr] gap-2">
	<input class="input" type="color" bind:value={color} />
	<input class="input-primary" type="text" bind:value={color} readonly tabindex="-1" />
</div>
