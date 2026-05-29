"use client";

import type { Category } from "@/data/categories";
import { stockItems } from "@/data/stock";
import { ItemPicker, type PickableItem } from "@/components/ui/ItemPicker";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { StockBadge } from "./ui/StockBadge";
import { useEffect, useMemo } from "react";

interface CategoryDrawerProps {
  category: Category | null;
  onClose: () => void;
}

export function CategoryDrawer({ category, onClose }: CategoryDrawerProps) {
  const categoryStock = useMemo(() => {
    if (!category) return [];
    return category.visitListItems
      .map((name) => stockItems.find((s) => s.name === name))
      .filter((item): item is NonNullable<typeof item> => Boolean(item));
  }, [category]);

  const pickableItems = useMemo((): PickableItem[] => {
    if (!category) return [];
    const seen = new Set<string>();
    const list: PickableItem[] = [];

    for (const name of category.visitListItems) {
      if (seen.has(name)) continue;
      seen.add(name);
      list.push({
        id: `visit-${name}`,
        name,
        note: "Common pick for this category",
      });
    }

    for (const ex of category.examples) {
      if (seen.has(ex.name)) continue;
      seen.add(ex.name);
      list.push({
        id: ex.id,
        name: ex.name,
        note: ex.note,
      });
    }

    return list;
  }, [category]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (category) {
      window.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [category, onClose]);

  if (!category) return null;

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-[55] bg-charcoal/40"
        aria-label="Close category details"
        onClick={onClose}
      />
      <div
        className="fixed inset-x-4 bottom-4 top-auto z-[56] mx-auto max-h-[85vh] max-w-lg overflow-hidden rounded-2xl border border-brown/20 bg-cream shadow-2xl md:inset-x-auto md:right-6 md:top-1/2 md:bottom-auto md:-translate-y-1/2 drawer-slide-in"
        role="dialog"
        aria-modal="true"
        aria-labelledby="category-drawer-title"
      >
        <div className="flex items-start justify-between border-b border-brown/15 p-5">
          <div>
            <span className="rounded-full bg-clay/20 px-2 py-0.5 text-xs font-medium text-terracotta">
              {category.badge}
            </span>
            <h3
              id="category-drawer-title"
              className="mt-2 font-display text-2xl font-semibold text-charcoal"
            >
              {category.title}
            </h3>
            <p className="mt-1 text-sm text-charcoal/75">{category.sentence}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-brown/30 p-2"
            aria-label="Close"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="max-h-[55vh] overflow-y-auto p-5">
          <ItemPicker
            items={pickableItems}
            title="Add specific items"
            hint="Choose one or more. We will not add the whole category at once."
          />

          {categoryStock.length > 0 && (
            <div className="mt-4 rounded-xl border border-brown/15 bg-sand p-3">
              <p className="text-xs font-medium text-olive">Yard stock hints</p>
              <ul className="mt-2 space-y-2">
                {categoryStock.map(
                  (item) =>
                    item && (
                      <li
                        key={item.id}
                        className="flex items-center justify-between gap-2 text-xs"
                      >
                        <span className="text-charcoal/80">{item.name}</span>
                        <StockBadge status={item.status} compact />
                      </li>
                    )
                )}
              </ul>
            </div>
          )}

          <p className="mt-4 text-xs text-charcoal/60">
            <a href="#stock-check" className="text-olive hover:underline">
              Full stock check
            </a>
            . Call to confirm before you visit.
          </p>
        </div>

        <div className="border-t border-brown/15 p-5">
          <MagneticButton
            href="#stock-check"
            variant="secondary"
            className="w-full"
            onClick={onClose}
          >
            Check Stock
          </MagneticButton>
        </div>
      </div>
    </>
  );
}
