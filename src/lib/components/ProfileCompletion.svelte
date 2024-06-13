<script lang="ts">
	export let profileTasks: {
		title: string;
		link: string;
		complete: boolean;
	}[];
</script>

<div class="card card-bordered w-full bg-base-200">
	<div class="card-body">
		<h2 class="card-title">Profile Completion</h2>
		<p>Capture your details for an optimal experience.</p>
		<ul class="steps steps-vertical">
			{#each profileTasks as task}
				<li class="step text-xs" class:step-accent={task.complete}>
					<a href={task.link}>{task.title}</a>
				</li>
			{/each}
		</ul>
	</div>
</div>
