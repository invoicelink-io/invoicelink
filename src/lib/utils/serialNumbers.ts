import { pad } from './stringHelpers';
import { SerialType } from '@prisma/client';

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
