<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from './$types';
	import AuthInput from '$lib/components/auth/AuthInput.svelte';
	import { validateSignupForm } from './validation';
	import OAuth from '$lib/components/auth/OAuth.svelte';
	let loading = false;

	let formData = {
		email: '',
		password: ''
	};

	let errors = {
		email: '',
		password: ''
	};

	const handleSubmit: SubmitFunction = ({ cancel }) => {
		loading = true;

		// do some frontend validation
		const result = validateSignupForm(formData);
		if (result) {
			// handle error then return
			errors = result.errors;
			loading = false;
			return cancel();
		}

		return async ({ result, update }) => {
			await update();

			if (result.type === 'failure' && result?.data?.errors) {
				errors = result.data.errors;
			}
			loading = false;
		};
	};
</script>

<form
	class="flex w-full max-w-sm flex-col items-center gap-4"
	method="POST"
	use:enhance={handleSubmit}
>
	<p class="mb-2 text-center">Select a provider to continue</p>
	<OAuth />
</form>
