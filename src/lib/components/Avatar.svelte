<script>
	export let avatarUrl = '';
	export let placeholder = '';
</script>

{#if avatarUrl}
	<div class="avatar">
		<div class="w-8 rounded-lg">
			<img src={avatarUrl} alt="user profile" />
		</div>
	</div>
{:else}
	<div class="avatar placeholder">
		<div class="bg-neutral text-neutral-content w-8 rounded-lg">
			<span class="text-xs">{placeholder}</span>
		</div>
	</div>
{/if}
