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
	console.log(signature);
	console.log(getString + '&signature=' + signature);
	return signature;
};
