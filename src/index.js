import {
    timeConversion,
    timeInternationalConversion
} from "./time";
import "./styles/index.scss";

document.addEventListener("DOMContentLoaded", () => {
    function currentWeather() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (pos) {
                const api = "f8d77a8717d41a7529bb83ece54c1905";
                const crd = pos.coords;
                const latitude = crd.latitude;
                const longitude = crd.longitude;
                sortDataItems = [];
                currentDataItem = [];
                scrollingTrue = false;
                fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&appid=${api}`)
                    .then(function (resp) { return resp.json() })
                    .then(function (data) {
                        currentTimeWeather(data.current);
                        sortScrolling(data.current, data.daily, false);
                    })
            }, function (err) {
                document.getElementById("time").innerHTML = "Search for a city!";
            }, { enableHighAccuracy: false, timeout: 5000 });
        } else {
            document.getElementById("time").innerHTML = "Geolocation is not avaible on your browser, Please type in your city.";
        }
    }
    currentWeather();
    function currentTimeWeather(data) {
        if (data.message){
            return document.getElementById("time").innerHTML = data.message;
        }
        const currentTime = timeConversion(data.dt);
        document.getElementById("timeCurrent").innerHTML = currentTime;
        // current weather
        const temp = data.feels_like;
        const sky = data.weather[0].description;
        const celcius = temp - 273.15;
        const fahrenheit = 1.8 * (temp - 273) + 32;
        document.getElementById("current-temp").innerHTML = `${Math.round(celcius)}°C || ${Math.round(fahrenheit)}°F`;
        document.getElementById("current-sky").innerHTML = `${sky}`;
        skyCondition(sky);
    }

    const input = document.getElementById("input-city");
    input.addEventListener("change", handleInput);
    
    function handleInput(e) {
        // location based on user's input
        const input = e.target.value
        if (input.length > 0 ) {
            weatherSearch(input);
        }
    }
    function searchCityLatLon(dataCoord){
        const api = "f8d77a8717d41a7529bb83ece54c1905";
        const latitude = dataCoord.lat;
        const longitude = dataCoord.lon;
        sortDataItems = [];
        currentDataItem = [];
        scrollingTrue = false;
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&appid=${api}`)
            .then(function (resp) { return resp.json() })
            .then(function (data) {
                // currentSearchTimeWeather(data.current);
                sortScrolling(data.current, data.daily, true);
            })
    }

    function weatherSearch(cityname) {
        const api = "f8d77a8717d41a7529bb83ece54c1905";
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${api}`)
            .then(function (resp) { return resp.json() })
            .then(function (data) {
                currentSearchTimeWeather(cityname, data)
                searchCityLatLon(data.coord)
            })
    }


    function currentSearchTimeWeather(cityname, data) {
        if (data.message) {
            return document.getElementById("time").innerHTML = data.message;
        }
        const unixTime = data.dt + data.timezone;
        const currentTime = timeInternationalConversion(unixTime);
        document.getElementById("time").innerHTML = currentTime;

        // current weather
        const temp = data.main.feels_like;
        const sky = data.weather[0].description;
        const celcius = temp - 273.15;
        const fahrenheit = 1.8 * (temp - 273) + 32;
        // document.getElementById("location").innerHTML = `${cityname}`
        document.getElementById("current-temp").innerHTML = `${Math.round(celcius)}°C || ${Math.round(fahrenheit)}°F`;
        document.getElementById("current-sky").innerHTML = `${sky}`;
        skyCondition(sky);
    }
    // scrolling 
    let sortDataItems = [];
    let currentDataItem = [];
    let scrollingTrue = false;
    function sortScrolling(current, data, scrolling){
        currentDataItem.push(current)
        data.map((dataItem) => {
            sortDataItems.push(dataItem)
        })
        scrollingTrue = scrolling;
    }
    function scrollingTime() {
        console.log(currentDataItem.length)
        if (currentDataItem.length > 0){
            if (!scrollingTrue){
                currentTimeWeather(currentDataItem[0])
            } else {
                if (window.pageYOffset < 2000) {
                    const dataItem = sortDataItems[0]
                    const currentTime = timeConversion(dataItem.dt);
                    document.getElementById("time").innerHTML = `Morning of ${currentTime.slice(0, 9)}`;
                    // current weather
                    const temp = dataItem.feels_like.day;
                    const sky = dataItem.weather[0].description;
                    const celcius = temp - 273.15;
                    const fahrenheit = 1.8 * (temp - 273) + 32;
                    document.getElementById("current-temp").innerHTML = `${Math.round(celcius)}°C || ${Math.round(fahrenheit)}°F`;
                    document.getElementById("current-sky").innerHTML = `${sky}`;
                    skyCondition(sky);
                }
            }
        }
       
        if (sortDataItems.length > 0){
            if (window.pageYOffset >= 2000 && window.pageYOffset < 3000) {
                const dataItem = sortDataItems[0]
                const currentTime = timeConversion(dataItem.dt);
                document.getElementById("time").innerHTML = `Morning of ${currentTime.slice(0, 9)}`;
                // current weather
                const temp = dataItem.feels_like.day;
                const sky = dataItem.weather[0].description;
                const celcius = temp - 273.15;
                const fahrenheit = 1.8 * (temp - 273) + 32;
                document.getElementById("current-temp").innerHTML = `${Math.round(celcius)}°C || ${Math.round(fahrenheit)}°F`;
                document.getElementById("current-sky").innerHTML = `${sky}`;
                skyCondition(sky);
            }
            if (window.pageYOffset >= 3000 && window.pageYOffset < 4000) {
                const dataItem = sortDataItems[0]
                const currentTime = timeConversion(dataItem.dt);
                document.getElementById("time").innerHTML = `Evening of ${currentTime.slice(0, 9)}`;
                // current weather
                const temp = dataItem.feels_like.eve;
                const sky = dataItem.weather[0].description;
                const celcius = temp - 273.15;
                const fahrenheit = 1.8 * (temp - 273) + 32;
                document.getElementById("current-temp").innerHTML = `${Math.round(celcius)}°C || ${Math.round(fahrenheit)}°F`;
                document.getElementById("current-sky").innerHTML = `${sky}`;
                skyCondition(sky);
            }
            if (window.pageYOffset >= 4000 && window.pageYOffset < 5000) {
                const dataItem = sortDataItems[0]
                const currentTime = timeConversion(dataItem.dt);
                document.getElementById("time").innerHTML = `Night of ${currentTime.slice(0, 9)}`;
                // current weather
                const temp = dataItem.feels_like.night;
                const sky = dataItem.weather[0].description;
                const celcius = temp - 273.15;
                const fahrenheit = 1.8 * (temp - 273) + 32;
                document.getElementById("current-temp").innerHTML = `${Math.round(celcius)}°C || ${Math.round(fahrenheit)}°F`;
                document.getElementById("current-sky").innerHTML = `${sky}`;
                skyCondition(sky);
            }

            if (window.pageYOffset >= 5000 && window.pageYOffset < 6000) {
                const dataItem = sortDataItems[1]
                const currentTime = timeConversion(dataItem.dt);
                document.getElementById("time").innerHTML = `Morning of ${currentTime.slice(0, 9)}`;
                // current weather
                const temp = dataItem.feels_like.day;
                const sky = dataItem.weather[0].description;
                const celcius = temp - 273.15;
                const fahrenheit = 1.8 * (temp - 273) + 32;
                document.getElementById("current-temp").innerHTML = `${Math.round(celcius)}°C || ${Math.round(fahrenheit)}°F`;
                document.getElementById("current-sky").innerHTML = `${sky}`;
                skyCondition(sky);
            }
            if (window.pageYOffset >= 6000 && window.pageYOffset < 7000) {
                const dataItem = sortDataItems[1]
                const currentTime = timeConversion(dataItem.dt);
                document.getElementById("time").innerHTML = `Evening of ${currentTime.slice(0, 9)}`;
                // current weather
                const temp = dataItem.feels_like.eve;
                const sky = dataItem.weather[0].description;
                const celcius = temp - 273.15;
                const fahrenheit = 1.8 * (temp - 273) + 32;
                document.getElementById("current-temp").innerHTML = `${Math.round(celcius)}°C || ${Math.round(fahrenheit)}°F`;
                document.getElementById("current-sky").innerHTML = `${sky}`;
                skyCondition(sky);
            }
            if (window.pageYOffset >= 7000 && window.pageYOffset < 8000)  {
                const dataItem = sortDataItems[1]
                const currentTime = timeConversion(dataItem.dt);
                document.getElementById("time").innerHTML = `Night of ${currentTime.slice(0, 9)}`;
                // current weather
                const temp = dataItem.feels_like.night;
                const sky = dataItem.weather[0].description;
                const celcius = temp - 273.15;
                const fahrenheit = 1.8 * (temp - 273) + 32;
                document.getElementById("current-temp").innerHTML = `${Math.round(celcius)}°C || ${Math.round(fahrenheit)}°F`;
                document.getElementById("current-sky").innerHTML = `${sky}`;
                skyCondition(sky);
            }

            if (window.pageYOffset >= 8000 && window.pageYOffset < 9000) {
                const dataItem = sortDataItems[2]
                const currentTime = timeConversion(dataItem.dt);
                document.getElementById("time").innerHTML = `Morning of ${currentTime.slice(0, 9)}`;
                // current weather
                const temp = dataItem.feels_like.day;
                const sky = dataItem.weather[0].description;
                const celcius = temp - 273.15;
                const fahrenheit = 1.8 * (temp - 273) + 32;
                document.getElementById("current-temp").innerHTML = `${Math.round(celcius)}°C || ${Math.round(fahrenheit)}°F`;
                document.getElementById("current-sky").innerHTML = `${sky}`;
                skyCondition(sky);
            }
            if (window.pageYOffset >= 9000 && window.pageYOffset < 10500) {
                const dataItem = sortDataItems[2]
                const currentTime = timeConversion(dataItem.dt);
                document.getElementById("time").innerHTML = `Evening of ${currentTime.slice(0, 9)}`;
                // current weather
                const temp = dataItem.feels_like.eve;
                const sky = dataItem.weather[0].description;
                const celcius = temp - 273.15;
                const fahrenheit = 1.8 * (temp - 273) + 32;
                document.getElementById("current-temp").innerHTML = `${Math.round(celcius)}°C || ${Math.round(fahrenheit)}°F`;
                document.getElementById("current-sky").innerHTML = `${sky}`;
                skyCondition(sky);
            }
            if (window.pageYOffset >= 10500 && window.pageYOffset < 12000) {
                const dataItem = sortDataItems[2]
                const currentTime = timeConversion(dataItem.dt);
                document.getElementById("time").innerHTML = `Night of ${currentTime.slice(0, 9)}`;
                // current weather
                const temp = dataItem.feels_like.night;
                const sky = dataItem.weather[0].description;
                const celcius = temp - 273.15;
                const fahrenheit = 1.8 * (temp - 273) + 32;
                document.getElementById("current-temp").innerHTML = `${Math.round(celcius)}°C || ${Math.round(fahrenheit)}°F`;
                document.getElementById("current-sky").innerHTML = `${sky}`;
                skyCondition(sky);
            }


            if (window.pageYOffset >= 12000 && window.pageYOffset < 13000) {
                const dataItem = sortDataItems[3]
                const currentTime = timeConversion(dataItem.dt);
                document.getElementById("time").innerHTML = `Morning of ${currentTime.slice(0, 9)}`;
                // current weather
                const temp = dataItem.feels_like.day;
                const sky = dataItem.weather[0].description;
                const celcius = temp - 273.15;
                const fahrenheit = 1.8 * (temp - 273) + 32;
                document.getElementById("current-temp").innerHTML = `${Math.round(celcius)}°C || ${Math.round(fahrenheit)}°F`;
                document.getElementById("current-sky").innerHTML = `${sky}`;
                skyCondition(sky);
            }
            if (window.pageYOffset >= 13000 && window.pageYOffset < 14000) {
                const dataItem = sortDataItems[3]
                const currentTime = timeConversion(dataItem.dt);
                document.getElementById("time").innerHTML = `Evening of ${currentTime.slice(0, 9)}`;
                // current weather
                const temp = dataItem.feels_like.eve;
                const sky = dataItem.weather[0].description;
                const celcius = temp - 273.15;
                const fahrenheit = 1.8 * (temp - 273) + 32;
                document.getElementById("current-temp").innerHTML = `${Math.round(celcius)}°C || ${Math.round(fahrenheit)}°F`;
                document.getElementById("current-sky").innerHTML = `${sky}`;
                skyCondition(sky);
            }
            if (window.pageYOffset >= 14000 && window.pageYOffset < 15000) {
                const dataItem = sortDataItems[3]
                const currentTime = timeConversion(dataItem.dt);
                document.getElementById("time").innerHTML = `Night of ${currentTime.slice(0, 9)}`;
                // current weather
                const temp = dataItem.feels_like.night;
                const sky = dataItem.weather[0].description;
                const celcius = temp - 273.15;
                const fahrenheit = 1.8 * (temp - 273) + 32;
                document.getElementById("current-temp").innerHTML = `${Math.round(celcius)}°C || ${Math.round(fahrenheit)}°F`;
                document.getElementById("current-sky").innerHTML = `${sky}`;
                skyCondition(sky);
            }


            if (window.pageYOffset >= 15000 && window.pageYOffset < 17000) {
                const dataItem = sortDataItems[4]
                const currentTime = timeConversion(dataItem.dt);
                document.getElementById("time").innerHTML = `Morning of ${currentTime.slice(0, 9)}`;
                // current weather
                const temp = dataItem.feels_like.day;
                const sky = dataItem.weather[0].description;
                const celcius = temp - 273.15;
                const fahrenheit = 1.8 * (temp - 273) + 32;
                document.getElementById("current-temp").innerHTML = `${Math.round(celcius)}°C || ${Math.round(fahrenheit)}°F`;
                document.getElementById("current-sky").innerHTML = `${sky}`;
                skyCondition(sky);
            }
            if (window.pageYOffset >= 17000 && window.pageYOffset < 18000) {
                const dataItem = sortDataItems[4]
                const currentTime = timeConversion(dataItem.dt);
                document.getElementById("time").innerHTML = `Evening of ${currentTime.slice(0, 9)}`;
                // current weather
                const temp = dataItem.feels_like.eve;
                const sky = dataItem.weather[0].description;
                const celcius = temp - 273.15;
                const fahrenheit = 1.8 * (temp - 273) + 32;
                document.getElementById("current-temp").innerHTML = `${Math.round(celcius)}°C || ${Math.round(fahrenheit)}°F`;
                document.getElementById("current-sky").innerHTML = `${sky}`;
                skyCondition(sky);
            }
            if (window.pageYOffset >= 18000 && window.pageYOffset < 19000) {
                const dataItem = sortDataItems[4]
                const currentTime = timeConversion(dataItem.dt);
                document.getElementById("time").innerHTML = `Night of ${currentTime.slice(0, 9)}`;
                // current weather
                const temp = dataItem.feels_like.night;
                const sky = dataItem.weather[0].description;
                const celcius = temp - 273.15;
                const fahrenheit = 1.8 * (temp - 273) + 32;
                document.getElementById("current-temp").innerHTML = `${Math.round(celcius)}°C || ${Math.round(fahrenheit)}°F`;
                document.getElementById("current-sky").innerHTML = `${sky}`;
                skyCondition(sky);
            }


            if (window.pageYOffset >= 19000 && window.pageYOffset < 20000) {
                const dataItem = sortDataItems[5]
                const currentTime = timeConversion(dataItem.dt);
                document.getElementById("time").innerHTML = `Morning of ${currentTime.slice(0, 9)}`;
                // current weather
                const temp = dataItem.feels_like.day;
                const sky = dataItem.weather[0].description;
                const celcius = temp - 273.15;
                const fahrenheit = 1.8 * (temp - 273) + 32;
                document.getElementById("current-temp").innerHTML = `${Math.round(celcius)}°C || ${Math.round(fahrenheit)}°F`;
                document.getElementById("current-sky").innerHTML = `${sky}`;
                skyCondition(sky);
            }
            if (window.pageYOffset >= 20000 && window.pageYOffset < 21000) {
                const dataItem = sortDataItems[5]
                const currentTime = timeConversion(dataItem.dt);
                document.getElementById("time").innerHTML = `Evening of ${currentTime.slice(0, 9)}`;
                // current weather
                const temp = dataItem.feels_like.eve;
                const sky = dataItem.weather[0].description;
                const celcius = temp - 273.15;
                const fahrenheit = 1.8 * (temp - 273) + 32;
                document.getElementById("current-temp").innerHTML = `${Math.round(celcius)}°C || ${Math.round(fahrenheit)}°F`;
                document.getElementById("current-sky").innerHTML = `${sky}`;
                skyCondition(sky);
            }
            if (window.pageYOffset >= 21000 && window.pageYOffset < 22000) {
                const dataItem = sortDataItems[5]
                const currentTime = timeConversion(dataItem.dt);
                document.getElementById("time").innerHTML = `Night of ${currentTime.slice(0, 9)}`;
                // current weather
                const temp = dataItem.feels_like.night;
                const sky = dataItem.weather[0].description;
                const celcius = temp - 273.15;
                const fahrenheit = 1.8 * (temp - 273) + 32;
                document.getElementById("current-temp").innerHTML = `${Math.round(celcius)}°C || ${Math.round(fahrenheit)}°F`;
                document.getElementById("current-sky").innerHTML = `${sky}`;
                skyCondition(sky);
            }


            if (window.pageYOffset >= 22000 && window.pageYOffset < 23000) {
                const dataItem = sortDataItems[6]
                const currentTime = timeConversion(dataItem.dt);
                document.getElementById("time").innerHTML = `Morning of ${currentTime.slice(0, 9)}`;
                // current weather
                const temp = dataItem.feels_like.day;
                const sky = dataItem.weather[0].description;
                const celcius = temp - 273.15;
                const fahrenheit = 1.8 * (temp - 273) + 32;
                document.getElementById("current-temp").innerHTML = `${Math.round(celcius)}°C || ${Math.round(fahrenheit)}°F`;
                document.getElementById("current-sky").innerHTML = `${sky}`;
                skyCondition(sky);
            }
            if (window.pageYOffset >= 23000 && window.pageYOffset < 25000) {
                const dataItem = sortDataItems[6]
                const currentTime = timeConversion(dataItem.dt);
                document.getElementById("time").innerHTML = `Evening of ${currentTime.slice(0, 9)}`;
                // current weather
                const temp = dataItem.feels_like.eve;
                const sky = dataItem.weather[0].description;
                const celcius = temp - 273.15;
                const fahrenheit = 1.8 * (temp - 273) + 32;
                document.getElementById("current-temp").innerHTML = `${Math.round(celcius)}°C || ${Math.round(fahrenheit)}°F`;
                document.getElementById("current-sky").innerHTML = `${sky}`;
                skyCondition(sky);
            }
            if (window.pageYOffset >= 25000 && window.pageYOffset < 26000) {
                const dataItem = sortDataItems[6]
                const currentTime = timeConversion(dataItem.dt);
                document.getElementById("time").innerHTML = `Night of ${currentTime.slice(0, 9)}`;
                // current weather
                const temp = dataItem.feels_like.night;
                const sky = dataItem.weather[0].description;
                const celcius = temp - 273.15;
                const fahrenheit = 1.8 * (temp - 273) + 32;
                document.getElementById("current-temp").innerHTML = `${Math.round(celcius)}°C || ${Math.round(fahrenheit)}°F`;
                document.getElementById("current-sky").innerHTML = `${sky}`;
                skyCondition(sky);
            }

            if (window.pageYOffset >= 26000 && window.pageYOffset < 27000) {
                const dataItem = sortDataItems[7]
                const currentTime = timeConversion(dataItem.dt);
                document.getElementById("time").innerHTML = `Morning of ${currentTime.slice(0, 9)}`;
                // current weather
                const temp = dataItem.feels_like.day;
                const sky = dataItem.weather[0].description;
                const celcius = temp - 273.15;
                const fahrenheit = 1.8 * (temp - 273) + 32;
                document.getElementById("current-temp").innerHTML = `${Math.round(celcius)}°C || ${Math.round(fahrenheit)}°F`;
                document.getElementById("current-sky").innerHTML = `${sky}`;
                skyCondition(sky);
            }
            if (window.pageYOffset >= 27000 && window.pageYOffset < 28000) {
                const dataItem = sortDataItems[7]
                const currentTime = timeConversion(dataItem.dt);
                document.getElementById("time").innerHTML = `Evening of ${currentTime.slice(0, 9)}`;
                // current weather
                const temp = dataItem.feels_like.eve;
                const sky = dataItem.weather[0].description;
                const celcius = temp - 273.15;
                const fahrenheit = 1.8 * (temp - 273) + 32;
                document.getElementById("current-temp").innerHTML = `${Math.round(celcius)}°C || ${Math.round(fahrenheit)}°F`;
                document.getElementById("current-sky").innerHTML = `${sky}`;
                skyCondition(sky);
            }
            if (window.pageYOffset >= 28000 && window.pageYOffset < 29000) {
                const dataItem = sortDataItems[7]
                const currentTime = timeConversion(dataItem.dt);
                document.getElementById("time").innerHTML = `Night of ${currentTime.slice(0, 9)}`;
                // current weather
                const temp = dataItem.feels_like.night;
                const sky = dataItem.weather[0].description;
                const celcius = temp - 273.15;
                const fahrenheit = 1.8 * (temp - 273) + 32;
                document.getElementById("current-temp").innerHTML = `${Math.round(celcius)}°C || ${Math.round(fahrenheit)}°F`;
                document.getElementById("current-sky").innerHTML = `${sky}`;
                skyCondition(sky);
            }
        }
    };
    // about website
    let modalButton = document.getElementById("modal-btn");
    let modal = document.querySelector(".modal");
    let closeModal = document.querySelector(".close-btn");

    modalButton.onclick = function () {
        modal.style.display = "block"
    }

    closeModal.onclick = function () {
        modal.style.display = "none"
    }

    window.onclick = function (e) {
        if (e.target == modal) {
            modal.style.display = "none"
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

    // To do this you have to refactor your codes so forecastWeather have an access to variable chart
    let diagramFahDegrees = [];
    let diagramCelDegrees = [];
    function forecastWeather(name, data) {

        document.getElementById("future-location").innerHTML = name;

        const futureConditions = document.querySelector("#diagram-date");
        futureConditions.innerHTML = data.map(data => {
            const celcius = data.main.feels_like - 273.15;
            const fahrenheit = 1.8 * (data.main.feels_like - 273) + 32;
            let dataFahDegree = {}
            dataFahDegree["label"] = `${data.dt_txt}`;
            dataFahDegree["y"] = Math.round(fahrenheit);
            diagramFahDegrees.push(dataFahDegree);
            let dataCelDegree = {}
            dataCelDegree["label"] = `${data.dt_txt}`;
            dataCelDegree["y"] = Math.round(celcius);
            diagramCelDegrees.push(dataCelDegree);

        })

        var chart = new CanvasJS.Chart("weatherContainer", {
            animationEnabled: true,
            title: {
                text: "Forecasted Degree For Next Five Days"
            },
            axisX: {
                title: "Dates"
            },
            axisY: {
                title: "Fahrenheit",
                titleFontColor: "#4F81BC",
                lineColor: "#4F81BC",
                labelFontColor: "#4F81BC",
                tickColor: "#4F81BC",
                includeZero: true
            },
            axisY2: {
                title: "Celcius",
                titleFontColor: "#C0504E",
                lineColor: "#C0504E",
                labelFontColor: "#C0504E",
                tickColor: "#C0504E",
                includeZero: true
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
                name: "Fahrenheit",
                showInLegend: true,
                yValueFormatString: "",
                dataPoints: diagramFahDegrees
            },
            {
                type: "column",
                name: "Celcius Degree",
                legendText: "Celcius Degree",
                axisYType: "secondary",
                showInLegend: true,
                dataPoints: diagramCelDegrees
            }]
        });
        diagramFahDegrees = [];
        diagramCelDegrees = [];
        chart.render();

        function toggleDataSeries(e) {
            // debugger
            if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                e.dataSeries.visible = false;
            }
            else {
                e.dataSeries.visible = true;
            }
            chart.render();
        }

    }
    // music

    let audio;
    function skyCondition(skycondition) {
        if (skycondition.includes("snow")) {
            audio = `<audio id='outsideAudio' controls loop><source src='./src/styles/music/mixkit-blizzard-cold-winds-1153.wav' type='audio/wav'></audio>`;
            document.getElementById("audio-music").innerHTML = audio;
            // debugger
        } else if (skycondition.includes("storm")) {
            audio = `<audio id='outsideAudio' controls loop><source src='./src/styles/music/mixkit-heavy-storm-rain-loop-2400.wav' type='audio/wav'></audio>`;
            document.getElementById("audio-music").innerHTML = audio;
        } else if (skycondition.includes("rain") || skycondition.includes("drizzle") || skycondition.includes("mist")) {
            audio = `<audio id='outsideAudio' controls loop><source src='./src/styles/music/mixkit-the-rainforest-and-distant-thunders-1260.wav' type='audio/wav'></audio>`;
            document.getElementById("audio-music").innerHTML = audio;
        } else {
            audio = `<audio id='outsideAudio' controls loop><source src='./src/styles/music/mixkit-urban-ambient-sound-2465.wav' type='audio/wav'></audio>`;
            document.getElementById("audio-music").innerHTML = audio;
        }
    }

    let startButton = document.getElementById("start-music");
    let stopButton = document.getElementById("stop-music");
    startButton.onclick = function(){
        const music = document.getElementById("outsideAudio");
        music.play();
    }

    stopButton.onclick = function () {
        const music = document.getElementById("outsideAudio");
        music.pause();
    }

    window.onscroll = function () {
        scrollRotate();
        scrollingTime();
    };

    function scrollRotate() {
        let image = document.getElementById("world");
        let circle = document.getElementById("circle");
        image.style.transform = `rotate(${window.pageYOffset / 10}deg)`;
        circle.style.transform = `rotate(${window.pageYOffset / 10}deg)`;
        
    }

    scrollRotate();

});
