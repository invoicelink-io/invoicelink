<script lang="ts">
	export let id: string;
	export let label: string;
	export let open: boolean;
</script>

<input {id} type="checkbox" class="drawer-toggle" bind:checked={open} />
<label for={id} class="btn btn-accent drawer-button btn-sm text-xs">{label}</label>
<div class="drawer-side z-50">
	<label for={id} aria-label="close sidebar" class="drawer-overlay"></label>
	<div class="menu min-h-full w-80 bg-base-200 p-4 text-base-content sm:w-96">
		<slot />
	</div>
</div>
