<script lang="ts">
	import { env } from '$env/dynamic/public';
	import { onMount } from 'svelte';
	export let src: string;

	type Widget = {
		open: () => void;
		close: () => void;
	};

	let widget: Widget;

	export let onUpload = (
		error: string,
		result: {
			event: string;
			info: {
				path: string;
			};
		},
		widget: Widget
	) => {
		console.log('onUpload', error, result, widget);
		src = `http://res.cloudinary.com/${env.PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_crop,g_custom/${result.info.path}`;
	};

	// Providing only a Cloud Name along with an Upload Preset allows you to use the
	// widget without requiring an API Key or Secret. This however allows for
	// "unsigned" uploads which may allow for more usage than intended. Read more
	// about unsigned uploads at: https://cloudinary.com/documentation/upload_images#unsigned_upload

	const cldOptions = {
		cloudName: env.PUBLIC_CLOUDINARY_CLOUD_NAME,
		uploadPreset: env.PUBLIC_CLOUDINARY_UPLOAD_PRESET,
		styles: {
			palette: {
				window: '#FFFFFF',
				windowBorder: '#A3A3A3',
				tabIcon: '#6366F1',
				menuIcons: '#5A616A',
				textDark: '#000000',
				textLight: '#FFFFFF',
				link: '#6366F1',
				action: '#FB6B02',
				inactiveTabIcon: '#6366F1',
				error: '#D3263C',
				inProgress: '#6366F1',
				complete: '#A4CC38',
				sourceBg: '#FFFFFF'
			},
			frame: {
				background: '#808080B3'
			}
		},
		cropping: true,
		sources: ['local'],
		resourceType: 'image',
		multiple: false
	};

	function cldCallback(
		error: string,
		result: {
			event: string;
			info: {
				path: string;
			};
		}
	) {
		if (error || result.event === 'success') {
			onUpload && onUpload(error, result, widget);
		}
	}

	onMount(() => {
		// To help improve load time of the widget on first instance, use requestIdleCallback
		// to trigger widget creation. If requestIdleCallback isn't supported, fall back to
		// setTimeout: https://caniuse.com/requestidlecallback

		function onIdle() {
			if (!widget) {
				// @ts-ignore
				widget = window.cloudinary.createUploadWidget(cldOptions, cldCallback);
			}
		}

		'requestIdleCallback' in window ? requestIdleCallback(onIdle) : setTimeout(onIdle, 1);
	});

	function handleClick() {
		if (widget) {
			widget.open();
		}
	}
</script>

<svelte:head>
	<script src="https://widget.cloudinary.com/v2.0/global/all.js" type="text/javascript"></script>
</svelte:head>

<button class="variant-filled btn btn-sm" on:click|preventDefault={handleClick}>
	Upload image
</button>
