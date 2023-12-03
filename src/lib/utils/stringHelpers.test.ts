import { expect, test } from 'vitest';
import { getInitials, capitalizeFirstLetter, pad } from './stringHelpers';

test('Get initials from names', () => {
	expect(getInitials(`John Mayer`)).toBe('JM');
	expect(getInitials(`john mayer`)).toBe('jm');
	expect(getInitials(`John`)).toBe('J');
	expect(getInitials(`John Clayton Mayer`)).toBe('JM');
});

test('Capitalize first letter', () => {
	expect(capitalizeFirstLetter('john')).toBe('John');
	expect(capitalizeFirstLetter('john mayer')).toBe('John mayer');
	expect(capitalizeFirstLetter('John mayer')).toBe('John mayer');
});

// test pad function
test('Pad string before with default parameters', () => {
	expect(pad('1', '0')).toBe('00001');
});

test('Pad string after with default parameters', () => {
	expect(pad('1', '0', 5, false)).toBe('10000');
});

test('Pad string before with custom length', () => {
	expect(pad('1234', '0', 8, true)).toBe('00001234');
});

test('Pad string after with custom length', () => {
	expect(pad('1234', '0', 8, false)).toBe('12340000');
});

test('Pad string before with length less than string length', () => {
	expect(pad('123456', '0', 5, true)).toBe('123456');
});

test('Pad string after with length less than string length', () => {
	expect(pad('123456', '0', 5, false)).toBe('123456');
});

test('Pad string before with empty pad character', () => {
	expect(pad('hello', '', 10, true)).toBe('hello');
});

test('Pad string after with empty pad character', () => {
	expect(pad('hello', '', 10, false)).toBe('hello');
});
