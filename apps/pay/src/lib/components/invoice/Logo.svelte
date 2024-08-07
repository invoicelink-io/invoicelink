<script lang="ts">
	export let data: {
		alt: string;
		src?: string;
	};
	export let hideTagline: boolean = false;
</script>

<div class="flex w-full flex-col">
	{#if data.src}
		<div class="flex h-auto w-40 items-start justify-start object-contain">
			<img class="object-contain" alt={data.alt} src={data.src} />
		</div>
	{:else}
		<h2 class="h5 font-medium">
			{data.alt}
		</h2>
	{/if}
	{#if !hideTagline}
		<p class="text-xs font-medium">powered by invoicelink.io</p>
	{/if}
</div>
