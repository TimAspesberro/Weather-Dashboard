var searchBtn = document.getElementById('searchBtn');
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

var city = 'seattle';
var state = 'wa';


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

const getDaily = function(){
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`)
  .then(response => {
    return response.json();
  }).then(weatherData => {
      console.log(weatherData)
      return makeDaily(weatherData, city)
    }
  ).catch(err => {
      console.log(`Error: ${err}`)
  })
};


const getForecast = function(){
  fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`)
  .then(response => {
    return response.json();
  }).then(forecastData => {
      return makeForecast(forecastData)
    }
  ).catch(err => {
      console.log(`Error: ${err}`)
  })
};


const makeDaily = function (weatherData, city) {
    var curWeather = weatherData.weather[0].description;
    var curTemp = Math.floor(weatherData.main.temp);
    var minTemp = Math.floor(weatherData.main.temp_min);
    var maxTemp = Math.floor(weatherData.main.temp_max);
    var icon = weatherData.weather[0].icon;

    var unixTime = weatherData.dt;
    var date = new Date(unixTime * 1000);
    var newDate = date.toLocaleDateString("en-US");

  
    document.getElementById('weatherDisplay').innerHTML = 
      `<div>
        <h3>${city.toUpperCase()}</h3>
        <h5 style="color: red">${newDate}</h5>
        <h5 class="text-center">${curWeather.toUpperCase()}</h5>
        <div class="text-center" id="icon"><img id="wicon" src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather icon"></div>
          <ul class="list-unstyled text-center">
            <li>Temperature: ${curTemp}°F</li>
            <li>Max Temp: ${maxTemp}°F</li>
            <li>Min Temp: ${minTemp}°F</li>
          </ul>
      </div>`;
};

const makeForecast = function (forecastData) {
    console.log(forecastData);

    const makeDate = function(x){
      var date = forecastData.list[x].dt_txt;
      var splitDate = date.split(" ");
      var fullDate = splitDate[0].split("-");
      var newDate = `${fullDate[1]}/${fullDate[2]}`;
      return newDate;
    }

    const dayOneObj = {
      cardNum: 1,
      date: makeDate(0),
      icon: forecastData.list[4].weather[0].icon,
      temp: Math.floor(forecastData.list[4].main.temp),
      humidity: forecastData.list[4].main.humidity,
      wind: Math.floor(forecastData.list[4].wind.speed),
    }

    const dayTwoObj = {
      cardNum: 2,
      date: makeDate(8),
      icon: forecastData.list[12].weather[0].icon,
      temp: Math.floor(forecastData.list[12].main.temp),
      humidity: forecastData.list[12].main.humidity,
      wind: Math.floor(forecastData.list[12].wind.speed),
    }

    const dayThreeObj = {
      cardNum: 3,
      date: makeDate(16),
      icon: forecastData.list[20].weather[0].icon,
      temp: Math.floor(forecastData.list[20].main.temp),
      humidity: forecastData.list[20].main.humidity,
      wind: Math.floor(forecastData.list[20].wind.speed),
    }

    const dayFourObj = {
      cardNum: 4,
      date: makeDate(24),
      icon: forecastData.list[28].weather[0].icon,
      temp: Math.floor(forecastData.list[28].main.temp),
      humidity: forecastData.list[28].main.humidity,
      wind: Math.floor(forecastData.list[28].wind.speed),
    }

    const dayFiveObj = {
      cardNum: 5,
      date: makeDate(32),
      icon: forecastData.list[36].weather[0].icon,
      temp: Math.floor(forecastData.list[36].main.temp),
      humidity: forecastData.list[36].main.humidity,
      wind: Math.floor(forecastData.list[36].wind.speed),
    }


    const makeCard = function (cardNum, date, icon, temp, humidity, wind) {
    document.getElementById(`card${cardNum}`).innerHTML = 
      `<div>
        <h4>${date}</h4>
        <div class="text-center" id="icon"><img id="wicon" src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather icon"></div>
        <p>Temperature: ${temp}</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind: ${wind} mph</p>
      </div>`;
    };

    const weatherForcast = function(){
      makeCard(dayOneObj.cardNum, dayOneObj.date, dayOneObj.icon, dayOneObj.temp, dayOneObj.humidity, dayOneObj.wind)
      makeCard(dayTwoObj.cardNum, dayTwoObj.date, dayTwoObj.icon, dayTwoObj.temp, dayTwoObj.humidity, dayTwoObj.wind)
      makeCard(dayThreeObj.cardNum, dayThreeObj.date, dayThreeObj.icon, dayThreeObj.temp, dayThreeObj.humidity, dayThreeObj.wind)
      makeCard(dayFourObj.cardNum, dayFourObj.date, dayFourObj.icon, dayFourObj.temp, dayFourObj.humidity, dayFourObj.wind)
      makeCard(dayFiveObj.cardNum, dayFiveObj.date, dayFiveObj.icon, dayFiveObj.temp, dayFiveObj.humidity, dayFiveObj.wind)
    }

    weatherForcast();
  
};

const newLocation = function (x){
  input = x.split(", ");
  city = input[0];
  state = input[1];
}




const runApp = function (){
  getCity();
  setTimeout(function(){
    getDaily();
    getForecast();
  }, 500)
}



searchBtn.addEventListener('click', function () {
  const cityState = document.querySelector('input').value;
  newLocation(cityState);
  runApp();
});
