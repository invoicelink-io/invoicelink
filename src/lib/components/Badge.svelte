<script lang="ts">
	import type { Status } from '@prisma/client';
	export let status: Status;
</script>

<span class="{status === 'PAID' ? `variant-soft-primary` : `variant-soft-surface`} badge">
	{status === 'PAID' ? 'Paid' : 'Unpaid'}
</span>
