<script lang="ts">
	export let text = '';
	export let message = 'Quick link copied';
	import { clipboard } from '@skeletonlabs/skeleton';
	import Icon from '$lib/components/Icon.svelte';
	let currentElement: HTMLButtonElement;
	let show = true;
	import toast from 'svelte-french-toast';

	function handleClick() {
		show = false;
		toast.success(message);
		setTimeout(() => {
			show = true;
		}, 1000);
	}
</script>

<button
	class="h-5 w-5"
	type="button"
	title="Copy link to clipboard"
	use:clipboard={text}
	bind:this={currentElement}
	on:click={handleClick}
>
	{#if show}
		<Icon name="copy" />
	{:else}
		<Icon name="clipboard-document-check" />
	{/if}
</button>
