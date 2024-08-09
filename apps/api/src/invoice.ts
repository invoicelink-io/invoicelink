import { Elysia, t } from 'elysia';
import { getBrowser } from './lib/browserless';

const plugin = new Elysia().get(
	'/invoice',
	async ({
		query
	}: {
		query: {
			id: string;
			type: string;
			download?: string;
		};
	}) => {
		const { id, type, download } = query;

		let browser = await getBrowser();
		const page = await browser.newPage();

		await page.goto(
			`https://app.invoicelink.io/invoice?id=${id}&type=${type}&download=${download}`,
			{ waitUntil: 'domcontentloaded' }
		);
		const pdf = await page.pdf({
			format: 'A4',
			printBackground: true
		});

		await browser.close();

		return new Response(pdf as unknown as File, {
			headers: {
				'Content-Type': 'application/pdf',
				'Content-Disposition': download ? `attachment; filename="invoice.pdf"` : `inline`
			},
			status: 200
		});
	},
	{
		query: t.Object({
			id: t.String({
				description: 'An invoice or quicklink id',
				error: 'Please provide an id'
			}),
			type: t.String({
				description: 'The type of document to generate',
				enum: ['invoice', 'quicklink'],
				default: 'invoice',
				error: 'Please provide a type'
			}),
			download: t.Optional(
				t.Boolean({
					description: 'Whether to download the file or display it in the browser',
					default: false,
					error: 'Please provide a boolean download option'
				})
			)
		}),
		response: t.Any({
			description: 'The generated invoice or quicklink',
			type: 'application/pdf',
			example: 'invoice.pdf',
			error: 'An error occurred generating the PDF'
		}),
		detail: {
			summary: 'Generate PDF Invoice',
			description: 'Create a PDF for an invoice or quicklink'
		}
	}
);

export default plugin;
