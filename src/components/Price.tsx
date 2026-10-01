import { formatDollarAmount, formatPrice, formatUSD } from '@/lib/format';

interface PriceProps {
  /** Amount in Naira. */
  amount: number;
  /** Exact dollar price, when set by the owner. */
  usdAmount?: number;
}

/**
 * Renders "₦50,000 ≈ $37". Inherits the colour/size of its parent element so it
 * can drop in anywhere a plain formatPrice() string was used.
 */
export default function Price({ amount, usdAmount }: PriceProps) {
  return (
    <>
      {formatPrice(amount)}
      <span className="ml-2 whitespace-nowrap text-[0.75em] opacity-60">
        {usdAmount === undefined ? '≈ ' : ''}{usdAmount === undefined ? formatUSD(amount) : formatDollarAmount(usdAmount)}
      </span>
    </>
  );
}
