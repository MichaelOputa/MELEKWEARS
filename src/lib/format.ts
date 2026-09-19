/**
 * PRICING DISPLAY
 *
 * All prices are stored in Naira (NGN) on each product. The dollar figure shown
 * beside it is an approximate equivalent worked out from NGN_PER_USD below.
 *
 * To update the dollar equivalents site-wide, change NGN_PER_USD — nothing else.
 */
export const NGN_PER_USD = 1350;

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Dollar equivalent of a Naira amount, rounded to the nearest whole dollar. */
export function formatUSD(amountNGN: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amountNGN / NGN_PER_USD);
}
