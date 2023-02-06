export default function currencyFormatter(rawValue) {
  return new Intl.NumberFormat('mn-MN', { currency: 'MNT', maximumFractionDigits: 0 }).format(rawValue);
}
