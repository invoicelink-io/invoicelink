<script lang="ts">
	export let parent: any;
	const { width, background, shadow, padding, rounded, spacing, height, position } = parent;
	import { getModalStore } from '@skeletonlabs/skeleton';

	const modalStore = getModalStore();
</script>

{#if $modalStore[0]}
	<div class="{width} {background} {shadow} {padding} {rounded} {spacing} {height} {position}">
		<header class={parent.regionHeader}>{$modalStore[0].title}</header>
		<article class={parent.regionBody}>{$modalStore[0].body}</article>
		<div class="flex w-full justify-end gap-2">
			<button class={parent.buttonNeutral} on:click={parent.onClose}>
				{parent.buttonTextCancel}
			</button>
			<button
				class="{parent.buttonPositive} variant-filled-error"
				on:click={() => {
					if ($modalStore[0].response) {
						$modalStore[0].response(true);
						modalStore.close();
					}
				}}>Delete</button
			>
		</div>
	</div>
{/if}
