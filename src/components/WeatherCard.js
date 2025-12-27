
import React from "react";
import "../App.css";

export default function WeatherCard({ data }) {
  if (!data) return null;
  const { name, sys = {}, weather = [], main = {}, wind = {} } = data;
  const w = weather[0] || {};
  const iconUrl = w.icon ? `https://openweathermap.org/img/wn/${w.icon}@2x.png` : null;

  return (
    <section className="card">
      <div className="card-header">
        <h2>
          {name}
          {sys.country ? `, ${sys.country}` : ""}
        </h2>
        <div className="desc">
          {w.main} — {w.description}
        </div>
      </div>

      <div className="card-body">
        <div className="temp">
          {main.temp !== undefined ? (
            <>
              <span className="temp-value">{Math.round(main.temp)}</span>
              <span className="temp-unit">°C</span>
            </>
          ) : (
            <span>N/A</span>
          )}
        </div>

        {iconUrl && (
          <div className="icon">
            <img src={iconUrl} alt={w.description} />
          </div>
        )}

        <ul className="details">
          <li>Feels like: {main.feels_like !== undefined ? Math.round(main.feels_like) + "°C" : "—"}</li>
          <li>Humidity: {main.humidity !== undefined ? main.humidity + "%" : "—"}</li>
          <li>Pressure: {main.pressure ? main.pressure + " hPa" : "—"}</li>
          <li>Wind: {wind.speed ? wind.speed + " m/s" : "—"}</li>
        </ul>
      </div>
    </section>
  );
}
