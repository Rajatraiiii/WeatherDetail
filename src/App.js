import React, { useState } from "react";
import "./App.css";
import WeatherCard from "./components/WeatherCard";
import { fetchWeatherByCity, fetchWeatherByCoords } from "./utils/weatherApi";

const API_KEY = "fb40147c72c50ad5ddc7439d6c55f30f";

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e?.preventDefault();
    if (!query) return setError("Enter a city name.");
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeatherByCity(query, API_KEY);
      setWeather(data);
    } catch (err) {
      setError(err.message || "Failed to fetch weather.");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleUseLocation = () => {
    if (!navigator.geolocation) return setError("Geolocation not supported.");
    setLoading(true);
    setError(null);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const data = await fetchWeatherByCoords(latitude, longitude, API_KEY);
          setWeather(data);
        } catch (err) {
          setError(err.message || "Failed to fetch weather for location.");
          setWeather(null);
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError("Permission denied or location unavailable.");
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Weather APP</h1>

        <form className="search" onSubmit={handleSearch}>
          <input
            aria-label="city"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter city name (e.g., London)"
          />
          <button type="submit" disabled={loading}>
            Search
          </button>
          <button type="button" onClick={handleUseLocation} disabled={loading}>
            Use My Location
          </button>
        </form>

        {error && <div className="error">{error}</div>}
      </header>

      <main className="content">
        {loading && <div className="loading">Loading…</div>}
        {!loading && weather && <WeatherCard data={weather} />}
        {!loading && !weather && !error && (
          <div className="hint">
            Search for a city or use your location to get weather info.
          </div>
        )}
      </main>

      <footer className="footer">
        <small>Powered by OpenWeatherMap</small>
      </footer>
    </div>
  );
}

export default App;
