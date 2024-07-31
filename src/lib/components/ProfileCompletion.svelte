<script lang="ts">
	export let profileTasks: {
		title: string;
		link: string;
		complete: boolean;
	}[];
</script>

<a href="/settings/general/invoicing" class="card card-bordered mb-2 w-full hover:bg-base-200">
	<div class="card-body">
		<h2 class="card-title">Profile Completion</h2>
		<p class="text-sm">Capture your details for an optimal experience.</p>
		<div class="py-2">
			<ul class="steps steps-vertical sm:steps-horizontal">
				{#each profileTasks as task}
					<li class="step text-xs" class:step-accent={task.complete}>
						<a class="hover:underline" href={task.link}>{task.title}</a>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</a>
