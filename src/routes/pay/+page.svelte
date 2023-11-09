<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	console.log(data);
</script>

<p>Hello from the pay page!</p>
<div>id = {data.id}</div>
