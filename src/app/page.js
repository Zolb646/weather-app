"use client";
import { useState } from "react";

export default function Home() {
  const [weather, setWeather] = useState({
    city: "",
    temperature: null,
    condition: "",
    temperatureUnit: "C",
  });
  const [city, setCity] = useState("");
  const [unit, setUnit] = useState("C");
  const [errorState, setErrorState] = useState("");

  const toggleUnit = () => {
    if (unit === "C") {
      setUnit("F");
      if (weather.temperature !== null) {
        setWeather({
          ...weather,
          temperature: (weather.temperature * 9) / 5 + 32,
          temperatureUnit: "F",
        });
      }
    } else {
      setUnit("C");
      if (weather.temperature !== null) {
        setWeather({
          ...weather,
          temperature: ((weather.temperature - 32) * 5) / 9,
          temperatureUnit: "C",
        });
      }
    }
  };

  const handleInput = (e) => {
    setCity(e.target.value);
    setErrorState("");
  };

  const handleButton = async () => {
    try {
      const res = await fetch(`/api/weather?city=${city}`);
      if (!res.ok) throw new Error("Weather API failed");
      const data = await res.json();
      setWeather(data);
    } catch (err) {
      setErrorState("Failed to fetch weather data");
    }
  };

  return (
    <div className="w-[500px] min-h-[400px] rounded-[40px] flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-6 animate-gradient-x">
      <h1 className="text-5xl font-extrabold text-white mb-8 drop-shadow-lg animate-pulse">
        🌤 Weather App
      </h1>

      <div className="flex gap-4 mb-6">
        <input
          type="text"
          value={city}
          onChange={handleInput}
          placeholder="Enter city"
          className="px-5 py-3 rounded-2xl border-2 border-white/50 bg-white/20 text-white placeholder-white focus:outline-none focus:border-white focus:ring-4 focus:ring-white/50 transition duration-300 backdrop-blur-md"
        />
        <button
          onClick={handleButton}
          className="px-6 py-3 rounded-2xl bg-white/30 text-white font-bold uppercase tracking-wide shadow-lg hover:shadow-xl hover:bg-white/50 hover:text-purple-700 transition duration-300 transform hover:-translate-y-1 hover:scale-105"
        >
          Get Weather
        </button>
      </div>

      {errorState && (
        <p className="text-red-300 font-semibold mb-6 text-lg animate-pulse">
          {errorState}
        </p>
      )}

      {weather.temperature !== null && (
        <div className="bg-white/20 backdrop-blur-md shadow-2xl rounded-3xl p-8 text-center w-96 transform hover:scale-105 transition duration-500 hover:shadow-2xl hover:shadow-purple-400/50">
          <h2 className="text-3xl font-bold mb-3 text-white drop-shadow-lg">
            {weather.city} - {weather.condition}
          </h2>
          <p className="text-2xl mb-5 text-white font-semibold drop-shadow-md">
            Temperature: {weather.temperature.toFixed(1)}°
            {weather.temperatureUnit}
          </p>
          <button
            onClick={toggleUnit}
            className="px-5 py-2 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-bold shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
          >
            Show in °{unit === "C" ? "F" : "C"}
          </button>
        </div>
      )}
    </div>
  );
}
