// Define the interfaces for our data types
interface Weather {
  main: string;
  temp: number;
  city: string;
}

interface Entry {
  date: string;
  mood: string;
  note: string;
  weather: Weather | null;
}

const STORAGE_KEY = "mood_journal_entries";

export function saveEntryToLocalStorage(entry: Entry): void {
  const existing = getEntriesFromLocalStorage();
  const updated = [...existing, entry];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function getEntriesFromLocalStorage(): Entry[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}
