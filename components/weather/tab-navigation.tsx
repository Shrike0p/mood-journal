import React from 'react';

interface TabNavigationProps {
    activeView: 'new' | 'history';
    onViewChange: (view: 'new' | 'history') => void;
}

export function TabNavigation({ activeView, onViewChange }: TabNavigationProps) {
    return (
        <div className="flex mb-6 gap-4">
            <button
                onClick={() => onViewChange('new')}
                className={`flex-1 py-2 rounded-md ${activeView === 'new' ? 'bg-indigo-600 text-white' : 'bg-[#e2dbc9] dark:bg-gray-600/60 text-gray-800 dark:text-white'}`}
            >
                New Entry
            </button>
            <button
                onClick={() => onViewChange('history')}
                className={`flex-1 py-2 rounded-md ${activeView === 'history' ? 'bg-indigo-600 text-white' : 'bg-[#e2dbc9] dark:bg-gray-600/60 text-gray-800 dark:text-white'}`}
            >
                History & Calendar
            </button>
        </div>
    );
}