import React from 'react';

interface EntryFormProps {
    note: string;
    setNote: (note: string) => void;
    onSubmit: () => void;
    saved: boolean;
}

export function EntryForm({ note, setNote, onSubmit, saved }: EntryFormProps) {
    return (
        <div className="mb-8 p-6 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 transition-all duration-300">
            <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="🌤️ How was your day today?"
                className="w-full p-4 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800/60 bg-gray-50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 resize-none"
                rows={5}
            />
            <button
                onClick={onSubmit}
                className="mt-4 w-full py-2.5 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition duration-200 shadow-md"
            >
                ✨ Save Entry
            </button>
            {saved && (
                <p className="mt-3 text-green-600 text-sm font-medium animate-fade-in">
                    ✅ Saved successfully!
                </p>
            )}
        </div>
    );
}
