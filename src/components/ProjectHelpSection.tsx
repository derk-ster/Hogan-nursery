"use client";

import { useEffect, useRef, useState } from "react";
import { PhotoHelper } from "./PhotoHelper";
import { YardMatchQuiz } from "./YardMatchQuiz";

export function ProjectHelpSection() {
  const quizPanelRef = useRef<HTMLDivElement>(null);
  const [panelHeight, setPanelHeight] = useState<number>();
  const [isWide, setIsWide] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const updateWide = () => setIsWide(mq.matches);
    updateWide();
    mq.addEventListener("change", updateWide);
    return () => mq.removeEventListener("change", updateWide);
  }, []);

  useEffect(() => {
    const panel = quizPanelRef.current;
    if (!panel || !isWide) {
      setPanelHeight(undefined);
      return;
    }

    const syncHeight = () => {
      setPanelHeight(panel.getBoundingClientRect().height);
    };

    syncHeight();
    const observer = new ResizeObserver(syncHeight);
    observer.observe(panel);
    window.addEventListener("resize", syncHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", syncHeight);
    };
  }, [isWide]);

  return (
    <section
      id="project-help"
      className="scroll-mt-[4.5rem] border-t border-brown/10 bg-sand py-10 md:py-12"
      aria-label="Project planning tools"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
          <div
            id="yard-quiz"
            className="min-w-0 scroll-mt-[4.5rem]"
          >
            <YardMatchQuiz panelRef={quizPanelRef} />
          </div>
          <div className="min-w-0">
            <PhotoHelper panelHeight={isWide ? panelHeight : undefined} />
          </div>
        </div>
      </div>
    </section>
  );
}
