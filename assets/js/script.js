const apiKey = "15ab498b9b61f3937a6af9f325c6b2e5";

const savedStuff = localStorage.getItem("whatever") || []


var displayWeather = function() {

    let cityName = document.querySelector("#searchbar").value
    const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

    $.ajax({
        url:currentUrl,
        method:"GET"
    }).then(function(initial){
        console.log(initial);
        $.ajax({
            url:`https://api.openweathermap.org/data/2.5/onecall?lat=${initial.coord.lat}&lon=${initial.coord.lon}&exclude=hourly,alerts,minutely&appid=${apiKey}`
        }).then(function(feedback){
            //current weather
            console.log(feedback);
            $("#city").append(initial.name);
            $("#temperature").append(initial.main.temp + "°F");
            $("#humidity").append(initial.main.humidity + "%");
            $("#wind").append(initial.wind.speed + " MPH");
            $("#uvIndex").append(feedback.current.uvi);

            //five day forecast
            for(i=0;i<5;i++){
                $("#fiveDay").append(`<div class=" col col-sm-6 card text-white bg-primary mb-3 ml-3">
                <div class="card-text"></div>
                <div class="card-body">
                    <p class="card-text">emoji</p>
                    <p class="card-text">Temp:(((${feedback.daily[i].temp.day}) - 273.15) * 1.8 + 32) °F </p>
                    <p class="card-text">Humidity: ${feedback.daily[i].humidity}%</p>
                </div>
              </div>`)
            }
        })
    })
}

$("#submit").on("click",displayWeather)