<script lang="ts">
	export let dialog: HTMLDialogElement;
	export let title = 'Are you sure?';
	export let body = 'This action cannot be undone.';
</script>

<slot name="modal-open-button" />
<dialog bind:this={dialog} class="modal modal-bottom sm:modal-middle">
	<div class="modal-box">
		<h3 class="text-lg font-bold">{title}</h3>
		<p class="py-4">{body}</p>
		<div class="modal-action">
			<slot name="modal-confirm-button" />
			<form method="dialog">
				<button class="btn btn-sm">Close</button>
			</form>
		</div>
	</div>
</dialog>
