import React from 'react';
import Modal from './components/Modal';
import { Time } from './components/Time';
import { WeatherProvider } from './hooks/WeatherContext';
import { Footer } from './components/Footer';

function App() {
  return (
    <WeatherProvider>
      <div className="min-h-screen flex flex-col md:flex-row bg-customDark text-white">
        <Modal />
        <Time />
      </div>
      <Footer/>
    </WeatherProvider>
  );
}

export default App;
