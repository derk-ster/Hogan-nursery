"use client";

import { useState } from "react";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

const areas = [
  "Front yard",
  "Backyard",
  "Side yard",
  "Flower bed",
  "Patio or porch",
  "Whole yard project",
];

const sizes = ["Small spot", "One bed", "Medium area", "Large area", "Not sure"];

const sunOptions = ["Mostly sunny", "Mix of sun and shade", "Mostly shady", "Not sure"];

export function PhotoHelper({
  panelHeight,
}: {
  panelHeight?: number;
}) {
  const [area, setArea] = useState("");
  const [size, setSize] = useState("");
  const [sun, setSun] = useState("");
  const [replacing, setReplacing] = useState<boolean | null>(null);
  const [lowMaint, setLowMaint] = useState<boolean | null>(null);
  const [showChecklist, setShowChecklist] = useState(false);

  const canShow =
    area && size && sun && replacing !== null && lowMaint !== null;

  const checklist = [
    "Bring a photo of the space",
    "Measure the area if possible",
    `Note sun or shade (${sun || "your best guess"})`,
    "Ask about soil and bed prep",
    replacing
      ? "Tell staff what you are replacing and why"
      : "Describe what you want the area to look like",
    lowMaint
      ? "Ask for low maintenance plant options"
      : "Ask about color and seasonal interest",
    "Call first for hard to find plants",
  ];

  return (
    <div className="w-full min-w-0" aria-labelledby="photo-helper-heading">
      <Reveal>
        <SectionHeading
          id="photo-helper-heading"
          title="Bring a Photo Helper"
          subtitle="Plan what to ask before you visit. No upload needed."
        />
      </Reveal>

      <Reveal>
        <div
          className="mt-6 flex flex-col overflow-hidden rounded-2xl border border-brown/20 bg-cream p-5 shadow-card md:p-6 max-lg:max-h-[min(28rem,55vh)]"
          style={panelHeight ? { height: panelHeight } : undefined}
        >
          <div className="panel-scroll min-h-0 flex-1 space-y-6 overflow-y-auto overscroll-contain pr-1 md:space-y-8">
            <fieldset>
              <legend className="font-medium text-charcoal">What area are you working on?</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {areas.map((a) => (
                  <button
                    key={a}
                    type="button"
                    onClick={() => {
                      setArea(a);
                      setShowChecklist(false);
                    }}
                    className={`rounded-full px-3 py-1.5 text-sm ${
                      area === a ? "quiz-selected" : "border border-brown/25 bg-cream"
                    }`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-charcoal">What is the size?</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      setSize(s);
                      setShowChecklist(false);
                    }}
                    className={`rounded-full px-3 py-1.5 text-sm ${
                      size === s ? "quiz-selected" : "border border-brown/25 bg-cream"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-charcoal">Is it sunny or shady?</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {sunOptions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      setSun(s);
                      setShowChecklist(false);
                    }}
                    className={`rounded-full px-3 py-1.5 text-sm ${
                      sun === s ? "quiz-selected" : "border border-brown/25 bg-cream"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-charcoal">Are you replacing something?</legend>
              <div className="mt-3 flex gap-3">
                {[
                  { label: "Yes", value: true },
                  { label: "No", value: false },
                ].map(({ label, value }) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => {
                      setReplacing(value);
                      setShowChecklist(false);
                    }}
                    className={`rounded-full px-4 py-2 text-sm ${
                      replacing === value
                        ? "quiz-selected"
                        : "border border-brown/25 bg-cream"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-charcoal">Do you want low maintenance?</legend>
              <div className="mt-3 flex gap-3">
                {[
                  { label: "Yes", value: true },
                  { label: "No", value: false },
                ].map(({ label, value }) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => {
                      setLowMaint(value);
                      setShowChecklist(false);
                    }}
                    className={`rounded-full px-4 py-2 text-sm ${
                      lowMaint === value
                        ? "quiz-selected"
                        : "border border-brown/25 bg-cream"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </fieldset>

            <button
              type="button"
              disabled={!canShow}
              onClick={() => setShowChecklist(true)}
              className="w-full rounded-full bg-olive py-3 font-medium text-cream btn-shine disabled:cursor-not-allowed disabled:opacity-50"
            >
              Show my visit checklist
            </button>

            {showChecklist && canShow && (
              <div className="rounded-xl border border-leaf/30 bg-cream p-5">
                <h3 className="font-display text-lg font-semibold text-olive-dark">
                  Your visit checklist
                </h3>
                <p className="mt-1 text-sm text-charcoal/70">
                  For {area.toLowerCase()}, {size.toLowerCase()}.
                </p>
                <ul className="mt-4 space-y-2">
                  {checklist.map((item) => (
                    <li key={item} className="flex gap-2 text-sm">
                      <span className="text-leaf" aria-hidden>
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-charcoal/65">
                  Bring a photo of your space and ask what fits.
                </p>
              </div>
            )}
          </div>
        </div>
      </Reveal>
    </div>
  );
}
