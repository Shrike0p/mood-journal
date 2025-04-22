import React from 'react';
import { Entry } from '@/app/page';
import { moodColors, moodEmojis } from '@/lib/constants';

interface EntryGridProps {
    entries: Entry[];
    selectedEntry: Entry | null;
    onEntrySelect: (entry: Entry) => void;
}

export function EntryGrid({ entries, selectedEntry, onEntrySelect }: EntryGridProps) {
    return (
        <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">All Entries</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {entries.map((entry, idx) => (
                    <div
                        key={idx}
                        className={`p-4 rounded-lg shadow-md cursor-pointer transition-all ${selectedEntry?.date === entry.date ?
                                'border-2 border-indigo-500' : ''
                            } ${moodColors[entry.mood] ? `${moodColors[entry.mood]} bg-opacity-50` : 'bg-white dark:bg-gray-800'}`}
                        onClick={() => onEntrySelect(entry)}
                    >
                        <div className="text-sm text-gray-700 dark:text-gray-300">{new Date(entry.date).toLocaleDateString()}</div>
                        <div className="text-2xl my-1">
                            {moodEmojis[entry.mood] || ''}
                            <span className="ml-2 text-lg font-medium text-gray-800 dark:text-gray-200">{entry.mood}</span>
                        </div>
                        <div className="text-gray-700 dark:text-gray-300 mb-2 line-clamp-2">{entry.note}</div>
                        {entry.weather && (
                            <div className="text-xs text-gray-700 dark:text-gray-300">
                                {entry.weather.main} – {entry.weather.temp}°C
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}