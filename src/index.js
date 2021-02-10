import {
    timeConversion,
    unixTime
} from "./time";
import "./styles/index.scss";

window.addEventListener("DOMContentLoaded", () => {

    currentLocation();

    // Current location
    function currentLocation() {
        if ("geolocation" in navigator) {
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

    // Search Bar
    const input = document.querySelector("input");
    input.addEventListener("change", handleInput);
    function handleInput(e) {
        // location based on user's input
        const input = e.target.value
        timeConversion(input);
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

    function currentTimeWeather(data) {
        // current time
        const unixTime = data.dt + data.timezone;
        const currentTime = timeConversion(unixTime);
        document.getElementById("time").innerHTML = currentTime;
        // current weather
        const temp = data.main.feels_like;
        const sky = data.weather[0].description;
        const location = data.name;
        const celcius = temp - 273.15;
        const fahrenheit = 1.8*(temp - 273) + 32
        document.getElementById("current-temp").innerHTML = `${Math.round(celcius)}°C`;
        document.getElementById("current-sky").innerHTML = `${sky}`;
        document.getElementById("location").innerHTML = `${location}`;
    }

    // time phases
    document.getElementById("change-morning").onclick = function changeMorning(){
        document.getElementById("phaseOfDay").innerHTML = "9:00AM"
    }

    document.getElementById("change-afternoon").onclick = function changeMorning() {
        document.getElementById("phaseOfDay").innerHTML = "12:00PM"
    }

    document.getElementById("change-night").onclick = function changeMorning() {
        document.getElementById("phaseOfDay").innerHTML = "6:00PM"
    }
    // document.getElementById("change-now").onclick = function changeMorning() {
        // TODO: Implement this in order to gain the current time again
    //     document.getElementById("phaseOfDay").innerHTML = null;
    // }

    // NOTE: Both these functions are for ultimate scrolling

    //     var datum = new Date(Date.UTC(2021, 1, 9, 6, 4, 3));
    //     return datum.getTime() / 1000;

    // function scrollTime(){
    //     const element = document.getElementById('scrollTime');
    //     let y = element.scrollTop;
    //     document.getElementById("future-time").innerHTML = y;
    //     console.log("hello")
    // }
})
