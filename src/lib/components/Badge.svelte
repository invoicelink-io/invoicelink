<script lang="ts">
	import type { Status } from '@prisma/client';
	export let status: Status;
</script>

<span class="{status === 'PAID' ? `` : ` badge-outline`} badge badge-accent text-xs">
	{status === 'PAID' ? 'Paid' : 'Unpaid'}
</span>
