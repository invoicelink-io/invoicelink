import puppeteer from 'puppeteer';

// Connect to browserless so we don't run Chrome on the same hardware in production
export const getBrowser = () =>
	puppeteer.connect({
		browserWSEndpoint: `wss://browserless.invoicelink.io?token=${process.env.BROWSERLESS_API_TOKEN}`
	});
