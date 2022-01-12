//date
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let date = new Date();
let showDate = document.querySelector("#date-and-time");
showDate.innerHTML = `${
  days[date.getDay()]
} | ${date.getHours()}:${date.getMinutes()}`;

//farenheit and celcius conversions

function convertToFahrenheit(event) {
  event.preventDefault();
  let celciusTemperature = document.querySelector("#current-temperature");
  let temperature = celciusTemperature.innerHTML;
  let farenheitConversionFormula = Math.round((temperature * 9) / 5 + 32);
  celciusTemperature.innerHTML = farenheitConversionFormula;
}

function convertToCelcius(event) {
  event.preventDefault();
  let farenheitTemperature = document.querySelector("#current-temperature");
  let currentTemperature = farenheitTemperature.innerHTML;
  let celciusConversionFormula = Math.round(
    ((currentTemperature - 32) * 5) / 9
  );
  farenheitTemperature.innerHTML = celciusConversionFormula;
}

//from celcius to farenheit
let farenheitConversionLink = document.querySelector("#farenheit");
farenheitConversionLink.addEventListener("click", convertToFahrenheit);

//from farenheit to celcius
let celciusConversionLink = document.querySelector("#celcius");
celciusConversionLink.addEventListener("click", convertToCelcius);

//api weather

function searchResults(response) {
  document.querySelector("#city").innerHTML = `<em>${response.data.name}</em`;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
}

function showWeather(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  let apiKey = "eb371e3285b37d59db8fd3917da1ca94";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(searchResults);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  showWeather(city);
}

let newCity = document.querySelector("#search-form");
newCity.addEventListener("submit", showWeather);

//current temperature

function showCurrentCity(response) {
  document.querySelector("#city").innerHTML = `<em> ${response.data.name}</em>`;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
}

function getCurrentLocation(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let units = "metric";
  let currentApiKey = "eb371e3285b37d59db8fd3917da1ca94";
  let currentApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${currentApiKey}&units=${units}`;
  axios.get(currentApiUrl).then(showCurrentCity);
}

function showCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentLocation);
}
let currentLocationButton = document.querySelector("#current-button");
currentLocationButton.addEventListener("click", showCurrentLocation);
