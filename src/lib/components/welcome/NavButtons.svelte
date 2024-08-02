<script lang="ts">
	export let backHref: string;
	export let nextHref: string;
	export let backLabel: string = 'Back';
	export let nextLabel: string = 'Next';
	export let handleNextClick: (e: any) => void;
</script>

<div class="welcome-actions">
	<a href={backHref} class="btn btn-sm text-xs">{backLabel}</a>
	<a
		href={nextHref}
		class="btn btn-sm text-xs"
		on:click={(e) => {
			handleNextClick(e);
		}}>{nextLabel}</a
	>
</div>
