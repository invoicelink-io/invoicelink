<script>
	import ThemeSwitch from '$lib/components/ThemeSwitch.svelte';
	import toast from 'svelte-french-toast';
</script>

<ThemeSwitch />
<button
	class="btn-auth my-4 w-max p-2 text-sm"
	on:click={() => toast.error('Integration created!', {})}>Error!</button
>
<button
	class="btn-auth my-4 w-max p-2 text-sm"
	on:click={() => toast.success('It worked! Woohoo 🎉')}>Success!</button
>
<button
	class="btn-auth my-4 w-max p-2 text-sm"
	on:click={() =>
		toast.promise(
			new Promise((resolveOuter) => {
				resolveOuter(
					new Promise((resolveInner) => {
						setTimeout(resolveInner, 1000);
					})
				);
			}),
			{
				loading: 'Busy saving changes',
				success: 'Changes saved!',
				error: 'Oh no, something went wrong 😢'
			}
		)}>Custom!</button
>
