import {
    timeConversion,
    unixTime
} from "./time";
import "./styles/index.scss";

function currentWeather(){
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
currentWeather();
function currentTimeWeather(data) {

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

// about website
let modalButton = document.getElementById("modal-btn");
let modal = document.querySelector(".modal");
let closeModal = document.querySelector(".close-btn");

modalButton.onclick = function() {
    modal.style.display = "block"
}

closeModal.onclick = function(){
    modal.style.display = "none"
}

window.onclick = function(e) {
    if (e.target == modal){
        modal.style.display="none"
    }
}


// forecast
let modalForecastButton = document.getElementById("btn-forecast");
let modalForecast = document.querySelector(".modal-forecast");
let closeForecastModal = document.querySelector(".close-forecast-btn");

modalForecastButton.onclick = function () {
    modalForecast.style.display = "block"
}

closeForecastModal.onclick = function () {
    modalForecast.style.display = "none"
}

window.onclick = function (e) {
    if (e.target == modalForecast) {
        modalForecast.style.display = "none"
    }
}

const inputForecast = document.getElementById("input-forecast-city");
inputForecast.addEventListener("change", handleinputForecast);
function handleinputForecast(e) {
    // location based on user's input
    const input = e.target.value
    futureWeather(input);
}


function futureWeather(cityname) {
    const api = "f8d77a8717d41a7529bb83ece54c1905";
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityname}&appid=${api}`)
        .then(function (resp) { return resp.json() })
        .then(function (data) { forecastWeather(data.city.name, data.list) })
}

const diagramDatesDegrees = [];
const diagramConditions = [];
function forecastWeather(name, data) {
    document.getElementById("future-location").innerHTML = name;
    const futureConditions = document.querySelector("#diagram-date");
    futureConditions.innerHTML = "<ul>" + data.map(data => {
        const celcius = data.main.feels_like - 273.15;
        const fahrenheit = 1.8 * (data.main.feels_like - 273) + 32;
        diagramDatesDegrees.push([data.dt_txt, Math.round(fahrenheit),Math.round(celcius)])
        diagramConditions.push([data.dt_txt,data.weather[0].description])
        debugger
        console.log(diagramConditions)
    })
}

// diagram for weather degree
window.onload = function () {
    const itemC = diagramDatesDegrees.map(condition => {
        debugger
        return { label: `${condition[0]}`, y:condition[1] }
    })
    const itemF = diagramDatesDegrees.map(condition => {
        return { label: `${condition[0]}`, y: condition[2] }
    })
    var chart = new CanvasJS.Chart("weatherContainer", {
        animationEnabled: true,
        title: {
            text: "Forecasted Degree For Next Five Days"
        },
        axisY: {
            title: "Fahrenheit",
            titleFontColor: "#4F81BC",
            lineColor: "#4F81BC",
            labelFontColor: "#4F81BC",
            tickColor: "#4F81BC"
        },
        axisY2: {
            title: "Celcius",
            titleFontColor: "#C0504E",
            lineColor: "#C0504E",
            labelFontColor: "#C0504E",
            tickColor: "#C0504E"
        },
        toolTip: {
            shared: true
        },
        legend: {
            cursor: "pointer",
            itemclick: toggleDataSeries
        },
        data: [{
            type: "column",
            name: "Fahrenheit Degree",
            legendText: "Fahrenheit Degree",
            showInLegend: true,
            dataPoints: [
                {itemC}
            ]
        },
        {
            type: "column",
            name: "Celcius Degree",
            legendText: "Celcius Degree",
            axisYType: "secondary",
            showInLegend: true,
            dataPoints: [
                {itemF}
            ]
        }]
    });
    chart.render();

    function toggleDataSeries(e) {
        if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        }
        else {
            e.dataSeries.visible = true;
        }
        chart.render();
    }

}
