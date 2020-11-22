const apiKey = "15ab498b9b61f3937a6af9f325c6b2e5";

document.cookie = "promo_shown=1; Max-Age=2600000; Secure"
"promo_shown=1; Max-Age=2600000; Secure"

const searchHistory = JSON.parse(localStorage.getItem("history")) || [];

//function to display weather stats
var displayWeather = function() {
    let cityName = document.querySelector("#searchbar").value

    //save search history to local storage
    searchHistory.push(cityName);
    let stringified_array = JSON.stringify(searchHistory); 
    localStorage.setItem("history", stringified_array);

    $("#searchBlock").empty();
    localStorage.removeItem("history");

   for(var i=0; i < searchHistory.length; i++) {
       $("#searchBlock").append(`
           <div>
               <button id="cityButton" type="button" class="btn btn-outline-dark btn-block">${searchHistory[i]}</button>  
           </div>
       `);
   }

   $("#cityButton").on("click", function(event) {
    
   });

   //current weather api
    const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${apiKey}`;

    $.ajax({
        url:currentUrl,
        method:"GET"
    }).then(function(initial){
        console.log(initial);
        $.ajax({
            url:`https://api.openweathermap.org/data/2.5/onecall?lat=${initial.coord.lat}&lon=${initial.coord.lon}&exclude=hourly,alerts,minutely&units=imperial&appid=${apiKey}`
        }).then(function(feedback){

            //current weather
            console.log(feedback);
            $("#city").prepend(initial.name + " " + "(" + (moment().format('L')) + ")" );
            $("#wIcon").attr("src", "http://openweathermap.org/img/wn/" + initial.weather[0].icon + ".png");
            $("#temperature").append(initial.main.temp + "°F");
            $("#humidity").append(initial.main.humidity + "%");
            $("#wind").append(initial.wind.speed + " MPH");
            $("#uvIndex").append(feedback.current.uvi);

            //set tcolor to UV Index
            if(feedback.current.uvi >= 0 && feedback.current.uvi < 3) {
                $("#uvIndex").addClass(" btn btn-success");
            }

            if(feedback.current.uvi >= 3 && feedback.current.uvi < 8) {
                $("#uvIndex").addClass("btn btn-warning");
            }

            if(feedback.current.uvi >= 8) {
                $("#uvIndex").addClass("btn btn-danger");
            }

            //five day forecast
            for(i=1;i<6;i++){
                $("#fiveDay").append(`
                <div id ="card-body" class="col card text-white bg-primary ml-2 mb-3 mt-2 p-2 rounded text-left">
                <div class="card-text">
                        <h6 class="font-weight-bold"> ${moment(feedback.daily[i].dt * 1000).format("L")} </h6>
                </div>
                <div class="card-body p-2">
                    <p class="card-text"><img id="wicon" src="${'http://openweathermap.org/img/wn/' + feedback.daily[i].weather[0].icon + '.png'}"></p>
                    <p class="card-text">Temp: ${feedback.daily[i].temp.day} °F </p>
                    <p class="card-text">Humidity: ${feedback.daily[i].humidity}%</p>
                </div>
              </div>
              `)
            }
        })       
    })
}

//clear displayed weather stats to display the new ones
var clearInfo = function () {
    $("#city").html("<img id=\"wIcon\" src=\"\"/>");
    $("#temperature").text("Temperature: ");
    $("#humidity").text("Humidity: ");
    $("#wind").text("Wind Speed: ");
    $("#uvIndex").empty();
    $("#fiveDay").empty();
    $("#searchbar").empty();

    displayWeather();
};


$("#submit").on("click",clearInfo);

