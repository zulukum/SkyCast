import React, { useState } from 'react';
import Hero from '../components/Hero';
import Card from '../components/Card';

function Home({ theme, language }) {
  const [activeWeather, setActiveWeather] = useState(null);
  // Yeh state handle karegi jab kisi city card par click hoga
  const [selectedCity, setSelectedCity] = useState(null);

  return (
    <div>
      <Hero 
        theme={theme} 
        language={language} 
        onWeatherUpdate={setActiveWeather} 
        forcedCity={selectedCity}
        clearForcedCity={() => setSelectedCity(null)}
      />
      <Card 
        theme={theme} 
        activeWeather={activeWeather} 
        onCitySelect={setSelectedCity} 
      />
    </div>
  );
}

export default Home;