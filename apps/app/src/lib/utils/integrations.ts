import { prisma } from '$lib/server/prisma';
import { supportedIntegrations } from '@invoicelink/lib/payments';

export async function getIntegrations(userId: string | undefined) {
	return await prisma.integration.findFirst({
		where: {
			userId: userId
		},
		include: supportedIntegrations
	});
}
