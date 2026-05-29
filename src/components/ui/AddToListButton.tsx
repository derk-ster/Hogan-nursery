"use client";

import { useRef } from "react";
import { useVisitList } from "@/context/VisitListContext";
import { MagneticButton } from "./MagneticButton";

interface AddToListButtonProps {
  itemName: string;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
  label?: string;
  addedLabel?: string;
  fullWidth?: boolean;
}

export function AddToListButton({
  itemName,
  className = "",
  variant = "primary",
  label = "Add to List",
  addedLabel = "On list",
  fullWidth,
}: AddToListButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const { addToList, hasItem } = useVisitList();
  const onList = hasItem(itemName);

  return (
    <MagneticButton
      ref={btnRef}
      type="button"
      variant={onList ? "ghost" : variant}
      disabled={onList}
      className={`${fullWidth !== false ? "w-full" : ""} ${onList ? "opacity-80" : ""} px-4 ${className}`}
      onClick={() => {
        if (!onList && btnRef.current) {
          addToList(itemName, btnRef.current);
        }
      }}
    >
      {onList ? (
        <span className="flex items-center justify-center gap-1.5">
          <span className="text-leaf" aria-hidden>
            ✓
          </span>
          {addedLabel}
        </span>
      ) : (
        label
      )}
    </MagneticButton>
  );
}
