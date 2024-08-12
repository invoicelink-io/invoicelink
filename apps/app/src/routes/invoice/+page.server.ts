import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';
import { defaultStyles, defaultInvoice } from '@invoicelink/lib/defaults';
import type { InvoiceStyles } from '@prisma/client';
import type { FullInvoice, FullQuickLink } from '$lib/types';
import { extractLocale } from '@invoicelink/lib';

export const load = (async ({ url, request }) => {
	const documentType = (url.searchParams.get('type') ?? 'invoice') as 'quick' | 'invoice';
	const id = url.searchParams.get('id');
	const styleId = url.searchParams.get('styleId');
	let currency = 'USD';
	const locale = extractLocale(request);

	let styles = defaultStyles;
	if (styleId) {
		const dbStyle = (await prisma.invoiceStyles.findUnique({
			where: {
				id: styleId
			}
		})) as InvoiceStyles;

		if (dbStyle) {
			styles = dbStyle;
		}
	}

	let data = defaultInvoice;
	if (!id || id === 'demo') {
		return { documentType, styles, data, locale, currency };
	}

	if (documentType && documentType === 'quick') {
		const quickLink = (await prisma.quickLink.findUnique({
			where: {
				id
			},
			include: {
				user: {
					include: {
						bankAccount: true
					}
				},
				sendersAddress: true
			}
		})) as FullQuickLink;

		// @ts-expect-error TODO: Fix the type error
		currency = quickLink.user.currency;
		return { documentType, data: quickLink, styles, locale, currency };
	} else {
		data = (await prisma.invoice.findUnique({
			where: {
				id
			},
			include: {
				invoiceStyle: true,
				user: {
					include: {
						address: true,
						bankAccount: true
					}
				},
				sendersAddress: true,
				client: {
					include: {
						address: true
					}
				},
				lineItems: true
			}
		})) as FullInvoice;
		// @ts-expect-error TODO: Fix the type error
		currency = data.user.currency;
		if (data.invoiceStyleId) {
			styles = (await prisma.invoiceStyles.findUnique({
				where: {
					id: data.invoiceStyleId
				}
			})) as InvoiceStyles;
		}
		return { documentType, data, styles, locale, currency };
	}
}) satisfies PageServerLoad;
