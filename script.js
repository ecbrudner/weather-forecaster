var searchResultEl= document.getElementById("weather-info");
var savedSearchesEl= document.getElementById("saved-cities");
var weekForecastEl= document.getElementById("5-day-forecast");
var searchButtonEl= document.getElementById("search-button");
var searchTextEl= document.getElementById("search-text");

searchButtonEl.addEventListener("click", getWeather);

//check if city already in local storage
function cityButtonExists(cityName){
    var existingButtons= document.getElementsByClassName("saved-city-button");
    for (var i=0; i<existingButtons.length; i++){
        if (existingButtons[i].innerHTML===cityName){
            return true;
        }
    } 
    return false;
}

function getWeather(){
    //run user input through API to get lon and lat of city
    var searchText= document.getElementById("search-text").value.split(" ").join("");
    var getGeoCoordsUrl= "http://api.openweathermap.org/geo/1.0/direct?q=" + searchText +"&limit=5&appid=b95e856ef0726d8cf81fd93906d37be3";
    console.log(getGeoCoordsUrl);

    fetch(getGeoCoordsUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
        var lon= data[0].lon;
        var lat= data[0].lat;
        var cityName= data[0].name;
        console.log(lon);
        console.log(lat);
        console.log(cityName);

        var searchedCity= {
            cityName: cityName,
            lon: lon,
            lat: lat
        };
        
        //save searched city to local storage
        localStorage.setItem("searchedCity", JSON.stringify(searchedCity));

        //check if button with same city name already exists
        if (!cityButtonExists(cityName)){
        
            //create button for searched city
            var savedCityButton= document.createElement("button");
            savedCityButton.innerHTML= cityName;
            savedCityButton.setAttribute("class", "saved-city-button");

            //append button to savedSearchesEl
            savedSearchesEl.appendChild(savedCityButton);

            //when button is clicked, run getWeather function
            savedCityButton.addEventListener("click", function(){
                searchTextEl.value= cityName;
                getWeather();
            });
        }

        //use lon and lat to get weather data
        var getWeatherDataUrl= "http://api.openweathermap.org/data/2.5/forecast?lat="+ lat +"&lon="+ lon +"&appid=b95e856ef0726d8cf81fd93906d37be3&units=imperial";
        console.log(getWeatherDataUrl);

            fetch(getWeatherDataUrl)
            .then(function(response){
                return response.json();
            })
            .then (function(data){
                console.log(data);

                //clear searchResultEl and weekForecastEl
                searchResultEl.innerHTML= "";
                weekForecastEl.innerHTML= "";
                
                // assign all weather data to variables for today
                var todayDate= data.list[0].dt_txt;
                var todayIconUrl= "http://openweathermap.org/img/w/"+data.list[0].weather[0].icon+".png";
                var todayIcon= document.createElement("img");
                var todayTemp= data.list[0].main.temp+"°F";
                var todayWind= data.list[0].wind.speed+" MPH";
                var todayHumidity= data.list[0].main.humidity+ "%";
                var weatherData= document.createElement("div");


                //append today's temp, wind, humdity to searchResultEl
                searchResultEl.innerHTML= cityName + " " + todayDate;
                todayIcon.setAttribute("src", todayIconUrl);
                searchResultEl.appendChild(todayIcon);
                weatherData.innerHTML= "Temp: "+ todayTemp + " Wind: " + todayWind + " Humidity: " + todayHumidity;
                searchResultEl.appendChild(weatherData);

                //append 5 day forecast to weekForecastEl
                for (var i=7; i<40; i+=8){
                    var dayForecast= document.createElement("div");
                    var dayDate= data.list[i].dt_txt;
                    var dayIconUrl= "http://openweathermap.org/img/w/"+data.list[i].weather[0].icon+".png";
                    var dayIcon= document.createElement("img");
                    var dayTemp= data.list[i].main.temp+"°F";
                    var dayWind= data.list[i].wind.speed+" MPH";
                    var dayHumidity= data.list[i].main.humidity+ "%";
                    dayForecast.innerHTML= dayDate;
                    dayIcon.setAttribute("src", dayIconUrl);
                    dayForecast.appendChild(dayIcon);
                    dayForecast.innerHTML+= "Temp: "+ dayTemp + " Wind: " + dayWind + " Humidity: " + dayHumidity;
                    weekForecastEl.appendChild(dayForecast);
                }
        
            })
             .catch(function(error){
                console.log(error);
            });
    })
    .catch(function(error){
        console.log(error);
    });
}


//0=right now
//8= 24 hours from now (day1)
//16= 48 hours from now (day2)
//24= 72 hours from now (day3)
//32= 96 hours from now (day4)
//39= 120 hours from now (day5)