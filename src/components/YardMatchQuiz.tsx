"use client";

import { business } from "@/data/business";
import { useVisitList } from "@/context/VisitListContext";
import { ItemPicker } from "@/components/ui/ItemPicker";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

type Answers = Record<number, string>;

const questions = [
  {
    id: 1,
    text: "What are you working on?",
    options: [
      "Front yard refresh",
      "Backyard planting",
      "Flower bed",
      "Privacy screen",
      "Patio plants",
      "Replacing plants after a freeze",
    ],
  },
  {
    id: 2,
    text: "What do you need?",
    options: ["Trees", "Shrubs", "Flowers", "Ground cover", "Vines", "Not sure"],
  },
  {
    id: 3,
    text: "How much sun does the area get?",
    options: ["Full sun", "Part sun", "Mostly shade", "I am not sure"],
  },
  {
    id: 4,
    text: "What matters most?",
    options: [
      "Low maintenance",
      "Good price",
      "Hard to find variety",
      "Fast curb appeal",
      "Staff recommendation",
    ],
  },
  {
    id: 5,
    text: "Do you want help choosing?",
    options: [
      "Yes, I can bring a photo",
      "Yes, I need staff advice",
      "I know what I need",
      "I want to call first",
    ],
  },
];

function buildResult(answers: Answers) {
  const project = answers[1] ?? "your project";
  const need = answers[2] ?? "plants";
  const sun = answers[3] ?? "your sun conditions";
  const priority = answers[4] ?? "what fits";
  const help = answers[5] ?? "";

  const categories: string[] = [];
  const list: string[] = [];

  if (need === "Trees" || project.includes("Privacy")) {
    categories.push("Trees");
    list.push("Small Trees", "Crape Myrtle Trees");
  }
  if (need === "Shrubs" || project.includes("Privacy") || project.includes("freeze")) {
    categories.push("Shrubs");
    list.push("Shrubs", "Texas Sage Shrubs");
  }
  if (need === "Flowers" || project.includes("Flower") || project.includes("refresh")) {
    categories.push("Flower Flats");
    list.push("Flower Flats", "Flat of Violas");
  }
  if (need === "Ground cover" || sun.includes("shade")) {
    categories.push("Ground Cover");
    list.push("Ground Cover");
  }
  if (need === "Vines") {
    categories.push("Vines");
    list.push("Tangerine Crossvine");
  }
  if (priority === "Hard to find variety") {
    categories.push("Yucca & Agave");
    list.push("Soft Leaf Yucca", "Abelia");
  }
  if (priority === "Good price") {
    list.push("Flower Flats");
  }
  if (sun.includes("Full sun")) {
    list.push("Texas Sage Shrubs", "Red Yuccas");
  }

  list.push("Soil Bags");
  if (help.includes("photo") || help.includes("staff")) {
    list.push("Staff recommendation", "Landscape Project Plants");
  }
  if (help.includes("call")) {
    list.push("Call before visit");
  }

  const uniqueCats = [...new Set(categories.length ? categories : ["Shrubs", "North Texas Favorites"])];
  const uniqueList = [...new Set(list.length ? list : ["Shrubs", "Flower Flats", "Soil Bags", "Staff recommendation"])];

  let note = `Good fit for ${project.toLowerCase()}.`;
  if (sun !== "I am not sure") {
    note += ` Plan for ${sun.toLowerCase()}.`;
  }
  if (priority === "Staff recommendation" || help.includes("staff")) {
    note += " Ask staff what fits your space.";
  }

  return {
    projectLabel: project,
    categories: uniqueCats,
    list: uniqueList,
    note,
  };
}

export function YardMatchQuiz({
  panelRef,
}: {
  panelRef?: RefObject<HTMLDivElement | null>;
}) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [done, setDone] = useState(false);
  const { openDrawer } = useVisitList();
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (advanceTimer.current) clearTimeout(advanceTimer.current);
    };
  }, []);

  const safeStep = Math.min(step, questions.length - 1);
  const current = questions[safeStep];
  const progress = done
    ? 100
    : ((safeStep + (current && answers[current.id] ? 1 : 0)) / questions.length) *
      100;

  const select = (option: string) => {
    if (!current || done) return;
    const next = { ...answers, [current.id]: option };
    setAnswers(next);
    if (advanceTimer.current) clearTimeout(advanceTimer.current);

    if (safeStep < questions.length - 1) {
      advanceTimer.current = setTimeout(() => {
        setStep((s) => Math.min(s + 1, questions.length - 1));
      }, 200);
    } else {
      setDone(true);
    }
  };

  const restart = () => {
    setStep(0);
    setAnswers({});
    setDone(false);
  };

  const result = done ? buildResult(answers) : null;

  const quizPickItems = useMemo(
    () =>
      result?.list.map((name, i) => ({
        id: `quiz-${i}`,
        name,
        note: "Suggested from your quiz answers",
      })) ?? [],
    [result?.list]
  );

  return (
    <div className="w-full min-w-0" aria-labelledby="quiz-heading">
      <Reveal>
        <SectionHeading
          id="quiz-heading"
          title="Find plants for your space"
          subtitle="Answer a few questions and get a starter list."
        />
      </Reveal>

      <div
        ref={panelRef}
        className="mt-6 rounded-2xl border border-brown/20 bg-cream p-5 shadow-card md:p-6"
      >
        <div className="mb-4">
          <div className="h-2 overflow-hidden rounded-full bg-tan">
            <div
              className="h-full rounded-full bg-olive transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
              role="progressbar"
              aria-valuenow={Math.round(progress)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Quiz progress"
            />
          </div>
        </div>

        {!done && current && (
          <div>
            <p className="text-sm text-charcoal/60">
              Question {safeStep + 1} of {questions.length}
            </p>
            <h3 className="mt-2 font-display text-xl font-semibold">{current.text}</h3>
            <ul
              className="mt-6 space-y-2"
              role="listbox"
              aria-label={current.text}
            >
                {current.options.map((opt) => {
                  const selected = answers[current.id] === opt;
                  return (
                    <li key={opt}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={selected}
                        onClick={() => select(opt)}
                        className={`w-full rounded-xl border px-4 py-3 text-left text-sm font-medium transition ${
                          selected
                            ? "quiz-selected"
                            : "border-brown/20 bg-tan/40 hover:border-clay"
                        }`}
                      >
                        {opt}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

        {done && result && (
          <div className="animation-slide-up">
              <p className="font-display text-xl font-semibold text-olive">
                Good fit for {result.projectLabel.toLowerCase()}.
              </p>
              <p className="mt-2 text-sm text-charcoal/75">{result.note}</p>

              <div className="mt-6">
                <p className="text-sm font-medium text-charcoal">Recommended categories</p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {result.categories.map((c) => (
                    <li
                      key={c}
                      className="rounded-full bg-leaf/15 px-3 py-1 text-xs font-medium text-olive-dark"
                    >
                      {c}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <ItemPicker
                  items={quizPickItems}
                  title="Pick items for your visit"
                  hint="Select what you want. We will not add the whole list at once."
                />
              </div>

              <p className="mt-4 text-sm text-charcoal/70">
                Looking for something specific? Call before you come.
              </p>

              <div className="mt-4 flex flex-col gap-2.5">
                <MagneticButton
                  type="button"
                  variant="ghost"
                  className="flex-1"
                  onClick={openDrawer}
                >
                  View Visit List
                </MagneticButton>
                <MagneticButton
                  href={business.phoneTel}
                  variant="secondary"
                  className="flex-1"
                >
                  Call Store
                </MagneticButton>
                <MagneticButton
                  type="button"
                  variant="ghost"
                  className="flex-1"
                  onClick={restart}
                >
                  Restart
                </MagneticButton>
              </div>
            </div>
          )}
      </div>
    </div>
  );
}
