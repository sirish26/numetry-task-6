import React, { useState } from 'react';
import './App.css'; 

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => setCity(e.target.value);

  const fetchWeatherData = async () => {
    try {
      const apiKey = 'a1839361cd9e7edda3c2075fe61993f5';
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
      if (!response.ok) {
        throw new Error('Failed to fetch weather data.');
      }
      const data = await response.json();
      setWeatherData(data);
      setError(null);
    } catch (error) {
      console.error(error);
      setError('Failed to fetch weather data.');
    }
  };
  const getCurrentDayTime = () => {
    const currentDate = new Date();
    const options = { weekday: 'long', hour: 'numeric', minute: 'numeric', hour12: true };
    return currentDate.toLocaleString('en-US', options);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
    setCity('');
  };

  const convertWindSpeed = (speed) => {
    return Math.round(speed * 3.6);
  };

  return (
    <div className="container">
      <div className="card"> 
        <div className="card-body">
          <h2 className="card-title"><center>Weather App</center></h2>
          <form onSubmit={handleSubmit}>
            <input className="input" type="text" name="city" onChange={handleChange} value={city} /><br /><br />
            <button className="btn" type="submit">Get Weather</button> 
          </form><br /><br />
          {weatherData && (
            <div>
              <h1>{weatherData.name}, {weatherData.sys.country}</h1>
              <p>{getCurrentDayTime()}</p>
              <p><b>Temperature: {Math.round(weatherData.main.temp - 273.15)}°C</b></p>
              <p><b>Humidity: {weatherData.main.humidity}%</b></p>
              <p><b>Wind: {convertWindSpeed(weatherData.wind.speed)} km/h</b></p>
              <p><b>Description: {weatherData.weather[0].description}</b></p>
            </div>
          )}
          {error && <p>{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default App;
