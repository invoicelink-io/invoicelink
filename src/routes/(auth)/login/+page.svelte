<script lang="ts">
	import Header from '$lib/components/welcome/Header.svelte';
	import OAuth from '$lib/components/auth/OAuth.svelte';
</script>

<Header
	heading="Welcome to invoicelink.io"
	description="Please use the buttons below to sign in or sign up."
/>
<OAuth />
