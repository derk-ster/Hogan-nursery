"use client";

import { business } from "@/data/business";
import { useVisitList } from "@/context/VisitListContext";
import { getTodayHoursDisplay } from "@/lib/hours";
import { useMounted } from "@/hooks/useMounted";
import { VisitListItemRow } from "@/components/visit-list/VisitListItemRow";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useEffect, useState } from "react";

export function VisitListDrawer() {
  const { items, count, isOpen, closeDrawer, removeFromList, clearList } =
    useVisitList();
  const mounted = useMounted();
  const todayHours = mounted ? getTodayHoursDisplay() : "";
  const [clearing, setClearing] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) closeDrawer();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeDrawer]);

  useEffect(() => {
    if (!isOpen) {
      setShowClearConfirm(false);
      setClearing(false);
    }
  }, [isOpen]);

  const handleClear = () => {
    if (items.length === 0) return;
    setClearing(true);
    setShowClearConfirm(false);
    const duration = items.length * 45 + 380;
    setTimeout(() => {
      clearList();
      setClearing(false);
    }, duration);
  };

  if (!isOpen) return null;

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-[60] bg-charcoal/40"
        aria-label="Dismiss overlay"
        onClick={closeDrawer}
      />
      <aside
        className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-md flex-col bg-cream shadow-2xl drawer-slide-in"
        role="dialog"
        aria-modal="true"
        aria-labelledby="visit-list-title"
      >
        <div className="flex items-center justify-between border-b border-brown/20 px-5 py-4">
          <div>
            <h2 id="visit-list-title" className="font-display text-xl font-semibold">
              Visit List
            </h2>
            <p className="text-sm text-charcoal/70">{count} items</p>
          </div>
          <button
            type="button"
            onClick={closeDrawer}
            className="rounded-lg border border-brown/30 p-2 hover:bg-sand"
            aria-label="Close visit list"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          <p className="mb-4 text-sm text-charcoal/80">
            Use this list when you call or visit.
          </p>

          {items.length === 0 && !clearing ? (
            <p className="rounded-xl bg-sand p-4 text-sm text-charcoal/75">
              Your list is empty. Add categories from Plants or take the yard quiz.
            </p>
          ) : (
            <ul className="space-y-2">
              {items.map((item, index) => (
                <VisitListItemRow
                  key={item}
                  item={item}
                  index={index}
                  clearing={clearing}
                  onRemove={removeFromList}
                />
              ))}
            </ul>
          )}

          {items.length > 0 && !clearing && (
            <div className="mt-4">
              {!showClearConfirm ? (
                <button
                  type="button"
                  onClick={() => setShowClearConfirm(true)}
                  className="text-sm text-charcoal/60 hover:text-terracotta"
                >
                  Clear list
                </button>
              ) : (
                <div className="visit-list-clear-prompt rounded-xl border border-terracotta/30 bg-sand p-3">
                  <p className="text-sm text-charcoal">Clear your whole list?</p>
                  <div className="mt-2 flex gap-2.5">
                    <MagneticButton
                      type="button"
                      variant="primary"
                      className="flex-1"
                      onClick={handleClear}
                    >
                      Yes, clear all
                    </MagneticButton>
                    <button
                      type="button"
                      onClick={() => setShowClearConfirm(false)}
                      className="flex-1 rounded-full border border-brown/25 py-2 text-xs text-charcoal"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {clearing && (
            <p className="mt-3 text-center text-xs text-charcoal/55" aria-live="polite">
              Clearing list...
            </p>
          )}
        </div>

        <div className="border-t border-brown/20 bg-sand p-5">
          <p className="text-sm font-medium">{business.address.full}</p>
          <p className="mt-1 text-sm" suppressHydrationWarning>
            Today: <span className="font-medium">{todayHours || "..."}</span>
          </p>
          <p className="mt-1 text-sm">{business.phone}</p>
          <div className="mt-4 flex flex-col gap-2.5">
            <MagneticButton
              href={business.phoneTel}
              variant="primary"
              className="w-full"
            >
              Call Store
            </MagneticButton>
            <MagneticButton
              href={business.mapsUrl}
              variant="ghost"
              className="w-full !text-olive"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Directions
            </MagneticButton>
          </div>
        </div>
      </aside>
    </>
  );
}
