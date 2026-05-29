"use client";

import { VisitListProvider } from "@/context/VisitListContext";
import { Header } from "@/components/Header";
import { VisitListDrawer } from "@/components/VisitListDrawer";
import { HeartFlyLayer } from "@/components/visit-list/HeartFlyLayer";
import type { ReactNode } from "react";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <VisitListProvider>
      <HeartFlyLayer />
      <Header />
      {children}
      <VisitListDrawer />
    </VisitListProvider>
  );
}
