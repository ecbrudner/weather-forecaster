var searchResultEl= document.getElementById("weather-info");
var savedSearchesEl= document.getElementById("saved-cities");
var weekForecastEl= document.getElementById("5-day-forecast");
var searchButtonEl= document.getElementById("search-button");
var searchText= document.getElementById("search-text").value;

searchButtonEl.addEventListener("click", getWeather);

function getWeather(){
   //run user input through API to get lon and lat of city
   var getGeoCoordsUrl= "http://api.openweathermap.org/geo/1.0/direct?q=" + searchText +"&limit=5&appid={b95e856ef0726d8cf81fd93906d37be3}";
   console.log(getGeoCoordsUrl);
   fetch(getGeoCoordsUrl);

   //use lon and lat to get weather data
   //append today's temp, wind, humdity to searchResultEl
   //append 5 day forecast to weekForecastEl
}