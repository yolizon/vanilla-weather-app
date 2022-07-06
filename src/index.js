function changeTime(timestamp) {
  let currDate = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[currDate.getDay()];
  let hour = currDate.getHours();
  let minutes = currDate.getMinutes();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hour}:${minutes}`;
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];
  return day;
}
function displayForecast() {
  // let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHtml = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHtml =
        forecastHtml +
        `
            
            <div class="col-2">
              <div class="weather-forecast-date">${formatDay(
                forecastDay.dt
              )}</div>
              <img
                src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"
                alt=""
                width="45"
              />
              <div class="weather-forecast-temperatures">
                <span class="weather-forecast-temperature-max"> ${Math.round(
                  forecastDay.temp.max
                )}° </span>
                <span class="weather-forecast-temperature-min"> ${Math.round(
                  forecastDay.temp.min
                )}° </span>
              </div>
            </div>

          `;
    }
  });
  forecastHtml = forecastHtml + `</div>`;
  forecastElement.innerHTML = forecastHtml;
}
function getForecast(coordinates) {
  let apiKey = "77561646d69cf25aabfe000041044736";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then((response) => {
    forecast = response.data.daily;
    displayForecast();
  });
}

function displayWeather(event) {
  event.preventDefault();
  let keyApi = "77561646d69cf25aabfe000041044736";
  let city = document.querySelector("#input-value").value;
  let urlCity = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${keyApi}&units=metric`;
  axios.get(urlCity).then(showWeather);
}
function showWeather(response) {
  celsiusTemperature = response.data.main.temp;
  let temperature = Math.round(celsiusTemperature);
  let degrees = document.querySelector("#degrees");
  let humidity = document.querySelector("#humid");
  let wind = document.querySelector("#wind");
  let humidityApi = response.data.main.humidity;
  let windApi = Math.round(response.data.wind.speed);
  let h1 = document.querySelector("h1");
  let city = response.data.name;
  let description = document.querySelector("#description");
  let descriptionApi = response.data.weather[0].description;
  let date = document.querySelector("#date");
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
  date.innerHTML = changeTime(response.data.dt * 1000);
  degrees.innerHTML = `${temperature}`;
  humidity.innerHTML = `${humidityApi}`;
  wind.innerHTML = `${windApi}`;
  h1.innerHTML = `${city}`;
  description.innerHTML = `${descriptionApi}`;

  getForecast(response.data.coord);
}
let searchBtn = document.querySelector("#search-btn");
let updateWeather = document.querySelector("#search-form");
updateWeather.addEventListener("submit", displayWeather);
searchBtn.addEventListener("click", displayWeather);

function displayCurrentWeather(position) {
  let apiKey = "77561646d69cf25aabfe000041044736";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}
function currentGeolocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(displayCurrentWeather);
}

navigator.geolocation.getCurrentPosition(displayCurrentWeather);
let currentBtn = document.querySelector("#current-btn");
currentBtn.addEventListener("click", currentGeolocation);

let celsiusTemperature = null;
let forecast = null;
function getFahrenheit(celsiusTemp) {
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  fahrenheitTemperature = Math.round((celsiusTemp * 9) / 5 + 32);
  return fahrenheitTemperature;
}
function changeDegreesFahrenheit(event) {
  event.preventDefault();
  let degrees = document.querySelector("#degrees");
  let forecastFahrenheitMax = document.querySelectorAll(
    ".weather-forecast-temperature-max"
  );
  let forecastFahrenheitMin = document.querySelectorAll(
    ".weather-forecast-temperature-min"
  );
  forecastFahrenheitMax.forEach((temp) => {
    temp.innerHTML = getFahrenheit(temp.innerHTML);
  });
  forecastFahrenheitMin.forEach((temp) => {
    temp.innerHTML = getFahrenheit(temp.innerHTML);
  });
  degrees.innerHTML = getFahrenheit(celsiusTemperature);
}
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", changeDegreesFahrenheit);
function getCelcius(celsiusTemp) {
  fahrenheit.classList.remove("active");
  celsius.classList.add("active");
  return Math.round(celsiusTemp);
}
function changeDegreesCelsius(event) {
  event.preventDefault();
  let degrees = document.querySelector("#degrees");
  degrees.innerHTML = getCelcius(celsiusTemperature);
  displayForecast();
}

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", changeDegreesCelsius);
