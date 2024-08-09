import { Elysia, t } from 'elysia';
import { getBrowser } from './lib/browserless';

const plugin = new Elysia().get(
	'/preview',
	async ({
		query
	}: {
		query: {
			styleId: string;
		};
	}) => {
		const { styleId } = query;

		const browser = await getBrowser();
		const page = await browser.newPage();

		await page.goto(`https://app.invoicelink.io/invoice?styleId=${styleId}`, {
			waitUntil: 'domcontentloaded'
		});
		const img = await page.screenshot({
			fullPage: true,
			optimizeForSpeed: true,
			quality: 70,
			omitBackground: true,
			type: 'webp'
		});

		await browser.close();

		return new Response(img, {
			headers: {
				'Content-Type': 'image/webp'
			},
			status: 200
		});
	},
	{
		query: t.Object({
			styleId: t.String({
				description: 'An invoice template style id',
				error: 'Please provide an invoice template style id'
			})
		}),
		response: t.Any({
			description: 'Screenshot of the template styles',
			type: 'image/webp',
			error: 'An error occurred generating the preview'
		}),
		detail: {
			summary: 'Generate Style Preview',
			description: 'Create a preview image for invoice template styles'
		}
	}
);

export default plugin;
