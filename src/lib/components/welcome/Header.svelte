<script lang="ts">
	export let heading: string;
	export let description: string = '';
</script>

<h1 class="[view-transition-name:welcome-title]">{heading}</h1>
{#if description}
	<p class="mb-2 text-xs [view-transition-name:welcome-description]">{description}</p>
{/if}
