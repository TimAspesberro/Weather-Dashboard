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

var city = 'denver';
var state = 'co';

const setCoordinate = function (lon, lat,) {
  longitude = lon;
  latitude = lat;
}

const getApi = function(){
  console.log(latitude, longitude, apiKey)
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`)
  .then(response => {
  return response.json();
  }).then(data => console.log(data))
  .catch(err => {
  console.log(`Error: ${err}`)
  })
};

const getCity = function() {

  fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},+1&limit=1&appid=bc12083e70d2d22298c2df1cec7101d9`)
  .then(response => {
  return response.json();
  }).then(data => {
    console.log(data)
    return setCoordinate(data[0].lon, data[0].lat)
  }).catch(err => {
  console.log(`Error: ${err}`)
  })
}
    
getCity();
setTimeout(function(){
  getApi();
}, 5000)


//document.getElementById('searchBtn').addEventListener('click', getCity());