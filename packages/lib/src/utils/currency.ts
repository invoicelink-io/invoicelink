export const currencyCodes = [
  "AED",
  "CAD",
  "EUR",
  "GBP",
  "INR",
  "USD",
  "ZAR",
] as const;

export const currencyLabels = {
  AED: "United Arab Emirates Dirham",
  CAD: "Canadian Dollar",
  EUR: "Euro",
  GBP: "British Pound",
  INR: "Indian Rupee",
  USD: "US Dollar",
  ZAR: "South African Rand",
};

export const currencies = currencyCodes.map((key) => {
  return {
    value: key,
    label: key + " | " + currencyLabels[key],
  };
});

console.log(currencies);

export function formatCurrency(
  value: number | string,
  locale: string,
  currency: string
) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(Number(value));
}
