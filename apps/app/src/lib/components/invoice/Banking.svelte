<script lang="ts">
	import type { BankAccount } from '@invoicelink/db';
	import { twMerge } from 'tailwind-merge';
	export let data: BankAccount | undefined;
	export let align = 'text-left';
</script>

{#if data}
	<div class={twMerge('flex w-full flex-col leading-5', align)}>
		{#if data.accountNo}
			<span class="font-medium text-gray-900 dark:text-white">Bank Details</span>
		{/if}
		{#if data.accountHolder}
			<span>{data.accountHolder}</span>
		{/if}
		{#if data.accountNo}
			<span>
				{data.accountNo}
			</span>
		{/if}
		{#if data.accountType}
			<span>
				{data.accountType}
			</span>
		{/if}
		{#if data.bankName}
			<span>
				{data.bankName}
			</span>
		{/if}
		{#if data.branchCode}
			<span>
				{data.branchCode}
			</span>
		{/if}
	</div>
{/if}
