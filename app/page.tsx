"use client"
import { useEffect, useState } from 'react';
import { getWeatherByCoords } from '@/lib/weater';
import { saveEntryToLocalStorage, getEntriesFromLocalStorage } from '@/lib/storage';
import { TabNavigation } from '@/components/weather/tab-navigation';
import { WeatherCard } from '@/components/weather/weather-card';
import { MoodSelector } from '@/components/weather/model-selector';
import { EntryForm } from '@/components/weather/entry-form';
import { MoodCalendar } from '@/components/weather/mood-calendar';
import { EntryDetail } from '@/components/weather/entry-detail';
import { EntryGrid } from '@/components/weather/entry-grid';
import { motion } from 'framer-motion';
import CanvasBackground from '@/components/weather/canvas-background';
import ThemeToggle from '@/components/weather/theme-provider';

export interface Weather {
  main: string;
  temp: number;
  city: string;
}

export interface Location {
  lat: number | null;
  lon: number | null;
}

export interface Entry {
  date: string;
  mood: string;
  note: string;
  weather: Weather | null;
}

export default function Home() {
  const [mood, setMood] = useState('');
  const [note, setNote] = useState('');
  const [date] = useState(new Date().toISOString().slice(0, 10));
  const [weather, setWeather] = useState<Weather | null>(null);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [location, setLocation] = useState<Location>({ lat: null, lon: null });
  const [saved, setSaved] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);
  const [view, setView] = useState<'new' | 'history'>('new');
  const [isManualSelect, setIsManualSelect] = useState(false);


  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lon: longitude });
      });
    }
  }, []);

  useEffect(() => {
    if (location.lat && location.lon) {
      getWeatherByCoords(location.lat, location.lon).then((data) => setWeather(data));
    }
  }, [location]);

  useEffect(() => {
    const loadedEntries = getEntriesFromLocalStorage();
    setEntries(loadedEntries);
  }, [saved]);

  useEffect(() => {
    if (!selectedDate) return;

    const formattedDate = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;

    if (selectedEntry && selectedEntry.date === formattedDate) return;

    const entry = entries.find(e => e.date === formattedDate);
    setSelectedEntry(entry || null);
  }, [selectedDate, entries, selectedEntry]);



  useEffect(() => {
    if (isManualSelect) {
      setTimeout(() => setIsManualSelect(false), 0);
    }
  }, [isManualSelect]);


  const handleSubmit = () => {
    if (note.trim() === '' || mood === '') {

      return;
    }
    const entry: Entry = { date, mood, note, weather };
    saveEntryToLocalStorage(entry);
    setSaved(true);
    setMood('');
    setNote('');
    setTimeout(() => setSaved(false), 1500);
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  const handleEntrySelect = (entry: Entry) => {
    setIsManualSelect(true);
    setSelectedDate(new Date(entry.date));
    setSelectedEntry(entry);
  };
  return (
    <main className="relative min-h-screen flex items-center justify-center">
      <CanvasBackground />
      <motion.div
        className="relative z-10 max-w-4xl w-full mx-auto p-6  dark:bg-gray-900/60 backdrop-blur-md rounded-2xl shadow-xl pointer-events-none"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className='pointer-events-auto'>
          <TabNavigation activeView={view} onViewChange={setView} />
        </div>

        {view === 'new' ? (
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-center text-lg mb-4 text-gray-700 dark:text-gray-300">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
            <WeatherCard weather={weather} />
            <div className='pointer-events-auto'>
              <MoodSelector selectedMood={mood} onSelectMood={setMood} />
              <EntryForm note={note} setNote={setNote} onSubmit={handleSubmit} saved={saved} />
            </div>
          </motion.div>
        ) : (
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className='pointer-events-auto'>
                <MoodCalendar entries={entries} selectedDate={selectedDate} onDateSelect={handleDateSelect} />
              </div>
              <EntryDetail selectedEntry={selectedEntry} />
            </div>
            <div className='pointer-events-auto'>
              <EntryGrid entries={entries} selectedEntry={selectedEntry} onEntrySelect={handleEntrySelect} />
            </div>
          </motion.div>
        )}
      </motion.div>
      <div className='absolute bottom-1/15 right-10 bg-[#e2dbc9] dark:bg-gray-600/60 p-2 rounded-full z-50'>
        <ThemeToggle />
      </div>
    </main>

  );
}