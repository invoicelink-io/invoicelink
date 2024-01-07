<script lang="ts">
	export let text = '';
	import { clipboard } from '@skeletonlabs/skeleton';
	import Icon from '$lib/components/Icon.svelte';
	let currentElement: HTMLButtonElement;
	let show = true;
	import toast from 'svelte-french-toast';

	function handleClick() {
		show = false;
		toast.success('Quick link copied');
		setTimeout(() => {
			show = true;
		}, 1000);
	}
</script>

<button
	class="w-5"
	type="button"
	use:clipboard={text}
	bind:this={currentElement}
	on:click={handleClick}
>
	{#if show}
		<Icon name="copy" />
	{:else}
		✨
	{/if}
</button>
