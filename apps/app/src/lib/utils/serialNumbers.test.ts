import { expect, test } from 'vitest';
import { initializeSerialNumber, incrementSerialNumber } from './serialNumbers';

test('initializeSerialNumber should return a string with the correct format for invoice type', () => {
	const result = initializeSerialNumber('INVOICE');
	expect(result).toMatch(/^INV-\d{4}-\d{5}$/);
});

test('initializeSerialNumber should return a string with the correct format for quick-link type', () => {
	const result = initializeSerialNumber('QUICK_LINK');
	expect(result).toMatch(/^QL-\d{4}-\d{5}$/);
});

test('incrementSerialNumber should increment the serial number correctly', () => {
	const serial = 'INV-2022-00001';
	const result = incrementSerialNumber(serial);
	expect(result).toBe('INV-2022-00002');
});

test('incrementSerialNumber should handle serial numbers with different prefixes', () => {
	const serial = 'QL-2022-00001';
	const result = incrementSerialNumber(serial);
	expect(result).toBe('QL-2022-00002');
});

test('incrementSerialNumber should handle serial numbers with different years', () => {
	const serial = 'INV-2023-00001';
	const result = incrementSerialNumber(serial);
	expect(result).toBe('INV-2023-00002');
});

test('incrementSerialNumber should handle serial numbers with different number lengths', () => {
	const serial = 'INV-2022-00099';
	const result = incrementSerialNumber(serial);
	expect(result).toBe('INV-2022-00100');
});
