import type { StockStatus } from "@/data/stock";
import { stockStatusLabels } from "@/data/stock";

const styles: Record<StockStatus, string> = {
  in_stock: "bg-leaf/20 text-olive-dark ring-leaf/40",
  low_stock: "bg-amber-100/80 text-amber-900 ring-amber-300/50",
  call_first: "bg-sand text-charcoal/80 ring-brown/25",
  seasonal: "bg-clay/15 text-terracotta ring-clay/30",
};

interface StockBadgeProps {
  status: StockStatus;
  compact?: boolean;
}

export function StockBadge({ status, compact }: StockBadgeProps) {
  const { label, short } = stockStatusLabels[status];
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ring-1 ${styles[status]}`}
    >
      {compact ? short : label}
    </span>
  );
}
