<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="flex flex-col items-center justify-center py-4">
	<h1 class="h1">Oopsie daisy, something went wrong</h1>
	<br />
	<p>{$page.status} {$page.error?.message}</p>
</div>
