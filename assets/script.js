var searchBtn = $('#searchBtn');
var cityInput = $('cityInput').value();
var weatherDis = $('weatherDisplay');
var cardOne = $('card1');
var cardTwo = $('card2');
var cardThree = $('card3');
var cardFour = $('card4');
var cardFive = $('card5');

var apiKey = '7d74e270df0bbca669a7d6d2d8197ca6';

var latitude = '';
var longitude = '';


const getApi = (longitude, latitude) => {
    var requestUrl = `api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)
      });
}


searchBtn.addEventListener('click', getApi(latitude,longitude))