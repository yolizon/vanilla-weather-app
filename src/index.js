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

function displayWeather(event) {
  event.preventDefault();
  let keyApi = "77561646d69cf25aabfe000041044736";
  let city = document.querySelector("#input-value").value;
  let urlCity = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${keyApi}&units=metric`;
  axios.get(urlCity).then(showWeather);
}
function showWeather(response) {
  let temperature = Math.round(response.data.main.temp);
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
}

let searchBtn = document.querySelector("#search-btn");
let updateWeather = document.querySelector("#search-form");
updateWeather.addEventListener("submit", displayWeather);
searchBtn.addEventListener("click", displayWeather);

//2

function displayCurrentWeather(position) {
  let apiKey = "77561646d69cf25aabfe000041044736";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}
function currentGeolocation() {
  navigator.geolocation.getCurrentPosition(displayCurrentWeather);
}
navigator.geolocation.getCurrentPosition(displayCurrentWeather);
let currentBtn = document.querySelector("#current-btn");
currentBtn.addEventListener("click", currentGeolocation);

function changeDegreesFaringate(event) {
  event.preventDefault();
  let degrees = document.querySelector("#degrees");
  return (degrees.innerHTML = "66");
}
let faringate = document.querySelector("#faringate");
faringate.addEventListener("click", changeDegreesFaringate);
function changeDegreesCelsium(event) {
  event.preventDefault();
  let degrees = document.querySelector("#degrees");
  return (degrees.innerHTML = "19");
}
let celsium = document.querySelector("#celsium");
celsium.addEventListener("click", changeDegreesCelsium);
