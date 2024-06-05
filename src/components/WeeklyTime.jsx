import React, { useContext, useState } from 'react';
import { WeatherContext } from '../hooks/WeatherContext';

export const WeeklyTime = () => {
    const { weatherData, loading, error } = useContext(WeatherContext);
    const [unit, setUnit] = useState('C'); // Estado para manejar unidades

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    /* Para obtener pronóstico diario */
    const dailyForecasts = weatherData.list.filter(forecast => forecast.dt_txt.includes("12:00:00"));

    const convertTemperature = (temp) => {
        return unit === 'C' ? Math.round(temp - 273.15) : Math.round((temp - 273.15) * 9/5 + 32);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 w-full">
            <div className="flex justify-end items-center space-x-4 mb-4 md:col-span-5">
                <button
                    className={`bg-white text-black p-2 rounded-full ${unit === 'C' ? 'bg-blue-500' : 'bg-white'}`}
                    onClick={() => setUnit('C')}
                >°C</button>
                <button
                    className={`bg-gray-700 text-white p-2 rounded-full ${unit === 'F' ? 'bg-blue-500' : 'bg-gray-700'}`}
                    onClick={() => setUnit('F')}
                >°F</button>
            </div>
            {dailyForecasts.slice(0, 5).map((forecast, index) => (
                <div key={index} className="bg-customSecondaryDark p-3 rounded-lg text-center w-full  h-44 font-raleway">
                    <p className="text-xs mb-1">{new Date(forecast.dt * 1000).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</p>
                    <img src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`} alt="weather icon" className="mx-auto mb-2 w-10 h-10" />
                    <p className="text-xs">
                        <span className="font-semibold">{convertTemperature(forecast.main.temp_max)}°{unit}</span> {convertTemperature(forecast.main.temp_min)}°{unit}
                    </p>
                </div>
            ))}
        </div>
    );
};