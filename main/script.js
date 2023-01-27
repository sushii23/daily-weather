const apiKey = "26cabfa2af3c8ae91ce6cf22b5818b17";

const searchForm = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const currentWeather = document.getElementById("current-weather");
const forecast = document.getElementById("forecast");
const cityName = document.getElementById("city-name");
const date = document.getElementById("date");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const windspeed = document.getElementById("wind-speed");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const city = cityInput.value;

  getCurrentWeather(city);
  getFiveDayForecast(city);
});

function getCurrentWeather(city) {
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`
  )

  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    cityName.innerText = data.name;
    date.innerText = new Date().toLocaleDateString();
    weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    temperature.innerText = `Temperature: ${data.main.temp} F`;
    humidity.innerText = `Humidity: ${data.main.humidity}%`;
    windSpeed.innerText = `Wind Speed: ${data.wind.speed} mph`;
  })
  .catch((error) => console.log(error));
}

function getFiveDayForecast(city) {
  fetch(
    `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`
  )