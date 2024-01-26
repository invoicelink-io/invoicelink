<script lang="ts">
	import ResumeTourButton from './ResumeTourButton.svelte';

	export let heading: string;
</script>

<div
	class="border-surface-100-800-token mb-8 flex w-full flex-row items-center justify-center gap-x-2 border-b py-2"
>
	<h1 class="h4 w-full text-left">{heading}</h1>
	<slot />
	<ResumeTourButton />
</div>
