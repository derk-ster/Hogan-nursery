"use client";

import { galleryItems } from "@/data/gallery";
import Image from "next/image";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

export function GallerySection() {
  return (
    <section
      id="gallery"
      className="scroll-mt-[4.5rem] bg-sand py-10 md:py-12"
      aria-labelledby="gallery-heading"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <Reveal>
          <SectionHeading
            id="gallery-heading"
            title="At the nursery"
            subtitle="A look at the yard and stock. Photos can be updated with real store images."
          />
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {galleryItems.map((item) => (
            <Reveal key={item.id}>
              <article className="gallery-zoom card-hover-lift overflow-hidden rounded-2xl border border-brown/20 bg-cream shadow-card">
                <div className="relative aspect-[4/3] bg-tan">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div
                      className="gallery-placeholder flex h-full flex-col items-center justify-center p-6 text-center"
                      aria-label={item.alt}
                    >
                      <svg
                        className="h-12 w-12 text-leaf/35"
                        viewBox="0 0 48 48"
                        fill="currentColor"
                        aria-hidden
                      >
                        <path d="M24 4C14 12 8 22 8 30c0 6 3 12 16 14 13-2 16-8 16-14 0-8-6-18-16-26zm0 38c-8-1-11-5-11-9 0-6 4-13 11-20 7 7 11 14 11 20 0 4-3 8-11 9z" />
                      </svg>
                      <p className="mt-3 font-display text-lg font-semibold text-olive-dark">
                        {item.title}
                      </p>
                      <p className="mt-1 text-xs text-charcoal/50">
                        Add image to public/assets/hogan-nursery/gallery/
                      </p>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-medium uppercase tracking-wide text-clay">
                      {item.category}
                    </span>
                    {item.seenInStore && (
                      <span className="rounded-full bg-olive/10 px-2 py-0.5 text-[10px] font-medium text-olive">
                        Seen in store
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-charcoal/80">{item.caption}</p>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full bg-sand px-2 py-0.5 text-xs text-charcoal/70"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-charcoal/60">
          <a href="#stock-check" className="font-medium text-olive hover:underline">
            Check yard stock
          </a>{" "}
          from these photos. Yard photos change often.
        </p>
      </div>
    </section>
  );
}
