<div class="bg-dark-500 flex h-screen w-full flex-col items-center justify-center text-white">
	<form class="flex w-full max-w-sm flex-col items-center gap-4" method="POST">
		<img class="mb-2 h-14 w-14" src="/logo.svg" alt="Invoicelink logo" width="128" height="128" />
		<h1 class="text-xl font-normal">Welcome to invoicelink.io</h1>
		<p class="mb-2">Enter your credentials to access your account</p>
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
		<a class="font-extralight opacity-70 hover:opacity-100" href="/signup">Sign Up Instead</a>
	</form>
</div>
