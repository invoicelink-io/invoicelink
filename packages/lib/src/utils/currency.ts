export const currencies = [
	{
		value: 'USD',
		label: 'USD'
	},
	{
		value: 'EUR',
		label: 'EUR'
	},
	{
		value: 'ZAR',
		label: 'ZAR'
	}
];

export function formatCurrency(value: number | string, locale: string, currency: string) {
	return new Intl.NumberFormat(locale, {
		style: 'currency',
		currency: currency
	}).format(Number(value));
}
