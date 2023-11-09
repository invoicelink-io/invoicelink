<script lang="ts">
	export let text = '';
	import { clipboard } from '@skeletonlabs/skeleton';
	import Icon from '$lib/components/Icon.svelte';
	let currentElement: HTMLButtonElement;
	let show = true;

	function handleClick() {
		show = false;
		setTimeout(() => {
			show = true;
		}, 1000);
	}
</script>

<button type="button" use:clipboard={text} bind:this={currentElement} on:click={handleClick}>
	{#if show}
		<Icon name="copy" />
	{:else}
		✨
	{/if}
</button>
