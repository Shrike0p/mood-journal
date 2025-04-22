import React from 'react';
import { Entry } from '@/app/page';
import { moodColors, moodEmojis } from '@/lib/constants';

interface EntryDetailProps {
    selectedEntry: Entry | null;
}

export function EntryDetail({ selectedEntry }: EntryDetailProps) {
    console.log("ASdsad", selectedEntry)
    return (
        <div className="bg-[#e2dbc9] dark:bg-gray-600/60 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                {selectedEntry ? 'Selected Entry' : 'Select a date from the calendar'}
            </h2>

            {selectedEntry ? (
                <div>
                    <div className="text-sm text-gray-500 mb-2">
                        {new Date(selectedEntry.date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </div>
                    <div className={`text-2xl my-2 p-2 rounded-lg inline-block ${moodColors[selectedEntry.mood] || 'bg-gray-200'}`}>
                        {moodEmojis[selectedEntry.mood] || ''}
                        <span className="ml-2 text-gray-800 dark:text-white">{selectedEntry.mood}</span>
                    </div>
                    <div className="text-gray-700 dark:text-gray-300 my-4 bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                        {selectedEntry.note}
                    </div>
                    {selectedEntry.weather && (
                        <div className="text-sm mt-4 p-2 bg-gray-100 dark:bg-gray-700 rounded-md">
                            <span className="font-medium">Weather:</span> {selectedEntry.weather.main} – {selectedEntry.weather.temp}°C in {selectedEntry.weather.city}
                        </div>
                    )}
                </div>
            ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                    No entry for this date. Select a date with color to view details.
                </p>
            )}
        </div>
    );
}
