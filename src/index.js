let currDate = new Date();
function changeTime() {
  let date = document.querySelector("#date");
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
  if (minutes < 10) {
    return (date.innerHTML = `${day} ${hour}:0${minutes}`);
  } else if (hour < 10) {
    return (date.innerHTML = `${day} 0${hour}:${minutes}`);
  } else {
    return (date.innerHTML = `${day} ${hour}:${minutes}`);
  }
}
changeTime();

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
  return (
    (degrees.innerHTML = `${temperature}`),
    (humidity.innerHTML = `${humidityApi}`),
    (wind.innerHTML = `${windApi}`),
    (h1.innerHTML = `${city}`)
  );
}
function showCity() {
  let city = document.querySelector("#input-value").value;
  let h1 = document.querySelector("h1");
  return (h1.innerHTML = `${city}`);
}
let searchBtn = document.querySelector("#search-btn");
let updateWeather = document.querySelector("#search-form");
updateWeather.addEventListener("submit", displayWeather);
updateWeather.addEventListener("submit", showCity);
searchBtn.addEventListener("click", displayWeather);
searchBtn.addEventListener("click", showCity);

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
