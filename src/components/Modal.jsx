import React, { useContext, useState } from 'react';
import WeatherCard from './WeatherCard';
import SearchModal from './SearchModal';
import { WeatherContext } from '../hooks/WeatherContext';

function Modal() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [location, setLocation] = useState('');
    const { weatherData } = useContext(WeatherContext);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div className="relative h-screen sm:w-full md:w-96 bg-[#100E1D] text-white">
            <WeatherCard weatherData={weatherData} toggleModal={toggleModal} />
            <SearchModal 
                isModalOpen={isModalOpen}
                toggleModal={toggleModal}
                location={location}
                setLocation={setLocation}
            />
        </div>
    );
}

export default Modal;