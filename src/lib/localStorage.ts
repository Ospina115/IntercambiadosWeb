export function saveData(key: string, data: unknown): void {
  if (typeof window === "undefined") {
    throw new Error("LocalStorage solo está disponible en el navegador.");
  }

  window.localStorage.setItem(key, JSON.stringify(data));
}

export function getData<T>(key: string): T | null {
  if (typeof window === "undefined") {
    throw new Error("LocalStorage solo está disponible en el navegador.");
  }

  const item = window.localStorage.getItem(key);
  return item === null ? null : (JSON.parse(item) as T);
}
