async function getDataWeather() {
  const weather = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=${process.env.API_KEY}&q=London&aqi=no`
  );
  const response = weather.json();
  console.log(response);
}

getDataWeather();
