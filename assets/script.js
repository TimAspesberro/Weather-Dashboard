var searchBtn = document.getElementById('#searchBtn');
var cityInput = document.getElementById('cityInput');
var weatherDis = document.getElementById('weatherDisplay');
var cardOne = document.getElementById('card1');
var cardTwo = document.getElementById('card2');
var cardThree = document.getElementById('card3');
var cardFour = document.getElementById('card4');
var cardFive = document.getElementById('card5');


let latitude = 0; 
let longitude = 0;
var apiKey = 'bc12083e70d2d22298c2df1cec7101d9';

var city = 'los angeles';
var state = 'ca';


const setCoordinate = function (lon, lat,) {
  longitude = lon;
  latitude = lat;
}

const getCity = function() {
  fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},+1&limit=1&appid=bc12083e70d2d22298c2df1cec7101d9`)
  .then(response => {
  return response.json();
  }).then(data => {
    return setCoordinate(data[0].lon, data[0].lat)
  }).catch(err => {
  console.log(`Error: ${err}`)
  })
}

const getApi = function(){
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`)
  .then(response => {
    return response.json();
  }).then(weatherData => {
      console.log(weatherData)
      startForecast(weatherData, city);
    }
  ).catch(err => {
      console.log(`Error: ${err}`)
  })
};

const startForecast = function (weatherData, city) {
  makeDaily(weatherData, city);
  //makeForecast(weatherData);
}

const makeDaily = function (weatherData, city) {
    var curWeather = weatherData.weather[0].description;
    var curTemp = Math.floor(weatherData.main.temp);
    var minTemp = Math.floor(weatherData.main.temp_min);
    var maxTemp = Math.floor(weatherData.main.temp_max);
    var iconId = weatherData.weather[0].icon;
  
    document.getElementById('weatherDisplay').innerHTML = 
      `<div>
        <h3>${city.toUpperCase()}</h3>
        <h5>${curWeather.toUpperCase()}</h5>
        <div id="icon"><img id="wicon" src="https://openweathermap.org/img/wn/${iconId}@2x.png" alt="Weather icon"></div>
          <ul class="list-unstyled">
            <li>Temperature: ${curTemp}°F</li>
            <li>Max Temp: ${maxTemp}°F</li>
            <li>Min Temp: ${minTemp}°F</li>
          </ul>
      </div>`;
};

const makeForecast = function () {

};
    
getCity();
setTimeout(function(){
  getApi();
}, 1000)





//document.getElementById('searchBtn').addEventListener('click', getCity());