import type { WelcomeStore } from '$lib/types';
import { prisma } from '$lib/server/prisma';
import { bankSchema } from '$lib/validation';

export async function POST({ request }) {
	const body = (await request.json()) as WelcomeStore;

	// get the users address
	const user = await prisma.user.findFirst({
		where: {
			id: body.user.id
		},
		include: {
			bankAccount: true
		}
	});

	// validate the address fields
	const banking = bankSchema.safeParse(body.bankDetails);

	if (banking.success) {
		// if the user has an address, update it
		if (user?.bankAccount && user.bankAccount.length > 0) {
			await prisma.bankAccount.update({
				where: {
					id: user.bankAccount[0].id
				},
				data: banking.data
			});
		} else {
			// if the user does not have an address, create one
			await prisma.bankAccount.create({
				data: {
					userId: body.user.id,
					accountHolder: banking.data.accountHolder,
					accountNo: banking.data.accountNo,
					accountType: banking.data.accountType,
					bankName: banking.data.bankName,
					branchCode: banking.data.branchCode
				}
			});
		}
		return new Response('Bank details updated', { status: 200 });
	} else {
		console.log(banking.error);
		return new Response('Bank details update failed', { status: 500 });
	}
}
