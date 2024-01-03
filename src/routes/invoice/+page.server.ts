import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';
import { defaultStyles, defaultInvoice } from '$lib/utils/defaults';
import type { InvoiceStyles } from '@prisma/client';
import type { FullInvoice, FullQuickLink } from '$lib/types';

export const load = (async ({ url }) => {
	const documentType = (url.searchParams.get('type') ?? 'invoice') as 'quick' | 'invoice';
	const id = url.searchParams.get('id');
	const styleId = url.searchParams.get('styleId');

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
	if (!id) {
		return { documentType, styles, data };
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
		return { documentType, data: quickLink, styles };
	} else {
		data = (await prisma.invoice.findUnique({
			where: {
				id
			},
			include: {
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
		return { documentType, data, styles };
	}
}) satisfies PageServerLoad;
