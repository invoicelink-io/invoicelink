<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from './$types';
	import AuthInput from '$lib/components/auth/AuthInput.svelte';
	import { validateSignupForm } from './validation';
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
	<p class="mb-2 text-center">Enter your credentials to access your account</p>

	{#if data?.message}
		<div class="w-full rounded-xl border border-primary-200 p-4 text-center">
			{data.message}
		</div>
	{/if}
	<AuthInput label="Email" active={!!formData.email} error={errors?.email}>
		<input
			class="input-auth"
			type="text"
			id="email"
			name="email"
			disabled={loading}
			bind:value={formData.email}
		/>
	</AuthInput>

	<AuthInput label="Password" active={!!formData.password} error={errors?.password}>
		<input
			class="input-auth"
			type="password"
			id="password"
			name="password"
			disabled={loading}
			bind:value={formData.password}
		/>
	</AuthInput>
	<button class="btn-auth mb-2" type="submit">Log In</button>
	<a class="text-center font-extralight opacity-70 hover:opacity-100" href="/signup"
		>Sign Up Instead</a
	>
</form>
