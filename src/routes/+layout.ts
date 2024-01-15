// src/routes/+layout.js
import posthog from 'posthog-js';
import { browser } from '$app/environment';
import { PUBLIC_POSTHOG_API_KEY } from '$env/static/public';

export const load = async () => {
	if (browser) {
		posthog.init(PUBLIC_POSTHOG_API_KEY, {
			api_host: 'https://us.posthog.com',
			autocapture: false,
			capture_pageview: false
		});
	}
	return;
};
