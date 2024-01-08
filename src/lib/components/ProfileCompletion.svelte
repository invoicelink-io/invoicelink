<script lang="ts">
	import { ProgressBar } from '@skeletonlabs/skeleton';

	export let profileTasks: {
		title: string;
		link: string;
		complete: boolean;
	}[];
	const profileCompletion = profileTasks.filter((task) => task.complete).length;
</script>

<div class="card-primary gap-2 p-4">
	<h6 class="h6 w-full text-left">Profile Completion</h6>
	{#if profileCompletion === profileTasks.length}
		<p class="w-full text-left text-xs">Your profile is complete</p>
	{:else}
		<p class="w-full text-left text-xs">Complete your profile for an optimal experience</p>
	{/if}
	<span class="my-2 w-full">
		<ProgressBar
			meter="bg-primary-500"
			label="Progress Bar"
			value={profileCompletion}
			max={profileTasks.length}
		/>
	</span>

	<div class="grid w-full grid-cols-2 gap-2">
		{#each profileTasks as task}
			{#if !task.complete}
				<a href={task.link} class="variant-soft-surface btn btn-sm">{task.title}</a>
			{/if}
		{/each}
	</div>
</div>
