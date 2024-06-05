import React, { useState, useEffect } from 'react';
import { GeoLoc } from './GeoLoc';

function WeatherCard({ weatherData, toggleModal }) {
    const [currentTemperature, setCurrentTemperature] = useState('');
    const [currentWeatherDescription, setCurrentWeatherDescription] = useState('');
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        const updateWeather = () => {
            if (!weatherData || !weatherData.list || weatherData.list.length === 0) {
                return;
            }

            const currentWeather = weatherData.list[0];

            if (!currentWeather.main || !currentWeather.weather || currentWeather.weather.length === 0) {
                return;
            }

            const temperature = currentWeather.main.temp;
            const weatherDescription = currentWeather.weather[0].description;
            const temperatureInCelsius = kelvinToCelsius(temperature);
            setCurrentTemperature(temperatureInCelsius.toFixed(2));
            setCurrentWeatherDescription(weatherDescription);

            // Actualizar la fecha actual
            setCurrentDate(getCurrentDate());
        };

        const kelvinToCelsius = (temp) => {
            return temp - 273.15;
        };

        const getCurrentDate = () => {
            const date = new Date();
            const options = { weekday: 'long', month: 'short', day: 'numeric' };
            return date.toLocaleDateString('en-US', options);
        };

        // Llamar a la función de actualización del clima cuando se monte el componente
        updateWeather();

        // Configurar un temporizador para que se actualice cada 3 horas
        const interval = setInterval(() => {
            updateWeather();
        }, 3 * 60 * 60 * 1000); // 3 horas en milisegundos

        // Limpiar el temporizador cuando el componente se desmonte para evitar fugas de memoria
        return () => clearInterval(interval);

    }, [weatherData]);

    return (
        <div className="absolute top-0 left-0 h-full w-full md:max-w-[390px] mx-auto bg-[#1E213A] p-6 transition-transform duration-300 ease-in-out transform translate-x-0">
            {/* Search Button */}
            <div className="flex justify-between items-center mb-10">
                <button 
                    className="py-2 px-4 bg-[#6E707A] text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    onClick={toggleModal}
                >
                    Search for places
                </button>
                <GeoLoc />
            </div> 

            <div className="w-full h-2/6 relative">
                <figure className="w-full h-full opacity-20">
                    <img src="/public/Cloud-background.png" alt="Cloud Background" className="w-full h-full object-cover" />
                </figure>
                <figure className="w-28 absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-50">
                    <img src={`/public/${weatherData && weatherData.list && weatherData.list.length > 0 && weatherData.list[0].weather[0].icon}.png`} alt="" />
                </figure>
            </div> 

            <div className="text-center mb-12">
                <div className="text-[144px] font-light leading-none">
                    {currentTemperature}<span className="text-5xl font-normal text-[#A09FB1] ml-2"  style={{ fontSize: '2rem', lineHeight: '1' }}>°C</span>
                </div>
                <div className="text-[#A09FB1] text-4xl mt-6">{currentWeatherDescription}</div>
            </div> 

            <div className="text-[#88869D] text-center">
                <div className="mb-4">{currentDate}</div>
                <div className="flex items-center justify-center">
                    <span className="material-icons mr-2">location_on</span>
                    {weatherData && weatherData.city && weatherData.city.name || 'Select a location'}
                </div>
            </div>
        </div>
    );
}

export default WeatherCard;