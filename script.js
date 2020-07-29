// This is our API key
var APIKey = "986bd5af56b3d8724d12f185ce2409ca";
var latlon = "lat=39.95&lon=-75.16";
// FIGURE OUT WHY UV INDEX API CALL NOT AUTHORIZED

// Here we are building the URL we need to query the database

var uviURL = "https://api.openweathermap.org/data/2.5/uvi?" + "lat=39.95&lon=-75.16&appid=" + APIKey;
//MIGHT JUST BE A BAD CALL SYNTAX

// Here we run our AJAX call to the OpenWeatherMap API
function getLatLon(city) {
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?" +
        "q="+city +"&units=imperial&appid=" + APIKey,
        method: "GET"
    })
        // We store all of the retrieved data inside of an object called "response"
        .then(function (response) {

            // Log the queryURL
        

            // Log the resulting object
            console.log(response);

            // Transfer content to HTML
            $(".city").html("<h3>" + response.name + " Weather</h3>");
            $(".wind").text("Wind Speed: " + response.wind.speed);
            $(".humidity").text("Humidity: " + response.main.humidity);
            $(".temp").text("Temperature (F) " + response.main.temp);

            // Attempting to add degree symbol but it's not accepting it" &#8457"

            // Converts the temp to Kelvin with the below formula
            var tempF = (response.main.temp - 273.15) * 1.80 + 32;
            $(".tempF").text("Temperature (Kelvin) " + tempF);

            // Log the data in the console as well
            console.log("Wind Speed: " + response.wind.speed);
            console.log("Humidity: " + response.main.humidity);
            console.log("Temperature (F): " + response.main.temp);
            localStorage.setItem("city", city);
            getUV(response.coord.lat, response.coord.lon);
        });
}
function getUV (lat, lon){
    console.log(lat);
    console.log(lon);
    $.ajax({
        url: uviURL,
        method: "GET"
    })
        .then(function (response) {
            console.log(response);

            $(".uvi").html("UV Index " + response.value);
            console.log("UV Index" + response.value);
            console.log("This is local storage", localStorage);

        });
};

$(document).on("click", ".weather-search", function (e) {
    e.preventDefault();
    getLatLon($(".search-field").val());

})

if (localStorage.getItem("city")) {
    getLatLon(localStorage.getItem("city"));
    console.log("It exists!!!");
}
else {
    getLatLon("Philadelphia");
    console.log("It does NOT exist!!");

}

getLatLon(localStorage.getItem("city"));


//5 day forecast//

// $.ajax({
//     url: 'http://api.openweathermap.org/data/2.5/forecast', //API Call
//     dataType: 'json',
//     type: 'GET',
//     data: {
//         q: city,
//         appid: key,
//         units: 'metric',
//         cnt: '10'
//     },
//     success: function (data) {
//         var wf = '';
//         $.each(data, function (index, val) {
//             wf += '<p><b>' + data.city.name + '</b><img src=http://openweathermap.org/img/w/' + data.list[0].weather.icon + '.png></p>' + data.list[0].main.temp + '&deg;C' + ' | ' + data.list[0].weather.main + ", " + data.list[0].weather.description
//         });
//         $("#showWeatherForcast").html(wf);
//     }
// });

// localStorage.setItem(".city", "main.temp");
// localStorage.getItem(".city", "main.temp");


// $(document).on("click", "button.answers", function (event) {
// });