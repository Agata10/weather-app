const { constrainedMemory } = require("process");

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
  console.log(locationWeather);
  return [locationWeather, threeDaysWeather];
}

function appendTodayForecast(data) {
  const name = document.querySelector(".name");
  const country = document.createElement("span");
  country.classList.add("country");
  const temp = document.querySelector(".temp");
  const humidity = document.querySelector(".humidity");
  const wind = document.querySelector(".wind");
  const icon = document.querySelector(".icon");
  const condition = document.querySelector(".condition");
  console.log(country);
  name.textContent = `${data[0].name}, `;
  country.textContent = `${data[0].country}`;
  name.appendChild(country);
  temp.textContent = `${data[0].temp_f}F | ${data[0].temp_c}°C`;
  humidity.textContent = `Humidity: ${data[0].humidity}%`;
  wind.textContent = `Wind: ${data[0].wind_mph}mph`;
  icon.setAttribute("src", `https:` + data[0].condition_icon);
  condition.textContent = data[0].condition;
}

function appendWeekForecast(data) {
  // console.log(data[1][0].date);
  let i = 1;
  data[1].forEach((elem) => {
    document.querySelector(`.date${i}`).textContent = elem.date;
    document.querySelector(`.tempH${i}`).textContent = `${elem.max_temp}F`;
    document
      .querySelector(`.icon${i}`)
      .setAttribute("src", `https:` + elem.condition_icon);
    document.querySelector(`.tempL${i}`).textContent = `${elem.min_temp}F`;
    i++;
  });
}

function handleUI() {
  const input = document.getElementById("search");
  const btn = document.getElementById("submit-btn");

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    getTodayWeather(input.value)
      .then((response) => setTodayWeather(response))
      .then((data) => {
        appendTodayForecast(data);
        appendWeekForecast(data);
      });
  });
  //   const inputval = prompt("Enter name:");
  //   getTodayWeather(inputval).then((response) => setTodayWeather(response));
}

handleUI();
