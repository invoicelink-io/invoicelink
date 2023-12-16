import { dev } from '$app/environment';
import {
	pfValidIP,
	pfValidPaymentData,
	pfValidServerConfirmation,
	pfValidSignature
} from '$lib/utils/payfast';
import { prisma } from '$lib/server/prisma';
import { Status } from '@prisma/client';

export async function POST({ request, url }) {
	const userId = url.href.split('/').pop();
	const body = await request.text();
	const pfData = Object.fromEntries(new URLSearchParams(body));
	const paymentId = pfData['m_payment_id'];
	const pfSignature = pfData['signature'];
	delete pfData['signature'];

	// lookup quick link
	const quickLink = await prisma.quickLink.findUnique({
		where: {
			id: paymentId,
			userId: userId
		},
		include: {
			user: {
				include: {
					integrations: {
						include: {
							payfast: true
						}
					}
				}
			}
		}
	});

	const cartTotal = quickLink?.amount.toString() || '0.00';

	const pfHost = dev ? 'sandbox.payfast.co.za' : 'www.payfast.co.za';
	const passphrase = quickLink?.user.integrations[0].payfast[0]?.passphrase;

	let pfParamString = '';
	for (const key in pfData) {
		if (Object.prototype.hasOwnProperty.call(pfData, key)) {
			pfParamString += `${key}=${encodeURIComponent(pfData[key].trim()).replace(/%20/g, '+')}&`;
		}
	}
	// Remove last ampersand
	pfParamString = pfParamString.slice(0, -1);

	const check1 = pfValidSignature(pfSignature, pfParamString, passphrase);
	const check2 = dev ? true : await pfValidIP(request);
	const check3 = pfValidPaymentData(cartTotal, pfData);
	const check4 = await pfValidServerConfirmation(pfHost, pfParamString);

	if (check1 && check2 && check3 && check4) {
		// All checks have passed, the payment is successful
		console.log('Payment check successful');
		// Update quick link status
		await prisma.quickLink.update({
			where: {
				id: paymentId
			},
			data: {
				status: Status.PAID
			}
		});
		// return 200 response
		return new Response(null, { status: 200 });
	} else {
		// Some checks have failed, check payment manually and log for investigation
		console.log('Payment check failed');
		return new Response(null, { status: 403 });
	}
}
