<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from './$types';
	import AuthInput from '$lib/components/auth/AuthInput.svelte';
	import { validateSignupForm } from './validation';
	let loading = false;

	let formData = {
		name: '',
		email: '',
		password: '',
		passwordConfirm: ''
	};

	let errors = {
		name: '',
		email: '',
		password: '',
		passwordConfirm: ''
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
	<p class="mb-2 text-center">Enter your details below to get started</p>

	<AuthInput label="Name" active={!!formData.name} error={errors?.name}>
		<input
			class="input-auth"
			type="text"
			id="name"
			name="name"
			disabled={loading}
			bind:value={formData.name}
		/>
	</AuthInput>

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

	<AuthInput
		label="Password Confirmation"
		active={!!formData.passwordConfirm}
		error={errors?.passwordConfirm}
	>
		<input
			class="input-auth"
			type="password"
			id="passwordConfirm"
			name="passwordConfirm"
			disabled={loading}
			bind:value={formData.passwordConfirm}
		/>
	</AuthInput>

	{#if loading}
		<button class="btn-auth mb-2" disabled={loading} type="submit"> Signing up </button>
	{:else}
		<button class="btn-auth mb-2" type="submit"> Sign up </button>
	{/if}
	<a class="text-center font-extralight opacity-70 hover:opacity-100" href="/login"
		>Already have an account? Login</a
	>
</form>
