import { v2 as cloudinary } from 'cloudinary';
import { json } from '@sveltejs/kit';

// Return "https" URLs by setting secure: true
cloudinary.config({
	secure: true
});

export async function POST({ request }) {
	const image = await request.text();
	const public_id = await uploadImage(image);
	return json(public_id);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const uploadImage = async (imagePath: string) => {
	try {
		// Upload the image
		const result = cloudinary.uploader.upload(imagePath, {
			folder: 'invoicelink',
			use_filename: true,
			unique_filename: false,
			overwrite: true
		});
		return result;
	} catch (error) {
		console.error(error);
	}
};
