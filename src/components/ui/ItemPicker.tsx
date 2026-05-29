"use client";

import { useMemo, useRef, useState } from "react";
import { useVisitList } from "@/context/VisitListContext";
import { MagneticButton } from "./MagneticButton";

export interface PickableItem {
  id: string;
  name: string;
  note?: string;
}

interface ItemPickerProps {
  items: PickableItem[];
  title?: string;
  hint?: string;
}

export function ItemPicker({
  items,
  title = "Pick what to add",
  hint = "Select one or more. Already on your list items are marked.",
}: ItemPickerProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const addBtnRef = useRef<HTMLButtonElement>(null);
  const { hasItem, addManyToList } = useVisitList();

  const available = useMemo(
    () => items.filter((item) => !hasItem(item.name)),
    [items, hasItem]
  );

  const toggle = (name: string) => {
    if (hasItem(name)) return;
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  const selectAll = () => {
    setSelected(new Set(available.map((i) => i.name)));
  };

  const clearSelection = () => setSelected(new Set());

  const handleAdd = () => {
    const names = [...selected].filter((n) => !hasItem(n));
    if (names.length === 0) return;
    addManyToList(names, addBtnRef.current);
    setSelected(new Set());
  };

  return (
    <div className="rounded-xl border border-brown/15 bg-cream p-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-medium text-olive">{title}</p>
          <p className="mt-0.5 text-xs text-charcoal/60">{hint}</p>
        </div>
        {available.length > 1 && (
          <div className="flex shrink-0 gap-2 text-[10px]">
            <button
              type="button"
              onClick={selectAll}
              className="text-olive hover:underline"
            >
              All
            </button>
            <button
              type="button"
              onClick={clearSelection}
              className="text-charcoal/50 hover:underline"
            >
              None
            </button>
          </div>
        )}
      </div>

      <ul
        className="panel-scroll mt-3 max-h-[min(12rem,32vh)] space-y-2 overflow-y-auto overscroll-contain pr-1"
        role="listbox"
        aria-label={title}
      >
        {items.map((item) => {
          const onList = hasItem(item.name);
          const isSelected = selected.has(item.name);
          return (
            <li key={item.id}>
              <button
                type="button"
                role="option"
                aria-selected={isSelected}
                disabled={onList}
                onClick={() => toggle(item.name)}
                className={`flex w-full items-start gap-3 rounded-lg border px-3 py-2.5 text-left transition ${
                  onList
                    ? "cursor-default border-leaf/30 bg-leaf/5 opacity-70"
                    : isSelected
                      ? "quiz-selected"
                      : "border-brown/15 bg-sand/50 hover:border-clay"
                }`}
              >
                <span
                  className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border text-[10px] ${
                    onList
                      ? "border-leaf bg-leaf text-cream"
                      : isSelected
                        ? "border-olive bg-olive text-cream"
                        : "border-brown/40 bg-cream"
                  }`}
                  aria-hidden
                >
                  {(onList || isSelected) && (onList ? "✓" : "•")}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium text-charcoal">
                    {item.name}
                  </span>
                  {item.note && (
                    <span className="mt-0.5 block text-xs text-charcoal/65">
                      {item.note}
                    </span>
                  )}
                  {onList && (
                    <span className="mt-1 block text-[10px] font-medium text-leaf">
                      Already on your list
                    </span>
                  )}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <MagneticButton
        ref={addBtnRef}
        type="button"
        variant="primary"
        className="mt-4 w-full"
        disabled={selected.size === 0}
        onClick={handleAdd}
      >
        {selected.size === 0
          ? "Select items to add"
          : `Add ${selected.size} to Visit List`}
      </MagneticButton>
    </div>
  );
}
