import {
    timeConversion,
    unixTime
} from "./time";
import "./styles/index.scss";

function currentWeather(){
    if ("geolocation" in navigator) {
        // debugger
        // console.log(navigator.geolocation);
        navigator.geolocation.getCurrentPosition(function (pos) {
            const api = "f8d77a8717d41a7529bb83ece54c1905";
            const crd = pos.coords;
            const latitude = crd.latitude;
            const longitude = crd.longitude;
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api}`)
                .then(function (resp) { return resp.json() })
                .then(function (data) {
                    currentTimeWeather(data)
                })
        }, function (err) {
            document.getElementById("geolocation-unaviable").innerHTML = err.message;
        }, { enableHighAccuracy: false, timeout: 5000 });
    } else {
        document.getElementById("geolocation-unaviable").innerHTML = "Geolocation is not avaible on your browser, Please type in your city.";
    }
}
currentWeather();
function currentTimeWeather(data) {
    debugger
    const unixTime = data.dt + data.timezone;
    const currentTime = timeConversion(unixTime);
    document.getElementById("time").innerHTML = currentTime;
    // current weather
    const temp = data.main.feels_like;
    const sky = data.weather[0].description;
    const location = data.name;
    const celcius = temp - 273.15;
    const fahrenheit = 1.8 * (temp - 273) + 32;
    document.getElementById("current-temp").innerHTML = `${Math.round(celcius)}°C || ${Math.round(fahrenheit)}°F`;
    document.getElementById("current-sky").innerHTML = `${sky}`;
    document.getElementById("location").innerHTML = `${location}`;
}

const input = document.getElementById("input-city");
input.addEventListener("change", handleInput);
function handleInput(e) {
    // location based on user's input
    const input = e.target.value
    weatherSearch(input);
}

function weatherSearch(cityname) {
    const api = "f8d77a8717d41a7529bb83ece54c1905";
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${api}`)
        .then(function (resp) { return resp.json() })
        .then(function (data) {
            currentTimeWeather(data)
        })
}

function futureWeather(cityname){
    const api = "f8d77a8717d41a7529bb83ece54c1905";
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityname}&appid=${api}`)
        .then(function (resp) { return resp.json() })
        .then(function (data) { forecastWeather(data.city.name, data.list) })
}

function forecastWeather(name, data) {
    document.getElementById("location").innerHTML = name;

    const futureConditions = document.querySelector("#future-conditions");
    futureConditions.innerHTML = "<ul>" + data.map( data =>{
        return "<li>" + data.dt_txt + "</li>" ;
    }).join("") + "</ul>"

    const futureTemps = document.querySelector("#future-temps");
    futureTemps.innerHTML = "<ul>" + data.map(data => {
        const celcius = data.main.feels_like - 273.15;
        const fahrenheit = 1.8 * (data.main.feels_like- 273) + 32;
        return "<li>" + `${Math.round(celcius)}°C || ${Math.round(fahrenheit)}°F` + "</li>";
    }).join("") + "</ul>"

    const futureWeatherCondition = document.querySelector("#future-weathercondition");
    futureWeatherCondition.innerHTML = "<ul>" + data.map(data => {
        return "<li>" + data.weather[0].description  + "</li>";
    }).join("") + "</ul>"
    
}

