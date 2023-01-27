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
const weatherIcon = document.getElementById("weather-icon");

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
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    forecast.innerHTML = "";

    for (let i = 0; i < data.list.length; i++) {
      if (data.list[i].dt_txt.includes("12:00:00")) {
        const forecastDate = data.list[i].dt_txt;
        const forecastIcon = data.list[i].weather[0].icon;
        const forecastTemperature = data.list[i].main.temp;
        const forecastWindSpeed = data.list[i].wind.speed;
        const forecastHumidity = data.list[i].main.humidity;

        forecast.innerHTML += `
        <div class="forecast-day">
          <p class="forecast-date">${forecastDate}</p>
          <img src="http://openweathermap.org/img/wn/${forecastIcon}
          <p class="forecast-temperature">Temperature: ${forecastTemperature} F</p>
          <p class="forecast-wind-speed">Wind Speed: ${forecastWindSpeed} mph</p>
          <p class="forecast-humidity">Humidity: ${forecastHumidity}%</p>
        </div>
      `;
    }
  }
})
  .catch((error) => console.log (error));
} 