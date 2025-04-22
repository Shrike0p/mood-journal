const API_KEY = "a9a0721e87645249b24bae397983be31"; // Replace with your actual API key

export async function getWeatherByCoords(lat: number, lon: number) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return {
      main: data.weather[0].main,
      temp: Math.round(data.main.temp),
      city: data.name,
    };
  } catch (error) {
    console.error("Failed to fetch weather:", error);
    return null;
  }
}
