import React from 'react';
import { moods } from '@/lib/constants';

interface MoodSelectorProps {
    selectedMood: string;
    onSelectMood: (mood: string) => void;
}

export function MoodSelector({ selectedMood, onSelectMood }: MoodSelectorProps) {
    return (
        <div className="flex justify-around my-6">
            {moods.map((m) => (
                <button
                    key={m.label}
                    onClick={() => onSelectMood(m.label)}
                    className={`text-3xl transition-transform duration-200 ${selectedMood === m.label ? 'scale-125' : 'opacity-60'}`}
                >
                    {m.icon}
                </button>
            ))}
        </div>
    );
}