"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "hogan-visit-list";

export interface HeartFlight {
  id: string;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  stage: "pause" | "fly";
}

export interface VisitListContextValue {
  items: string[];
  count: number;
  isOpen: boolean;
  mounted: boolean;
  listPulsing: boolean;
  hearts: HeartFlight[];
  registerListTarget: (node: HTMLButtonElement | null) => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  addToList: (name: string, source?: HTMLElement | null) => boolean;
  addManyToList: (names: string[], source?: HTMLElement | null) => void;
  removeFromList: (name: string) => void;
  clearList: () => void;
  hasItem: (name: string) => boolean;
  /** @deprecated use addToList */
  addItem: (name: string) => void;
  /** @deprecated use addManyToList */
  addItems: (names: string[]) => void;
  /** @deprecated use removeFromList */
  removeItem: (name: string) => void;
}

const VisitListContext = createContext<VisitListContextValue | null>(null);

function getCenter(el: HTMLElement) {
  const r = el.getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
}

export function VisitListProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [hearts, setHearts] = useState<HeartFlight[]>([]);
  const [listPulsing, setListPulsing] = useState(false);
  const listTargetRef = useRef<HTMLButtonElement | null>(null);
  const heartTimers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as unknown;
        if (Array.isArray(parsed)) {
          setItems(
            parsed.filter((item): item is string => typeof item === "string")
          );
        }
      }
    } catch {
      /* ignore */
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items, mounted]);

  useEffect(() => {
    const timers = heartTimers.current;
    return () => {
      timers.forEach(clearTimeout);
    };
  }, []);

  const registerListTarget = useCallback((node: HTMLButtonElement | null) => {
    listTargetRef.current = node;
  }, []);

  const pulseList = useCallback(() => {
    setListPulsing(true);
    const t = setTimeout(() => setListPulsing(false), 450);
    heartTimers.current.push(t);
  }, []);

  const spawnHeart = useCallback(
    (fromX: number, fromY: number) => {
      const target = listTargetRef.current;
      if (!target) return;

      const reduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduced) {
        pulseList();
        return;
      }

      const { x: toX, y: toY } = getCenter(target);
      const id =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `heart-${Date.now()}-${Math.random()}`;

      setHearts((prev) => [
        ...prev,
        { id, fromX, fromY, toX, toY, stage: "pause" },
      ]);

      const flyTimer = setTimeout(() => {
        setHearts((prev) =>
          prev.map((h) => (h.id === id ? { ...h, stage: "fly" as const } : h))
        );

        const removeTimer = setTimeout(() => {
          setHearts((prev) => prev.filter((h) => h.id !== id));
          pulseList();
        }, 620);

        heartTimers.current.push(removeTimer);
      }, 500);

      heartTimers.current.push(flyTimer);
    },
    [pulseList]
  );

  const addToList = useCallback(
    (name: string, source?: HTMLElement | null): boolean => {
      const trimmed = name.trim();
      if (!trimmed) return false;

      let added = false;
      setItems((prev) => {
        if (prev.includes(trimmed)) return prev;
        added = true;
        return [...prev, trimmed];
      });

      if (added && source) {
        const { x, y } = getCenter(source);
        spawnHeart(x, y);
      } else if (added) {
        pulseList();
      }

      return added;
    },
    [spawnHeart, pulseList]
  );

  const addManyToList = useCallback(
    (names: string[], source?: HTMLElement | null) => {
      const unique = [...new Set(names.map((n) => n.trim()).filter(Boolean))];

      setItems((prev) => {
        const toAdd = unique.filter((n) => !prev.includes(n));
        if (toAdd.length === 0) return prev;

        if (source) {
          const { x, y } = getCenter(source);
          toAdd.forEach((_, i) => {
            const t = setTimeout(() => spawnHeart(x, y), i * 140);
            heartTimers.current.push(t);
          });
        } else {
          pulseList();
        }

        const next = [...prev];
        for (const name of toAdd) {
          if (!next.includes(name)) next.push(name);
        }
        return next;
      });
    },
    [spawnHeart, pulseList]
  );

  const removeFromList = useCallback((name: string) => {
    setItems((prev) => prev.filter((i) => i !== name));
  }, []);

  const clearList = useCallback(() => setItems([]), []);

  const hasItem = useCallback(
    (name: string) => items.includes(name.trim()),
    [items]
  );

  const addItem = useCallback(
    (name: string) => {
      addToList(name, null);
    },
    [addToList]
  );

  const addItems = useCallback(
    (names: string[]) => addManyToList(names, null),
    [addManyToList]
  );

  const removeItem = removeFromList;

  const openDrawer = useCallback(() => setIsOpen(true), []);
  const closeDrawer = useCallback(() => setIsOpen(false), []);
  const toggleDrawer = useCallback(() => setIsOpen((o) => !o), []);

  const value = useMemo<VisitListContextValue>(
    () => ({
      items,
      count: items.length,
      isOpen,
      mounted,
      listPulsing,
      hearts,
      registerListTarget,
      openDrawer,
      closeDrawer,
      toggleDrawer,
      addToList,
      addManyToList,
      removeFromList,
      clearList,
      hasItem,
      addItem,
      addItems,
      removeItem,
    }),
    [
      items,
      isOpen,
      mounted,
      listPulsing,
      hearts,
      registerListTarget,
      openDrawer,
      closeDrawer,
      toggleDrawer,
      addToList,
      addManyToList,
      removeFromList,
      clearList,
      hasItem,
      addItem,
      addItems,
      removeItem,
    ]
  );

  return (
    <VisitListContext.Provider value={value}>
      {children}
    </VisitListContext.Provider>
  );
}

export function useVisitList() {
  const ctx = useContext(VisitListContext);
  if (!ctx) {
    throw new Error("useVisitList must be used within VisitListProvider");
  }
  return ctx;
}
