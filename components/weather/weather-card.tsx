import React from 'react';
import { Weather } from '@/app/page';
import { weatherIcons } from '@/lib/constants';

interface WeatherCardProps {
    weather: Weather | null;
}

export function WeatherCard({ weather }: WeatherCardProps) {
    if (!weather) return <p className="text-center text-gray-500">Loading weather...</p>;

    return (
        <div className="bg-[#e2dbc9] dark:bg-gray-800/40  shadow-md rounded-xl p-4 mb-6 text-center">
            <div className="text-2xl">{weatherIcons[weather.main] || '🌈'} {weather.main}</div>
            <p className="text-gray-700 dark:text-gray-300">{weather.temp}°C</p>
            <p className="text-sm text-gray-500">{weather.city}</p>
        </div>
    );
}