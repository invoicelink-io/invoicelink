import { generateSignature } from '$lib/utils/payfast';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	const { data, passphrase } = await request.json();
	const signature = generateSignature(data, passphrase);
	return json(signature);
}