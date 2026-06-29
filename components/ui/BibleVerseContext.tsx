"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export interface BibleVerseProps {
  verse?: string;
  reference: string;
  bibleUrl?: string;
}

interface ContextValue {
  open: (props: BibleVerseProps) => void;
  close: () => void;
  current: (BibleVerseProps & { isOpen: true }) | { isOpen: false };
}

const BibleVerseContext = createContext<ContextValue>({
  open: () => {},
  close: () => {},
  current: { isOpen: false },
});

export function BibleVerseProvider({ children }: { children: ReactNode }) {
  const [current, setCurrent] = useState<ContextValue["current"]>({ isOpen: false });

  const open = useCallback((props: BibleVerseProps) => {
    setCurrent({ ...props, isOpen: true });
  }, []);

  const close = useCallback(() => {
    setCurrent({ isOpen: false });
  }, []);

  return (
    <BibleVerseContext.Provider value={{ open, close, current }}>
      {children}
    </BibleVerseContext.Provider>
  );
}

export function useBibleVerse() {
  return useContext(BibleVerseContext);
}
