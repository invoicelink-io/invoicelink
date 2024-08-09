import { json } from '@sveltejs/kit';
import puppeteer from 'puppeteer';
import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';
const { BROWSERLESS_API_TOKEN } = env;

const getBrowser = () =>
	dev
		? // Run the browser locally while in development
			puppeteer.launch({
				headless: true
			})
		: // Connect to browserless so we don't run Chrome on the same hardware in production
			puppeteer.connect({
				browserWSEndpoint: `wss://browserless.looped.co.za?token=${BROWSERLESS_API_TOKEN}`
			});

export async function GET({ url }) {
	const origin = url.origin;
	const search = url.search;

	let browser = null;

	try {
		browser = await getBrowser();
		const page = await browser.newPage();

		await page.goto(`${origin}/invoice${search}`);
		const img = await page.screenshot({
			fullPage: true,
			optimizeForSpeed: true,
			quality: 70,
			omitBackground: true,
			type: 'webp'
		});

		return new Response(img, {
			headers: {
				'Content-Type': 'image/webp'
			}
		});
	} catch (error: unknown) {
		if (error instanceof Error) {
			return json({ error: error.message });
		}
	} finally {
		if (browser) {
			browser.close();
		}
	}
}
