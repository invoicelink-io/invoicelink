<script lang="ts">
	export let heading: string;
</script>

<div
	class="border-surface-100-800-token mb-8 flex w-full flex-row items-center justify-center border-b py-4"
>
	<h1 class="h4 w-full text-left">{heading}</h1>
	<slot />
</div>
