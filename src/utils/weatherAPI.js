// // Keyless Weather API using Open-Meteo (free, no signup, CORS friendly)
// https://open-meteo.com/

// /**
//  * Keyless Weather API helpers using Open-Meteo
//  * Free, no signups, no API keys required.
//  */

// // 1. Convert a city name text string into Latitude and Longitude
// export const geocodeLocation = async (cityName) => {
//   try {
//     const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`;
//     const response = await fetch(url);
//     const data = await response.json();

//     if (!data.results || data.results.length === 0) {
//       throw new Error('City not found. Try another location!');
//     }

//     const result = data.results[0];
//     return {
//       lat: result.latitude,
//       lon: result.longitude,
//       name: result.name,
//       country: result.country
//     };
//   } catch (error) {
//     throw new Error(error.message || 'Geocoding service failed.');
//   }
// };

// // 2. Fetch the live weather variables matching your Hero needs
// export const getCurrentWeather = async (lat, lon) => {
//   try {
//     const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code,surface_pressure`;
//     const response = await fetch(url);
//     const data = await response.json();

//     if (!data.current) {
//       throw new Error('Failed to retrieve weather metrics.');
//     }

//     const current = data.current;

//     // Helper to translate Open-Meteo WMO codes to clear descriptions
//     const getWeatherDescription = (code) => {
//       if (code === 0) return 'Clear Skies';
//       if ([1, 2, 3].includes(code)) return 'Partly Cloudy';
//       if ([45, 48].includes(code)) return 'Foggy';
//       if ([51, 53, 55, 61, 63, 65].includes(code)) return 'Raining';
//       if ([71, 73, 75, 77, 85, 86].includes(code)) return 'Snowing';
//       if ([95, 96, 99].includes(code)) return 'Thunderstorm';
//       return 'Overcast';
//     };

//     // Return the clean data formatting your application expects
//     return {
//       temp: Math.round(current.temperature_2m),
//       humidity: `${current.relative_humidity_2m}%`,
//       windSpeed: `${current.wind_speed_10m} km/h`,
//       pressure: `${Math.round(current.surface_pressure)} hPa`,
//       description: getWeatherDescription(current.weather_code)
//     };
//   } catch (error) {
//     throw new Error(error.message || 'Weather fetch service failed.');
//   }
// };


// src/utils/weatherAPI.js

// const WEATHER_CODES = {
//   0: 'Clear sky',
//   1: 'Mainly clear',
//   2: 'Partly cloudy',
//   3: 'Overcast',
//   45: 'Fog',
//   48: 'Depositing rime fog',
//   51: 'Light drizzle',
//   53: 'Moderate drizzle',
//   55: 'Dense drizzle',
//   56: 'Light freezing drizzle',
//   57: 'Dense freezing drizzle',
//   61: 'Slight rain',
//   63: 'Moderate rain',
//   65: 'Heavy rain',
//   66: 'Light freezing rain',
//   67: 'Heavy freezing rain',
//   71: 'Slight snowfall',
//   73: 'Moderate snowfall',
//   75: 'Heavy snowfall',
//   77: 'Snow grains',
//   80: 'Slight rain showers',
//   81: 'Moderate rain showers',
//   82: 'Violent rain showers',
//   85: 'Slight snow showers',
//   86: 'Heavy snow showers',
//   95: 'Thunderstorm',
//   96: 'Thunderstorm with slight hail',
//   99: 'Thunderstorm with heavy hail',
// };

// function getWeatherInfo(code) {
//   return WEATHER_CODES[code] || 'Unknown conditions';
// }

// function getWindDirection(degrees) {
//   if (degrees == null || isNaN(degrees)) return '';
//   const dirs = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
//   const index = Math.round((degrees % 360) / 22.5);
//   return dirs[index % 16];
// }

// export async function geocodeLocation(query) {
//   const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=en&format=json`;
  
//   const res = await fetch(url);
//   if (!res.ok) throw new Error('Geocoding request failed');
  
//   const data = await res.json();
//   if (!data.results || data.results.length === 0) {
//     throw new Error(`Location "${query}" not found`);
//   }

//   const result = data.results[0];
//   return {
//     lat: result.latitude,
//     lon: result.longitude,
//     name: result.name,
//     country: result.country,
//   };
// }

// export async function getCurrentWeather(lat, lon) {
//   const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m&timezone=auto`;

//   const res = await fetch(url);
//   if (!res.ok) throw new Error('Weather data fetch failed');

//   const data = await res.json();
//   const current = data.current;

//   if (!current) throw new Error('No current weather data available');

//   return {
//     temperature: Math.round(current.temperature_2m),
//     feelsLike: Math.round(current.apparent_temperature),
//     humidity: current.relative_humidity_2m,
//     windSpeed: Math.round(current.wind_speed_10m),
//     windDirection: getWindDirection(current.wind_direction_10m),
//     description: getWeatherInfo(current.weather_code),
//   };
// }


// Keyless Weather API using Open-Meteo (free, no signup, CORS friendly)
// https://open-meteo.com/

const WEATHER_CODES = {
  0: { description: 'Clear sky', icon: '☀️' },
  1: { description: 'Mainly clear', icon: '🌤️' },
  2: { description: 'Partly cloudy', icon: '⛅' },
  3: { description: 'Overcast', icon: '☁️' },
  45: { description: 'Fog', icon: '🌫️' },
  48: { description: 'Depositing rime fog', icon: '🌫️' },
  51: { description: 'Light drizzle', icon: '🌦️' },
  53: { description: 'Moderate drizzle', icon: '🌦️' },
  55: { description: 'Dense drizzle', icon: '🌧️' },
  61: { description: 'Slight rain', icon: '🌧️' },
  63: { description: 'Moderate rain', icon: '🌧️' },
  65: { description: 'Heavy rain', icon: '⛈️' },
  71: { description: 'Slight snow fall', icon: '❄️' },
  73: { description: 'Moderate snow fall', icon: '❄️' },
  75: { description: 'Heavy snow fall', icon: '❄️' },
  77: { description: 'Snow grains', icon: '❄️' },
  80: { description: 'Slight rain showers', icon: '🌦️' },
  81: { description: 'Moderate rain showers', icon: '🌧️' },
  82: { description: 'Violent rain showers', icon: '⛈️' },
  85: { description: 'Slight snow showers', icon: '🌨️' },
  86: { description: 'Heavy snow showers', icon: '❄️' },
  95: { description: 'Thunderstorm', icon: '⛈️' },
  96: { description: 'Thunderstorm with slight hail', icon: '⛈️' },
  99: { description: 'Thunderstorm with heavy hail', icon: '⛈️' },
};

function getWindDirection(deg) {
  if (deg == null) return '';
  const dirs = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  return dirs[Math.round(deg / 22.5) % 16];
}

export function getWeatherInfo(code) {
  return WEATHER_CODES[code] || { description: 'Unknown', icon: '🌡️' };
}

// 1. City to Coordinates Converter
export async function geocodeLocation(query) {
  if (!query || !query.trim()) {
    throw new Error('Please enter a location');
  }
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query.trim())}&count=1&language=en&format=json`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Geocoding service unavailable');
  const data = await res.json();
  if (!data.results || data.results.length === 0) {
    throw new Error(`Location "${query}" not found.`);
  }
  const r = data.results[0];
  return {
    lat: r.latitude,
    lon: r.longitude,
    name: r.name,
    country: r.country_code || r.country || '',
    admin: r.admin1 || '',
  };
}

// 2. Current Weather for Hero component
export async function getCurrentWeather(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m,pressure_msl,surface_pressure&timezone=auto`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch current weather');
  const data = await res.json();
  const current = data.current;
  const info = getWeatherInfo(current.weather_code);
  
  return {
    temperature: Math.round(current.temperature_2m),
    temp: Math.round(current.temperature_2m), // For Hero card compatibility
    feelsLike: Math.round(current.apparent_temperature),
    humidity: `${current.relative_humidity_2m}%`,
    windSpeed: `${Math.round(current.wind_speed_10m)} km/h`,
    windDirection: getWindDirection(current.wind_direction_10m),
    pressure: `${Math.round(current.pressure_msl || current.surface_pressure)} hPa`,
    description: info.description,
    icon: info.icon,
    time: current.time,
  };
}

// 3. Hourly Forecast for Hourly page
export async function getHourlyForecast(lat, lon, numHours = 12) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto&forecast_days=2`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch hourly forecast');
  const data = await res.json();
  const hourly = data.hourly;
  const now = new Date();
  const results = [];
  
  for (let i = 0; i < hourly.time.length && results.length < numHours; i++) {
    const t = new Date(hourly.time[i]);
    if (t >= now) {
      const info = getWeatherInfo(hourly.weather_code[i]);
      results.push({
        time: t.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        temp: Math.round(hourly.temperature_2m[i]),
        humidity: hourly.relative_humidity_2m[i],
        wind: Math.round(hourly.wind_speed_10m[i]),
        icon: info.icon,
        description: info.description,
      });
    }
  }
  return results.length > 0 ? results : hourly.time.slice(0, numHours).map((time, i) => {
    const info = getWeatherInfo(hourly.weather_code[i]);
    return {
      time: new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      temp: Math.round(hourly.temperature_2m[i]),
      humidity: hourly.relative_humidity_2m[i],
      wind: Math.round(hourly.wind_speed_10m[i]),
      icon: info.icon,
      description: info.description,
    };
  });
}

// 4. Daily Forecast for History/Radar pages
export async function getDailyForecast(lat, lon, days = 7) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto&forecast_days=${days}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch daily forecast');
  const data = await res.json();
  const daily = data.daily;
  return daily.time.map((dateStr, i) => {
    const info = getWeatherInfo(daily.weather_code[i]);
    const date = new Date(dateStr);
    return {
      date: date.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' }),
      high: Math.round(daily.temperature_2m_max[i]),
      low: Math.round(daily.temperature_2m_min[i]),
      precip: daily.precipitation_probability_max[i] || 0,
      icon: info.icon,
      description: info.description,
    };
  });
}