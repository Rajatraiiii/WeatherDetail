export async function fetchWeatherByCity(city, apiKey) {
  const q = encodeURIComponent(city.trim());
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${q}&appid=${apiKey}&units=metric`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("City not found");
  return res.json();
}

export async function fetchWeatherByCoords(lat, lon, apiKey) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Couldn't get location weather");
  return res.json();
}
