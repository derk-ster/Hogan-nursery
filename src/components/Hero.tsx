"use client";

import { business } from "@/data/business";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { StarDisplay } from "@/components/ui/StarDisplay";

const badges = ["Hard to Find Plants", "North Texas Plant Help"];

const floatCards = [
  { label: "Healthy Plants", delay: "" },
  { label: "Trees & Shrubs", delay: "animation-float-delay" },
  { label: "Hard to Find Varieties", delay: "animation-float-slow" },
  { label: "Flower Flats", delay: "animation-float" },
  { label: "Special Orders", delay: "animation-float-delay" },
  { label: "Project Help", delay: "animation-float-slow" },
];

export function Hero() {
  const scrollToQuiz = () => {
    document.getElementById("yard-quiz")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative overflow-hidden pt-16 pb-12 md:pt-20 md:pb-14"
      aria-labelledby="hero-heading"
    >
      <div className="sunlight-glow pointer-events-none absolute inset-0" aria-hidden />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 md:grid-cols-2 md:items-center md:px-6">
        <div>
          <div
            className="mb-4 inline-flex items-center gap-2 text-leaf animation-leaf-sway"
            aria-hidden
          >
            <svg className="h-8 w-8" viewBox="0 0 32 32" fill="currentColor">
              <path d="M16 2C10 8 6 14 6 20c0 4 2 8 10 10 8-2 10-6 10-10 0-6-4-12-10-18zm0 26c-5-1-7-4-7-7 0-5 3-10 7-15 4 5 7 10 7 15 0 3-2 6-7 7z" />
            </svg>
            <span className="text-sm font-medium text-olive">Plano, Texas</span>
          </div>

          <h1
            id="hero-heading"
            className="font-display text-4xl font-semibold leading-tight text-charcoal text-balance md:text-5xl"
          >
            Plants, trees, shrubs, and landscape supplies in Plano.
          </h1>
          <p className="mt-4 max-w-lg text-lg text-charcoal/80">
            Find healthy plants, hard to find varieties, and local help for your
            next yard project.
          </p>

          <div
            className="mt-6 flex flex-wrap items-center gap-2"
            aria-label="Highlights"
          >
            <div className="flex items-center gap-2 rounded-full border border-brown/25 bg-tan/80 px-3 py-1.5">
              <span className="font-display text-base font-semibold text-olive">
                {business.rating}
              </span>
              <StarDisplay rating={business.rating} size="md" />
            </div>
            {badges.map((b) => (
              <span
                key={b}
                className="rounded-full border border-brown/25 bg-tan/80 px-3 py-1 text-xs font-medium text-charcoal"
              >
                {b}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <MagneticButton
              type="button"
              variant="primary"
              className="px-6 py-3 text-center font-medium"
              onClick={scrollToQuiz}
            >
              Build Visit List
            </MagneticButton>
            <MagneticButton
              href="#stock-check"
              variant="secondary"
              className="px-6 py-3 text-center font-medium"
            >
              Call to Check Stock
            </MagneticButton>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md md:max-w-none">
          <div
            className="absolute inset-0 rounded-3xl bg-gradient-to-br from-amber-100/60 to-clay/20 blur-2xl animation-glow"
            aria-hidden
          />
          <div className="relative rounded-3xl border border-brown/20 bg-sand/60 p-6 shadow-warm backdrop-blur-sm">
            <p className="mb-4 text-center font-display text-lg font-semibold text-olive-dark">
              At the nursery
            </p>
            <div className="grid grid-cols-2 gap-3">
              {floatCards.map((card, i) => (
                <div
                  key={card.label}
                  className={`rounded-xl border border-brown/15 bg-cream px-3 py-4 text-center text-sm font-medium text-charcoal shadow-card ${card.delay}`}
                  style={{ animationDelay: `${i * 0.4}s` }}
                >
                  <span className="mb-1 block text-lg text-leaf" aria-hidden>
                    ◆
                  </span>
                  {card.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
