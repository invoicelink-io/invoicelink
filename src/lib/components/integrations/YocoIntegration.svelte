<script lang="ts">
	// props
	export let checkoutId: string;
	export let buttonLabel: string = 'Pay now';
	export let buttonClass: string = 'variant-filled bg-surface-800 text-surface-50 btn';
	export let openInNewTab: boolean = true;
</script>

<a
	href={`https://c.yoco.com/checkout/${checkoutId}`}
	target={openInNewTab ? '_blank' : '_self'}
	class={buttonClass}>{buttonLabel}</a
>
