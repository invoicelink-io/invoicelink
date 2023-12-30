<script lang="ts">
	import OAuth from '$lib/components/auth/OAuth.svelte';
</script>

<div class="flex w-full max-w-sm flex-col items-center gap-4">
	<p class="mb-2 text-center">Select a provider to continue</p>
	<OAuth />
</div>
