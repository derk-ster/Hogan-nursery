import { business } from "@/data/business";
import { hoursSummary } from "@/data/hours";

export function Footer() {
  return (
    <footer className="border-t border-brown/20 bg-olive-dark py-10 text-cream/90">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex flex-col gap-6 md:flex-row md:justify-between">
          <div>
            <p className="font-display text-lg font-semibold text-cream">
              {business.name}
            </p>
            <p className="mt-2 text-sm">{business.address.full}</p>
            <p className="mt-1 text-sm">
              <a href={business.phoneTel} className="hover:underline">
                {business.phone}
              </a>
            </p>
            <p className="mt-2 text-sm text-cream/70">{business.tagline}</p>
          </div>
          <div className="text-sm text-cream/75">
            <p className="font-medium text-cream">Hours</p>
            <p className="mt-1">{hoursSummary}</p>
          </div>
        </div>
        <p className="mt-8 border-t border-cream/10 pt-6 text-center text-xs text-cream/50">
          Website demo concept for {business.shortName}. Not a live inventory system.
        </p>
      </div>
    </footer>
  );
}
