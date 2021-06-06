var searchInputEl = $("#search-city");
var citySectionHeaderEl = $("#city-section-header");
var currTempEl = $("#temp");
var currWindEl = $("#wind");
var currHumidEl = $("#humid");
var currUviEl = $("#uvi");

var citySubmitHandler = function(lat, long) {
    citySectionHeaderEl.text(searchInputEl.val());
    var weatherApi = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&units=imperial&exclude=minutely,hourly&appid=bd623837758ad959f4db0c37c609a865";
    fetch(weatherApi).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                var temp = currTempEl.text() + data.current.temp + "°F";
                var wind = currWindEl.text() + data.current.wind_speed + " mph";
                var humid = currHumidEl.text() + data.current.humidity + "%";
                var uvind = currUviEl.text() + data.current.uvi;
                currTempEl.text(temp);
                currWindEl.text(wind);
                currHumidEl.text(humid);
                currUviEl.text(uvind);
                forecastDisplay(data);
            })
        }
        else {
            alert("Weather not found. Please try a different city.");
        }
    })
    .catch(function(error) {
        alert("Unable to connect to servers.");
    });
}

var forecastDisplay = function(weatherObj) {
    for (i = 1; i < 6; i++) {
        weatherDay = weatherObj.daily[i];
        for(x = 0; x < 5; x++) {
            var cardLiEl = $("#card-" + i).children().eq(x);
            if(x = 0) {
                var converter = weatherDay.dt
                converter = converter * 1000
                dateObject = new Date(converter);
                console.log(dateObject);
            }
        }
    }
}

$("#search-button").on("click", function() {
    debugger;
    var geocodeApi = "http://api.positionstack.com/v1/forward?access_key=6a0a7bfe7991fb3b771c2cfee43f426b&query=";
    var fetchGeocodeUrl = geocodeApi + searchInputEl.val();
    fetch(fetchGeocodeUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                cityLatitude = data.data[0].latitude;
                cityLongitude = data.data[0].longitude;
                citySubmitHandler(cityLatitude, cityLongitude);
            })
        }
        else {
            alert("City not found. Please try again.");
        }
    })
    .catch(function(error) {
        alert("Unable to connect to servers.");
    });
})