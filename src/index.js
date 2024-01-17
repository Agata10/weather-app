async function getTodayWeather(input) {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${process.env.API_KEY}&q=${input}&days=3&aqi=no&alerts=no`
    );
    if (response.status === 400) {
      alert("No matching location, please check spelling");
    }
    const weather = await response.json();
    console.log(weather);
    console.log(response.status);
    return weather;
  } catch (err) {
    console.log(err);
  }
}

function setTodayWeather(response) {
  const locationWeather = {
    name: response.location.name,
    country: response.location.country,
    condition: response.current.condition.text,
    condition_icon: response.current.condition.icon,
    temp_c: response.current.temp_c,
    temp_f: response.current.temp_f,
    humidity: response.current.humidity,
    wind_mph: response.current.wind_mph,
  };

  const threeDaysWeather = [
    {
      date: response.forecast.forecastday[0].date,
      min_temp: response.forecast.forecastday[0].day.mintemp_f,
      max_temp: response.forecast.forecastday[0].day.maxtemp_f,
      condition_icon: response.forecast.forecastday[0].day.condition.icon,
    },
    {
      date: response.forecast.forecastday[1].date,
      min_temp: response.forecast.forecastday[1].day.mintemp_f,
      max_temp: response.forecast.forecastday[1].day.maxtemp_f,
      condition_icon: response.forecast.forecastday[1].day.condition.icon,
    },
    {
      date: response.forecast.forecastday[2].date,
      min_temp: response.forecast.forecastday[2].day.mintemp_f,
      max_temp: response.forecast.forecastday[2].day.maxtemp_f,
      condition_icon: response.forecast.forecastday[2].day.condition.icon,
    },
  ];
  console.log(threeDaysWeather);
}

function handleUI() {
  const input = document.getElementById("search");
  const btn = document.getElementById("submit-btn");

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    getTodayWeather(input.value)
      .then((response) => setTodayWeather(response))
      .catch((err) => console.log(err));
  });
  //   const inputval = prompt("Enter name:");
  //   getTodayWeather(inputval).then((response) => setTodayWeather(response));
}

handleUI();
