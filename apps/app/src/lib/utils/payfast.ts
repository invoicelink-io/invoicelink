import crypto from 'crypto';

export const generateSignature = (
	data: Record<string, string>,
	passphrase: string | null = null
) => {
	// Create parameter string
	let pfOutput = '';
	for (const key of Object.keys(data)) {
		if (Object.prototype.hasOwnProperty.call(data, key)) {
			if (data[key] !== '') {
				pfOutput += `${key}=${encodeURIComponent(data[key].trim()).replace(/%20/g, '+')}&`;
			}
		}
	}

	// Remove last ampersand
	let getString = pfOutput.slice(0, -1);
	if (passphrase !== null) {
		getString += `&passphrase=${encodeURIComponent(passphrase.trim()).replace(/%20/g, '+')}`;
	}

	const signature = crypto.createHash('md5').update(getString).digest('hex');
	return signature;
};

export const pfValidSignature = (
	pfSignature: string,
	pfParamString: string,
	pfPassphrase: string | null = null
) => {
	// Calculate security signature
	let tempParamString = pfParamString;
	if (pfPassphrase !== null) {
		tempParamString += `&passphrase=${encodeURIComponent(pfPassphrase.trim()).replace(
			/%20/g,
			'+'
		)}`;
	}

	const signature = crypto.createHash('md5').update(tempParamString).digest('hex');
	return pfSignature === signature;
};

export const pfValidIP = async (req: Request) => {
	const pfIp = req.headers.get('x-forwarded-for') as string;

	const ipWhitelist: string[] = [
		// IP Range: 197.97.145.144/28 (197.97.145.144 - 197.97.145.159)
		'197.97.145.144',
		'197.97.145.145',
		'197.97.145.146',
		'197.97.145.147',
		'197.97.145.148',
		'197.97.145.149',
		'197.97.145.150',
		'197.97.145.151',
		'197.97.145.152',
		'197.97.145.153',
		'197.97.145.154',
		'197.97.145.155',
		'197.97.145.156',
		'197.97.145.157',
		'197.97.145.158',
		'197.97.145.159',

		// IP Range: 41.74.179.192/27 (41.74.179.192 – 41.74.179.223)
		'41.74.179.192',
		'41.74.179.193',
		'41.74.179.194',
		'41.74.179.195',
		'41.74.179.196',
		'41.74.179.197',
		'41.74.179.198',
		'41.74.179.199',
		'41.74.179.200',
		'41.74.179.201',
		'41.74.179.202',
		'41.74.179.203',
		'41.74.179.204',
		'41.74.179.205',
		'41.74.179.206',
		'41.74.179.207',
		'41.74.179.208',
		'41.74.179.209',
		'41.74.179.210',
		'41.74.179.211',
		'41.74.179.212',
		'41.74.179.213',
		'41.74.179.214',
		'41.74.179.215',
		'41.74.179.216',
		'41.74.179.217',
		'41.74.179.218',
		'41.74.179.219',
		'41.74.179.220',
		'41.74.179.221',
		'41.74.179.222',
		'41.74.179.223',

		// IP Range: 102.216.36.0/28 (102.216.36.0 - 102.216.36.15)
		'102.216.36.0',
		'102.216.36.1',
		'102.216.36.2',
		'102.216.36.3',
		'102.216.36.4',
		'102.216.36.5',
		'102.216.36.6',
		'102.216.36.7',
		'102.216.36.8',
		'102.216.36.9',
		'102.216.36.10',
		'102.216.36.11',
		'102.216.36.12',
		'102.216.36.13',
		'102.216.36.14',
		'102.216.36.15',

		// IP Range: 102.216.36.128/28 (102.216.36.128 - 102.216.36.143)
		'102.216.36.128',
		'102.216.36.129',
		'102.216.36.130',
		'102.216.36.131',
		'102.216.36.132',
		'102.216.36.133',
		'102.216.36.134',
		'102.216.36.135',
		'102.216.36.136',
		'102.216.36.137',
		'102.216.36.138',
		'102.216.36.139',
		'102.216.36.140',
		'102.216.36.141',
		'102.216.36.142',
		'102.216.36.143',

		// Single IP Address: 144.126.193.139
		'144.126.193.139'
	];

	if (ipWhitelist.includes(pfIp)) {
		return true;
	}
	return false;
};

export const pfValidPaymentData = (
	cartTotal: string,
	pfData: {
		[key: string]: string;
	}
) => {
	return Math.abs(parseFloat(cartTotal) - parseFloat(pfData['amount_gross'])) <= 0.01;
};

export const pfValidServerConfirmation = async (pfHost: string, pfParamString: string) => {
	const result = await fetch(`https://${pfHost}/eng/query/validate`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: pfParamString
	})
		.then((res) => res.text())
		.catch((error) => {
			console.error(error);
			return 'INVALID';
		});

	return result === 'VALID';
};
