!function(){const t=document.getElementById("search");document.getElementById("submit-btn").addEventListener("click",(e=>{e.preventDefault(),async function(t){try{const e=await fetch(`http://api.weatherapi.com/v1/forecast.json?key=4a0d8c7e5941457fae103231230812&q=${t}&days=3&aqi=no&alerts=no`);400===e.status&&alert("No matching location, please check spelling");const a=await e.json();return console.log(a),console.log(e.status),a}catch(t){console.log(t)}}(t.value).then((t=>function(t){t.location.name,t.location.country,t.current.condition.text,t.current.condition.icon,t.current.temp_c,t.current.temp_f,t.current.humidity,t.current.wind_mph;const e=[{date:t.forecast.forecastday[0].date,min_temp:t.forecast.forecastday[0].day.mintemp_f,max_temp:t.forecast.forecastday[0].day.maxtemp_f,condition_icon:t.forecast.forecastday[0].day.condition.icon},{date:t.forecast.forecastday[1].date,min_temp:t.forecast.forecastday[1].day.mintemp_f,max_temp:t.forecast.forecastday[1].day.maxtemp_f,condition_icon:t.forecast.forecastday[1].day.condition.icon},{date:t.forecast.forecastday[2].date,min_temp:t.forecast.forecastday[2].day.mintemp_f,max_temp:t.forecast.forecastday[2].day.maxtemp_f,condition_icon:t.forecast.forecastday[2].day.condition.icon}];console.log(e)}(t))).catch((t=>console.log(t)))}))}();