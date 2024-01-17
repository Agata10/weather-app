async function getDataWeather() {
  try {
    const weather = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${process.env.API_KEY}&q=London&aqi=no`
    );
    const response = await weather.json();
    return response;
  } catch (err) {
    console.log(err);
  }
}

function setWeather(response) {
  const locationWeather = {
    name: response.location.name,
    country: response.location.country,
    condition: response.current.condition.text,
    condition_icon: response.current.condition.icon,
    temp_c: response.current.condition.temp_c,
    temp_f: response.current.condition.tem_f,
    humidity: response.current.condition.humidity,
    wind_mph: response.current.condition.wind_mph,
  };
  console.log(locationWeather);
}

getDataWeather().then((response) => setWeather(response));
