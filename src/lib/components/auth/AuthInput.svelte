<script lang="ts">
	export let active = false;
	export let label: string | undefined;
	export let error: string | undefined = undefined;
</script>

<div class="group relative w-full">
	{#if label}
		<label
			class="input-auth-label flex items-center {active || error
				? 'bottom-1/2 text-[12px] text-surface-100'
				: ''}"
			for="name"
		>
			<span class="mr-2 whitespace-nowrap">
				{label}
			</span>
			{#if error}
				<span class="whitespace-nowrap text-[12px] text-error-200">
					{error}
				</span>
			{/if}
		</label>
	{/if}
	<slot />
</div>
