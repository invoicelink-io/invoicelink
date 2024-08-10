export function arrayBufferToBase64(
	arrBuf: ArrayBuffer,
	contentType: string = 'image/webp'
): string {
	const buf = Buffer.from(arrBuf);
	return `data:${contentType};base64,${buf.toString('base64')}`;
}
