// src/routes/+layout.js
import posthog from 'posthog-js';
import { browser } from '$app/environment';
import { env } from '$env/dynamic/public';
const { PUBLIC_POSTHOG_API_KEY } = env;

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
