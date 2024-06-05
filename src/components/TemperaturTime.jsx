import React, { useContext } from 'react';
import { WeatherContext } from '../hooks/WeatherContext';

export const TemperaturTime = () => {
    const { weatherData, loading, error } = useContext(WeatherContext);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const currentWeather = weatherData.list[0];

    return (
        <div className="flex flex-col w-full">
           <h2 className="text-2xl font-medium mb-8 w-auto text-left">Today's Highlights</h2> 

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                <div className="bg-customSecondaryDark p-6 rounded-md text-center">
                    <p className="text-lg mb-2 font-raleway">Wind status</p>
                    <p className="text-4xl font-bold mb-2">{currentWeather.wind.speed}<span className="text-2xl font-normal"> mph</span></p>
                    <p className="flex items-center justify-center mt-4">
                        <span className="material-icons mr-1">navigation</span>
                        {currentWeather.wind.deg}°
                    </p>
                </div>

                <div className="bg-customSecondaryDark p-6 rounded-md text-center">
                    <p className="text-lg mb-2 font-raleway">Humidity</p>
                    <p className="text-4xl font-bold mb-2">{currentWeather.main.humidity}<span className="text-2xl font-normal">%</span></p>
                    <div className="flex flex-col items-center mt-4">
                        <div className="flex justify-between w-full mb-2">
                            <span>0</span>
                            <span>50</span>
                            <span>100</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                            <div className="bg-customYell h-2 rounded-full" style={{ width: `${currentWeather.main.humidity}%` }}></div>
                        </div>
                        <span className="self-end mt-1">%</span>
                    </div>
                </div>

                <div className="bg-customSecondaryDark p-6 rounded-md text-center">
                    <p className="text-lg mb-2 font-raleway">Visibility</p>
                    <p className="text-4xl font-bold font-raleway mb-2">{(currentWeather.visibility / 1609.344).toFixed(1)}<span className="text-2xl font-normal"> miles</span></p>
                </div>

                <div className="bg-customSecondaryDark p-6 rounded-md text-center">
                    <p className="text-lg mb-2 font-raleway">Air Pressure</p>
                    <p className="text-4xl font-bold font-raleway mb-2">{currentWeather.main.pressure}<span className="text-2xl font-normal"> mb</span></p>
                </div>
            </div>

          
        </div>
    );
}