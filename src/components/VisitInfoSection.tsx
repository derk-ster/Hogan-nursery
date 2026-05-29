"use client";

import { business } from "@/data/business";
import { hoursSummary, weeklyHours } from "@/data/hours";
import { reviews } from "@/data/reviews";
import { useVisitList } from "@/context/VisitListContext";
import { getTodayKey, isStoreOpen } from "@/lib/hours";
import { useMounted } from "@/hooks/useMounted";
import { MagneticButton } from "./ui/MagneticButton";
import { StarDisplay } from "./ui/StarDisplay";
import { Reveal } from "./ui/Reveal";

export function VisitInfoSection() {
  const mounted = useMounted();
  const { openDrawer } = useVisitList();

  const open = mounted ? isStoreOpen() : null;
  const todayKey = mounted ? getTodayKey() : "";

  return (
    <section
      id="visit-info"
      className="scroll-mt-[4.5rem] border-t border-brown/15 bg-sand py-8 md:py-10"
      aria-labelledby="visit-info-heading"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <h2 id="visit-info-heading" className="sr-only">
          Reviews, hours, and contact
        </h2>

        <div className="grid gap-5 lg:grid-cols-3 lg:items-start lg:gap-4">
          <Reveal>
            <div
              id="reviews"
              className="flex min-w-0 flex-col overflow-hidden rounded-xl border border-brown/15 bg-cream p-4"
            >
              <h3 className="font-display text-lg font-semibold text-charcoal">
                Reviews
              </h3>
              <p className="mt-0.5 text-xs text-charcoal/65">
                Trusted by local gardeners
              </p>

              <div className="mt-3 flex items-center justify-center gap-3 rounded-lg bg-sand/80 px-3 py-3">
                <span className="font-display text-3xl font-semibold text-olive">
                  {business.rating}
                </span>
                <StarDisplay rating={business.rating} size="lg" />
              </div>

              <p className="mt-3 text-[10px] text-charcoal/55">
                Scroll sideways for more reviews
              </p>

              <ul
                className="reviews-scroll -mx-1 mt-2 flex min-w-0 gap-2.5 overflow-x-auto overscroll-x-contain px-1 pb-2"
                aria-label="Customer reviews"
              >
                {reviews.map((review) => (
                  <li
                    key={review.id}
                    className="w-[13.5rem] max-w-[72vw] shrink-0 rounded-lg border border-brown/10 bg-sand/50 px-3 py-2.5"
                  >
                    <p className="text-xs leading-snug text-charcoal/85">
                      &ldquo;{review.quote}&rdquo;
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal>
            <div
              id="hours"
              className="flex flex-col rounded-xl border border-brown/15 bg-cream p-4"
            >
              <h3 className="font-display text-lg font-semibold text-charcoal">
                Hours
              </h3>
              <p className="mt-0.5 text-xs text-charcoal/65">
                Open early on weekdays
              </p>

              {mounted && open !== null && (
                <div className="mt-3">
                  <span
                    className={`inline-block rounded-full px-3 py-0.5 text-xs font-semibold ${
                      open
                        ? "bg-leaf/20 text-olive-dark open-badge-glow"
                        : "bg-charcoal/10 text-charcoal/70"
                    }`}
                  >
                    {open ? "Open Now" : "Closed Now"}
                  </span>
                </div>
              )}

              <ul className="mt-3 space-y-0.5" suppressHydrationWarning>
                {weeklyHours.map((day) => {
                  const isToday = mounted && day.key === todayKey;
                  return (
                    <li
                      key={day.key}
                      className={`flex justify-between rounded px-2 py-1 text-xs ${
                        isToday
                          ? "bg-olive/10 font-semibold text-olive-dark"
                          : "text-charcoal/80"
                      }`}
                    >
                      <span>{day.label}</span>
                      <span>{day.display}</span>
                    </li>
                  );
                })}
              </ul>

              <p className="mt-2 text-[11px] text-charcoal/60">
                Sat closes at noon. Sun closed.
              </p>
              <a
                href={business.phoneTel}
                className="mt-3 text-xs font-medium text-terracotta hover:underline"
              >
                Call to check stock
              </a>
            </div>
          </Reveal>

          <Reveal>
            <div
              id="contact"
              className="flex flex-col rounded-xl border border-brown/15 bg-cream p-4"
            >
              <h3 className="font-display text-lg font-semibold text-charcoal">
                Contact
              </h3>
              <p className="mt-0.5 text-xs text-charcoal/65">
                Stop by the yard in Plano
              </p>

              <address className="mt-3 not-italic text-xs leading-relaxed text-charcoal/85">
                <p className="font-medium text-charcoal">{business.address.full}</p>
                <p className="mt-1 text-[10px] text-charcoal/55">
                  {business.plusCode}
                </p>
                <p className="mt-1 text-charcoal/65">{hoursSummary}</p>
              </address>

              <p className="mt-2 text-xs text-charcoal/70">
                Call if you need a specific plant. Stock changes daily.
              </p>

              <div className="mt-3 flex flex-col gap-2.5">
                <MagneticButton
                  href={business.phoneTel}
                  variant="primary"
                  className="w-full"
                >
                  Call {business.phone}
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
                <MagneticButton
                  type="button"
                  variant="ghost"
                  className="w-full"
                  onClick={openDrawer}
                >
                  Open Visit List
                </MagneticButton>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
