import { useContext } from 'react';
import { WeatherContext } from './WeatherContext';

const useWeather = () => {
    const context = useContext(WeatherContext);
    if (!context) {
        throw new Error('useWeather must be used within a WeatherProvider');
    }
    return context;
};

export default useWeather;

/*Hook personalizado para consumir el contexto del clima.*/