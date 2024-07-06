<script lang="ts">
    export let title: string = "";
    export let description: string = "";

</script>

<div class="card card-bordered h-full w-full hover:bg-base-200">
	<div class="card-body">
		<slot name="title">
			<h2 class="card-title">{title}</h2>
		</slot>
		<slot name="description">
			<p class="text-sm">{description}</p>
		</slot>
		<div class="card-actions justify-end">
			<slot name="actions" />
		</div>
	</div>
</div>
