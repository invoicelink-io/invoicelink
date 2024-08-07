<script lang="ts">
	import type { Status } from '@invoicelink/db';
	export let status: Status;
</script>

<span class="{status === 'PAID' ? `` : ` badge-outline`} badge badge-accent text-xs">
	{status === 'PAID' ? 'Paid' : 'Unpaid'}
</span>
