"use client";

import { useState } from "react";

interface VisitListItemRowProps {
  item: string;
  index: number;
  clearing: boolean;
  onRemove: (name: string) => void;
}

export function VisitListItemRow({
  item,
  index,
  clearing,
  onRemove,
}: VisitListItemRowProps) {
  const [exiting, setExiting] = useState(false);

  const handleRemove = () => {
    setExiting(true);
    setTimeout(() => onRemove(item), 340);
  };

  return (
    <li
      className={`visit-list-item flex items-center justify-between rounded-xl border border-brown/15 bg-tan/50 px-4 py-3 ${
        clearing ? "visit-list-item-clearing" : ""
      } ${exiting ? "visit-list-item-exit" : "visit-list-item-enter"}`}
      style={
        clearing
          ? { animationDelay: `${index * 45}ms` }
          : { animationDelay: `${Math.min(index * 30, 150)}ms` }
      }
    >
      <span className="text-sm font-medium">{item}</span>
      <button
        type="button"
        onClick={handleRemove}
        disabled={exiting || clearing}
        className="text-xs text-terracotta hover:underline disabled:opacity-50"
        aria-label={`Remove ${item}`}
      >
        Remove
      </button>
    </li>
  );
}
