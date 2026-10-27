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

type NotificationContextValue = {
  notify: (message: string) => void;
};

const NotificationContext = createContext<NotificationContextValue | null>(null);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState("");
  const timer = useRef<number | null>(null);

  const notify = useCallback((nextMessage: string) => {
    setMessage(nextMessage);
    if (timer.current !== null) {
      window.clearTimeout(timer.current);
    }
    timer.current = window.setTimeout(() => setMessage(""), 3200);
  }, []);

  useEffect(
    () => () => {
      if (timer.current !== null) {
        window.clearTimeout(timer.current);
      }
    },
    [],
  );

  const value = useMemo(() => ({ notify }), [notify]);

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <div
        className={`toast${message ? " show" : ""}`}
        role="status"
        aria-live="polite"
      >
        {message}
      </div>
    </NotificationContext.Provider>
  );
}

export function useToast(): NotificationContextValue {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useToast debe usarse dentro de NotificationProvider.");
  }
  return context;
}
