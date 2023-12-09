var searchResultEl= document.getElementById("weather-info");
var savedSearchesEl= document.getElementById("saved-cities");
var weekForecastEl= document.getElementById("5-day-forecast");
var searchButtonEl= document.getElementById("search-button");


searchButtonEl.addEventListener("click", getWeather);

function getWeather(){
    //run user input through API to get lon and lat of city
    var searchText= document.getElementById("search-text").value.split(" ").join("");
    var getGeoCoordsUrl= "http://api.openweathermap.org/geo/1.0/direct?q=" + searchText +"&limit=5&appid=b95e856ef0726d8cf81fd93906d37be3";
    console.log(getGeoCoordsUrl);
    fetch(getGeoCoordsUrl);

   //use lon and lat to get weather data
    var getWeatherDataUrl= "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=b95e856ef0726d8cf81fd93906d37be3";
    console.log(getWeatherDataUrl);
    fetch(getWeatherDataUrl);

   //append today's temp, wind, humdity to searchResultEl
   //append 5 day forecast to weekForecastEl
}