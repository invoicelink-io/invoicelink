<script lang="ts">
	import type { BankAccount } from '@prisma/client';
	import { twMerge } from 'tailwind-merge';
	export let data: BankAccount | undefined;
	export let align = 'text-left';
</script>

{#if data}
	<div class={twMerge('w-full leading-6', align)}>
		{#if data.accountNo}
			<span class="font-medium text-gray-900 dark:text-white">Bank Details</span>
		{/if}
		{#if data.accountHolder}
			<br />
			<span>{data.accountHolder}</span>
		{/if}
		{#if data.accountNo}
			<br />
			<span>
				{data.accountNo}
			</span>
		{/if}
		{#if data.accountType}
			<br />
			<span>
				{data.accountType}
			</span>
		{/if}
		{#if data.bankName}
			<br />
			<span>
				{data.bankName}
			</span>
		{/if}
		{#if data.branchCode}
			<br />
			<span>
				{data.branchCode}
			</span>
		{/if}
	</div>
{/if}
