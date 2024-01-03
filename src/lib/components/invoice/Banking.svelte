<script lang="ts">
	import type { BankAccount } from '@prisma/client';
	import { twMerge } from 'tailwind-merge';
	export let data: BankAccount | undefined;
	export let align = 'text-left';
</script>

{#if data}
	<div class={twMerge('w-full', align)}>
		<span class="font-medium text-gray-900">Bank Details</span>
		{#if data.accountHolder}
			<br />
			{data.accountHolder}
		{/if}
		{#if data.accountNo}
			<br />
			{data.accountNo}
		{/if}
		{#if data.accountType}
			<br />
			{data.accountType}
		{/if}
		{#if data.bankName}
			<br />
			{data.bankName}
		{/if}
		{#if data.branchCode}
			<br />
			{data.branchCode}
		{/if}
	</div>
{/if}
