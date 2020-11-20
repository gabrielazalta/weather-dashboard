const apiKey = "15ab498b9b61f3937a6af9f325c6b2e5";

const savedStuff = localStorage.getItem("whatever") || []


var displayWeather = function() {

    let cityName = document.querySelector("#searchbar").value
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
            $("#city").append(initial.name + " " + "(" + (moment().format('L')) + ")");
            $("#temperature").append(initial.main.temp + "°F");
            $("#humidity").append(initial.main.humidity + "%");
            $("#wind").append(initial.wind.speed + " MPH");
            $("#uvIndex").append(feedback.current.uvi);

            //five day forecast
            for(i=0;i<5;i++){
                $("#fiveDay").append(`
                <div class="col card text-white bg-primary ml-2 mb-3 mt-2 p-2 rounded text-left">
                <div class="card-text">
                        <h6 id="date" class="font-weight-bold"> ${feedback.daily[i].dt} </h6>
                </div>
                <div class="card-body p-2">
                    <p class="card-text">${feedback.daily[i].weather.weather[i].icon}</p>
                    <p class="card-text">Temp: ${feedback.daily[i].temp.day} °F </p>
                    <p class="card-text">Humidity: ${feedback.daily[i].humidity}%</p>
                </div>
              </div>
              `)
            }
        })
    })
}

$("#submit").on("click",displayWeather)