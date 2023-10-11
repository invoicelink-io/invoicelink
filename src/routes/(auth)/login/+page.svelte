<form class="flex w-full max-w-sm flex-col items-center gap-4" method="POST">
	<p class="mb-2 text-center">Enter your credentials to access your account</p>
	<input class="input-auth" placeholder="Email" type="text" id="email" name="email" required />
	<input
		class="input-auth"
		placeholder="Password"
		type="password"
		id="password"
		name="password"
		required
	/>
	<button class="btn-auth mb-2" type="submit">Login</button>
	<a class="text-center font-extralight opacity-70 hover:opacity-100" href="/signup"
		>Sign Up Instead</a
	>
</form>
