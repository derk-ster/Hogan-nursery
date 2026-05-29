"use client";

import { products } from "@/data/products";
import { business } from "@/data/business";
import { AddToListButton } from "./ui/AddToListButton";
import { MagneticButton } from "./ui/MagneticButton";
import { StockBadge } from "./ui/StockBadge";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

export function FeaturedProducts() {
  return (
    <section
      className="bg-cream py-10 md:py-12"
      aria-labelledby="featured-heading"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <Reveal>
          <SectionHeading
            id="featured-heading"
            title="Popular picks"
            subtitle="Each item shows a yard stock hint. Confirm by phone before you visit."
          />
        </Reveal>

        <Reveal>
          <p className="-mt-4 mb-2 text-center text-sm">
            <a href="#stock-check" className="font-medium text-olive hover:underline">
              Open full stock check
            </a>
          </p>
          <p className="mb-4 text-center text-xs text-charcoal/55">
            Scroll for more picks
          </p>
        </Reveal>

        <div className="panel-scroll max-h-[calc(20rem*2+1rem)] overflow-y-auto overscroll-contain pr-1">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <Reveal key={product.id}>
                <article className="product-shimmer card-hover-lift flex h-full min-h-[19rem] flex-col rounded-2xl border border-brown/20 bg-tan/50 p-4 sm:min-h-[18rem]">
                  <div className="flex items-start justify-between gap-2">
                    <StockBadge status={product.stockStatus} />
                    <span className="text-xs text-charcoal/50">{product.category}</span>
                  </div>
                  <h3 className="mt-3 font-display text-lg font-semibold text-charcoal">
                    {product.name}
                  </h3>
                  <p className="mt-1.5 font-display text-xl font-semibold tracking-tight text-olive-dark">
                    {product.price}
                  </p>
                  <p className="mt-1 text-xs text-charcoal/65">{product.stockNote}</p>
                  <p className="mt-2 line-clamp-3 flex-1 text-sm text-charcoal/75">
                    {product.description}
                  </p>
                  <span className="mt-2 w-fit rounded-full bg-clay/10 px-2 py-0.5 text-[10px] font-medium text-terracotta">
                    {product.badge}
                  </span>
                  <div className="mt-4 flex flex-col gap-2.5">
                    <AddToListButton itemName={product.name} fullWidth />
                    <MagneticButton
                      href={
                        product.stockStatus === "in_stock"
                          ? "#stock-check"
                          : business.phoneTel
                      }
                      variant="secondary"
                      className="w-full"
                    >
                      {product.stockStatus === "in_stock"
                        ? "Check Stock"
                        : "Call to Check"}
                    </MagneticButton>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
