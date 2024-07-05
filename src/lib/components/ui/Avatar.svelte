<script>
	import { twMerge } from "tailwind-merge";

	export let avatarUrl = '';
	export let placeholder = '';
	export let size = 'size-8';
</script>

{#if avatarUrl}
	<div class="avatar">
		<div class={twMerge("rounded-btn", size)}>
			<img src={avatarUrl} alt="user profile" />
		</div>
	</div>
{:else}
	<div class="avatar placeholder">
		<div class={twMerge("rounded-btn bg-neutral text-neutral-content", size)}>
			<span class="text-xs">{placeholder}</span>
		</div>
	</div>
{/if}
