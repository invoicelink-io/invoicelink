<form class="flex w-full max-w-sm flex-col items-center gap-4" method="POST">
	<p class="mb-2 text-center">Enter your details below to get started</p>
	<input class="input-auth" type="text" id="name" name="name" placeholder="Name" required />
	<input class="input-auth" type="text" id="email" name="email" placeholder="Email" required />
	<input
		class="input-auth"
		type="password"
		id="password"
		name="password"
		placeholder="Password"
		required
	/>
	<button class="btn-auth mb-2" type="submit">Sign up</button>
	<a class="text-center font-extralight opacity-70 hover:opacity-100" href="/login"
		>Already have an account? Login</a
	>
</form>
