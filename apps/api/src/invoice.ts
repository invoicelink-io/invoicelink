import { Elysia } from 'elysia'
import puppeteer from 'puppeteer';


const getBrowser = () => puppeteer.launch({ headless: true });

const plugin = new Elysia()
    .get('/invoice', async ({
        query
    }) => {
        console.log(query)
        const { id, type, download } = query

	    let browser = await getBrowser();
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
	});

export default plugin