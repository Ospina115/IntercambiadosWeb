"use client";

import { useCallback, useSyncExternalStore, type SetStateAction } from "react";
import { useRef } from "react";
import { getData, saveData } from "@/lib/localStorage";

type PersistentStore<T> = {
  initialValue: T;
  value: T;
  hasReadStorage: boolean;
  listeners: Set<() => void>;
};

const stores = new Map<string, PersistentStore<unknown>>();

function getStore<T>(key: string, initialValue: T): PersistentStore<T> {
  const existingStore = stores.get(key);
  if (existingStore) {
    return existingStore as PersistentStore<T>;
  }

  const store: PersistentStore<T> = {
    initialValue,
    value: initialValue,
    hasReadStorage: false,
    listeners: new Set(),
  };
  stores.set(key, store);
  return store;
}

function notify<T>(store: PersistentStore<T>) {
  store.listeners.forEach((listener) => listener());
}

export function usePersistentState<T>(
  key: string,
  initialValue: T,
): [T, (value: SetStateAction<T>) => void] {
  const store = getStore(key, initialValue);
  const storeRef = useRef(store);

  const subscribe = useCallback(
    (listener: () => void) => {
      storeRef.current.listeners.add(listener);
      const storedValue = getData<T>(key);
      if (storedValue !== null) {
        storeRef.current.value = storedValue;
      }
      storeRef.current.hasReadStorage = true;

      function syncOtherTab(event: StorageEvent) {
        if (event.key !== key) {
          return;
        }

        const nextValue =
          event.newValue === null
            ? storeRef.current.initialValue
            : (JSON.parse(event.newValue) as T);
        storeRef.current.value = nextValue;
        storeRef.current.hasReadStorage = true;
        notify(storeRef.current);
      }

      window.addEventListener("storage", syncOtherTab);
      listener();
      return () => {
        storeRef.current.listeners.delete(listener);
        window.removeEventListener("storage", syncOtherTab);
      };
    },
    [key],
  );

  const getSnapshot = useCallback(() => {
    return storeRef.current.value;
  }, []);
  const getServerSnapshot = useCallback(
    () => storeRef.current.initialValue,
    [],
  );
  const value = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const updateValue = useCallback(
    (action: SetStateAction<T>) => {
      const currentStore = storeRef.current;
      const nextValue =
        typeof action === "function"
          ? (action as (previousValue: T) => T)(currentStore.value)
          : action;

      saveData(key, nextValue);
      currentStore.value = nextValue;
      currentStore.hasReadStorage = true;
      notify(currentStore);
    },
    [key],
  );

  return [value, updateValue];
}
