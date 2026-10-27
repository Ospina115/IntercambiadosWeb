"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import { getUsers } from "@/services/users";
import { usePersistentState } from "@/hooks/usePersistentState";
import { storageKeys } from "@/lib/storageKeys";
import type { User } from "@/types/user";

type SessionContextValue = {
  currentUser: User;
  setCurrentUser: (user: User) => void;
  getProfileImage: (userId?: string) => string;
  setProfileImage: (image: string | null) => void;
};

const SessionContext = createContext<SessionContextValue | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [activeUserId, setActiveUserId] = usePersistentState(
    storageKeys.activeUser,
    "user-1",
  );
  const [profileImages, setProfileImages] = usePersistentState<
    Record<string, string>
  >(storageKeys.profileImages, {});
  const users = getUsers();
  const currentUser = users.find((user) => user.id === activeUserId) ?? users[0];

  const setCurrentUser = useCallback(
    (user: User) => {
      if (!users.some((candidate) => candidate.id === user.id)) {
        throw new Error("El usuario seleccionado no existe.");
      }
      setActiveUserId(user.id);
    },
    [setActiveUserId, users],
  );

  const getProfileImage = useCallback(
    (userId = currentUser.id) =>
      profileImages[userId] ??
      users.find((user) => user.id === userId)?.avatar ??
      users[0].avatar,
    [currentUser.id, profileImages, users],
  );

  const setProfileImage = useCallback(
    (image: string | null) => {
      setProfileImages((current) => {
        const next = { ...current };
        if (image === null) {
          delete next[currentUser.id];
        } else {
          next[currentUser.id] = image;
        }
        return next;
      });
    },
    [currentUser.id, setProfileImages],
  );

  const value = useMemo(
    () => ({ currentUser, setCurrentUser, getProfileImage, setProfileImage }),
    [currentUser, setCurrentUser, getProfileImage, setProfileImage],
  );

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession(): SessionContextValue {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession debe usarse dentro de SessionProvider.");
  }
  return context;
}
