'use strict';
const apiKey = 'f4eef1d8457f604f67d39e1b93c744bf';
const apiUrl =
  'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
const searchInput = document.getElementById('input');
const searchBtn = document.getElementById('btn');

const cityName = document.querySelector('.city');
const temperature = document.querySelector('.deg');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');

const weatherIcon = document.getElementById('icon');
// console.log(temperature);

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status === 404) {
    document.getElementById('notify').style.display = 'block';
    document.querySelector('.weather').style.display = none;
  } else {
    let datas = await response.json();
    cityName.innerHTML = datas.name;
    temperature.innerHTML = Math.round(datas.main.temp) + '°C';
    humidity.innerHTML = datas.main.humidity + '%';
    wind.innerHTML = datas.wind.speed + ' km/h';

    if (datas.weather[0].main == 'Clouds') {
      weatherIcon.src = 'images/clouds.png';
    } else if (datas.weather[0].main == 'Clear') {
      weatherIcon.src = 'images/clear.png';
    } else if (datas.weather[0].main == 'Rain') {
      weatherIcon.src = 'images/rain.png';
    } else if (datas.weather[0].main == 'Drizzle') {
      weatherIcon.src = 'images/drizzle.png';
    } else if (datas.weather[0].main == 'Mist') {
      weatherIcon.src = 'images/mist.png';
    }
  }
  document.getElementById('notify').style.display = 'none';
  document.getElementById('weather').style.display = 'block';
}
checkWeather();

searchBtn.addEventListener('click', () => {
  checkWeather(searchInput.value);
});
