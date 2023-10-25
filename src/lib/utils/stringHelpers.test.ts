// sum.test.js
import { expect, test } from 'vitest';
import { getInitials, capitalizeFirstLetter } from './stringHelpers';

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
