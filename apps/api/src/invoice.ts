import puppeteer from 'puppeteer';
import { Hono } from 'hono'

const app = new Hono()

const getBrowser = () => puppeteer.launch({ headless: true });

app.get('/', async (c) => {
	const {id, type, download} = c.req.queries()

	let browser = null;

	try {
		browser = await getBrowser();
		const page = await browser.newPage();

		await page.goto(`https://app.invoicelink.io/invoice?id=${id}&type=${type}&download=${download}`);
		const pdf = await page.pdf({
			format: 'A4',
			printBackground: true
		});

		return new Response(pdf, {
			headers: {
				'Content-Type': 'application/pdf',
				'Content-Disposition': download ? `attachment; filename="invoice.pdf"` : `inline`
			}
		});
	} catch (error: unknown) {
		if (error instanceof Error) {
			return c.json({ error: error.message });
		}
	} finally {
		if (browser) {
			browser.close();
		}
	}
  return c.text('Hello from invoice!')
})

export default app
