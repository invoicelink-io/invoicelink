import { prisma } from '$lib/server/prisma';
import { SerialType } from '@prisma/client';
import { pad } from './stringHelpers';

export function initializeSerialNumber(type: SerialType): string {
	const prefix = type === SerialType.INVOICE ? 'INV' : 'QL';
	const year = new Date().getFullYear();
	const serial = `${prefix}-${year}-${pad('1', '0', 5)}`;
	return serial;
}

export function incrementSerialNumber(serial: string) {
	const splitSerial = serial.split('-');
	const number = parseInt(splitSerial[splitSerial.length - 1]);
	const incrementedNumber = number + 1;
	const newSerial = `${splitSerial[0]}-${splitSerial[1]}-${pad(
		incrementedNumber.toString(),
		'0',
		5
	)}`;
	return newSerial;
}

/**
 * Retrieves the next serial number for a given user and serial type.
 * If a user ID is provided, it checks the last used serial number for that user and increments it.
 * If no user ID is provided, it initializes a new serial number based on the serial type.
 *
 * @param userId - The ID of the user (optional).
 * @param serialType - The type of serial number (default: SerialType.INVOICE).
 * @returns A promise that resolves to the next serial number.
 */
export async function getNextSerial(
	userId?: string | undefined,
	serialType: SerialType = SerialType.INVOICE
): Promise<string> {
	let serial = initializeSerialNumber(serialType);
	if (userId) {
		const lastSerial = (
			await prisma.lastUsedSerial.findUnique({
				where: {
					userId_type: {
						userId: userId,
						type: serialType
					}
				}
			})
		)?.serial;

		if (lastSerial) {
			serial = incrementSerialNumber(lastSerial);
		}
	}

	return serial;
}
