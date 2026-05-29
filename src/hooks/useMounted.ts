"use client";

import { useEffect, useState } from "react";

/** True only after client mount — avoids hydration mismatches for time/local state. */
export function useMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}
