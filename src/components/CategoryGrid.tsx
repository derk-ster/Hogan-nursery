"use client";

import { categories, type Category } from "@/data/categories";
import { useCallback, useState } from "react";
import { CategoryDrawer } from "./CategoryDrawer";
import { MagneticButton } from "./ui/MagneticButton";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

export function CategoryGrid() {
  const [active, setActive] = useState<Category | null>(null);
  const closeDrawer = useCallback(() => setActive(null), []);

  return (
    <section
      id="plants"
      className="scroll-mt-[4.5rem] bg-cream py-10 md:py-12"
      aria-labelledby="plants-heading"
    >
      <div className="mx-auto min-w-0 max-w-6xl px-4 md:px-6">
        <Reveal>
          <SectionHeading
            id="plants-heading"
            title="What we carry"
            subtitle="Browse common categories. Pick specific items before you visit."
          />
        </Reveal>

        <Reveal>
          <p className="mb-4 text-center text-xs text-charcoal/55">
            Scroll sideways for more categories
          </p>
        </Reveal>

        <div className="min-w-0 max-w-full overflow-hidden">
          <div className="panel-scroll overflow-x-auto overscroll-x-contain pb-1 md:-mx-6 md:px-6">
            <div className="inline-grid grid-flow-col grid-rows-2 auto-cols-[minmax(15rem,17rem)] gap-4">
            {categories.map((cat, i) => (
              <Reveal key={cat.id} className="h-full">
                <article
                  className="card-hover-lift product-shimmer flex h-full min-h-[15rem] flex-col rounded-2xl border border-brown/20 bg-tan/60 p-5"
                  style={{ transitionDelay: `${i * 50}ms` }}
                >
                <span className="w-fit rounded-full bg-clay/15 px-2 py-0.5 text-xs font-medium text-terracotta">
                  {cat.badge}
                </span>
                <h3 className="mt-3 font-display text-xl font-semibold text-charcoal">
                  {cat.title}
                </h3>
                <p className="mt-2 flex-1 text-sm text-charcoal/75">{cat.sentence}</p>
                <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
                  <MagneticButton
                    type="button"
                    variant="ghost"
                    className="flex-1 !text-olive"
                    onClick={() => setActive(cat)}
                  >
                    Explore
                  </MagneticButton>
                  <MagneticButton
                    type="button"
                    variant="primary"
                    className="flex-1"
                    onClick={() => setActive(cat)}
                  >
                    Pick Items
                  </MagneticButton>
                </div>
              </article>
            </Reveal>
          ))}
            </div>
          </div>
        </div>
      </div>

      <CategoryDrawer category={active} onClose={closeDrawer} />
    </section>
  );
}
