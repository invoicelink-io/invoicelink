<script lang="ts">
	export let id: string;
	export let label: string;
	export let open: boolean;
	export let unstyled: boolean = false;
</script>

<input {id} type="checkbox" class="drawer-toggle" bind:checked={open} />
<label
	for={id}
	class="{!unstyled ? 'btn btn-accent btn-sm' : 'hover:underline'}  drawer-button text-xs"
	>{label}</label
>
<div class="drawer-side z-50">
	<label for={id} aria-label="close sidebar" class="drawer-overlay"></label>
	<div class="menu min-h-full w-80 bg-base-200 p-4 text-base-content sm:w-96">
		<slot />
	</div>
</div>
