<script lang="ts">
	import PageHeading from '$lib/components/PageHeading.svelte';
</script>

<PageHeading />
<div class="flex w-full flex-col gap-4 md:mt-0 md:flex-row">
	<ul class="menu rounded-box bg-base-200 lg:min-w-max">
		<li>
			<a href="/settings/general">General</a>
			<ul>
				<li>
					<a href="/settings/general">Profile</a>
				</li>
				<li>
					<a href="/settings/general/invoicing">Invoicing</a>
				</li>
			</ul>
		</li>
		<li>
			<a href="/settings/gateway">Payment Gateway</a>
			<ul>
				<li>
					<a href="/settings/gateway/payfast">Payfast</a>
				</li>
				<li>
					<a href="/settings/gateway/yoco">Yoco</a>
				</li>
			</ul>
		</li>
	</ul>
	<section class="w-full sm:px-4 lg:flex-auto">
		<slot />
	</section>
</div>
