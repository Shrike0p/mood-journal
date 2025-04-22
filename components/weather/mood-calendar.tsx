import React from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Entry } from '@/app/page';
import { moodColors } from '@/lib/constants';

interface MoodCalendarProps {
  entries: Entry[];
  selectedDate: Date | undefined;
  onDateSelect: (date: Date | undefined) => void;
}

export function MoodCalendar({ selectedDate, onDateSelect }: MoodCalendarProps) {

  return (
    <div className="bg-[#e2dbc9] dark:bg-gray-600/60 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Your Mood Calendar</h2>

      {/* Mood legend */}
      <div className="flex flex-wrap gap-3 mb-4">
        {Object.entries(moodColors).map(([mood, color]) => (
          <div key={mood} className="flex items-center gap-1">
            <div className={`h-4 w-4 rounded-full ${color}`}></div>
            <span className="text-sm text-gray-600 dark:text-gray-300">{mood}</span>
          </div>
        ))}
      </div>

      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={onDateSelect}
        className="rounded-md border flex justify-center items-center flex-col"
      />
    </div>
  );
}