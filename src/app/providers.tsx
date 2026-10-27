"use client";

import type { ReactNode } from "react";
import { NotificationProvider } from "@/context/NotificationContext";
import { SessionProvider } from "@/context/SessionContext";

export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <NotificationProvider>{children}</NotificationProvider>
    </SessionProvider>
  );
}
