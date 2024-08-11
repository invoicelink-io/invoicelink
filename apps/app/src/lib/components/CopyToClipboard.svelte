<script lang="ts">
	export let text = '';
	export let message = 'Quick link copied';
	import { clipboard } from '@skeletonlabs/skeleton';
	import { Icon } from '@invoicelink/ui';
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
	type="button"
	class="tooltip tooltip-top tooltip-primary h-5 w-5"
	data-tip="Copy link"
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
