"use client";

import { business } from "@/data/business";
import {
  stockDisclaimer,
  stockItems,
  getStockCounts,
  type StockStatus,
} from "@/data/stock";
import { useMemo, useState } from "react";
import { AddToListButton } from "./ui/AddToListButton";
import { MagneticButton } from "./ui/MagneticButton";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";
import { StockBadge } from "./ui/StockBadge";

type FilterKey = "all" | StockStatus | "seen";

const filters: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "in_stock", label: "In Stock" },
  { key: "low_stock", label: "Low Stock" },
  { key: "call_first", label: "Call First" },
  { key: "seasonal", label: "Seasonal" },
  { key: "seen", label: "Seen in Store" },
];

export function StockCheckSection() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterKey>("all");
  const counts = getStockCounts();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return stockItems.filter((item) => {
      if (filter === "seen" && !item.seenInStore) return false;
      if (filter !== "all" && filter !== "seen" && item.status !== filter) {
        return false;
      }
      if (!q) return true;
      return (
        item.name.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.note.toLowerCase().includes(q)
      );
    });
  }, [query, filter]);

  return (
    <section
      id="stock-check"
      className="scroll-mt-[4.5rem] border-y border-brown/15 bg-cream py-10 md:py-12"
      aria-labelledby="stock-heading"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <Reveal>
          <SectionHeading
            id="stock-heading"
            title="Check yard stock"
            subtitle="See what was recently on the lot. Call to confirm before you visit."
          />
        </Reveal>

        <Reveal>
          <div className="rounded-2xl border border-brown/20 bg-sand/50 p-4 md:p-5">
            <p className="text-center text-sm text-charcoal/75">
              <span className="font-medium text-olive-dark">{counts.in_stock}</span> in
              stock ·{" "}
              <span className="font-medium text-amber-900">{counts.low_stock}</span> low ·{" "}
              <span className="font-medium text-charcoal">{counts.call_first}</span> call
              first ·{" "}
              <span className="font-medium text-terracotta">{counts.seasonal}</span>{" "}
              seasonal
            </p>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
              <label className="sr-only" htmlFor="stock-search">
                Search stock
              </label>
              <input
                id="stock-search"
                type="search"
                placeholder="Search plants or supplies..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 rounded-full border border-brown/25 bg-cream px-4 py-2.5 text-sm text-charcoal placeholder:text-charcoal/45 focus:border-olive focus:outline-none focus:ring-2 focus:ring-olive/20"
              />
              <MagneticButton
                href={business.phoneTel}
                variant="primary"
                className="w-full shrink-0 sm:w-auto"
              >
                Call to Confirm
              </MagneticButton>
            </div>

            <div
              className="filter-scroll mt-4 flex gap-2 overflow-x-auto pb-1"
              role="tablist"
              aria-label="Stock filters"
            >
              {filters.map((f) => (
                <button
                  key={f.key}
                  type="button"
                  role="tab"
                  aria-selected={filter === f.key}
                  onClick={() => setFilter(f.key)}
                  className={`shrink-0 rounded-full px-3.5 py-2 text-xs font-medium transition ${
                    filter === f.key
                      ? "bg-olive text-cream"
                      : "border border-brown/25 bg-cream text-charcoal hover:border-clay"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="panel-scroll mt-4 max-h-[min(22rem,45vh)] overflow-y-auto overscroll-contain pr-1">
              <ul className="space-y-2">
                {filtered.length === 0 ? (
                  <li className="rounded-xl bg-cream p-5 text-center text-sm text-charcoal/70">
                    No matches. Try another search or call the store.
                  </li>
                ) : (
                  filtered.map((item) => (
                    <li
                      key={item.id}
                      className="card-hover-lift flex flex-col gap-3 rounded-xl border border-brown/15 bg-cream p-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-medium text-charcoal">{item.name}</h3>
                          <StockBadge status={item.status} />
                          {item.seenInStore && (
                            <span className="rounded-full bg-olive/10 px-2 py-0.5 text-[10px] font-medium text-olive">
                              Seen in store
                            </span>
                          )}
                        </div>
                        <p className="mt-0.5 text-xs text-charcoal/55">{item.category}</p>
                        <p className="mt-1 text-sm text-charcoal/75">{item.note}</p>
                      </div>
                      <div className="flex shrink-0 flex-col gap-2.5 sm:min-w-[9.5rem]">
                        <AddToListButton
                          itemName={item.name}
                          label="Add to List"
                          addedLabel="On list"
                          variant="ghost"
                          className="!text-olive"
                        />
                        {(item.status === "call_first" ||
                          item.status === "seasonal" ||
                          item.status === "low_stock") && (
                          <MagneticButton
                            href={business.phoneTel}
                            variant="primary"
                          >
                            Call Store
                          </MagneticButton>
                        )}
                      </div>
                    </li>
                  ))
                )}
              </ul>
            </div>

            {filtered.length > 0 && (
              <p className="mt-3 text-center text-xs text-charcoal/55">
                {filtered.length} item{filtered.length === 1 ? "" : "s"} · scroll the list
              </p>
            )}
          </div>
        </Reveal>

        <p className="mt-4 text-center text-xs text-charcoal/60">{stockDisclaimer}</p>
      </div>
    </section>
  );
}
