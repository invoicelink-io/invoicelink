<script lang="ts">
	import { Status } from '@prisma/client';

	export let status: Status;
</script>

<span class="{status === Status.PAID ? `variant-soft-primary` : `variant-soft-surface`} badge">
	{status === Status.PAID ? 'Paid' : 'Unpaid'}
</span>
