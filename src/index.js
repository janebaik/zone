import "./styles/index.scss";

window.addEventListener("DOMContentLoaded", () => {
    function time() {
        const date = new Date();
        document.getElementById("time").innerHTML = `Current: ${date.toLocaleTimeString()}`;
    }

    setInterval(time, 1);

    const input= document.querySelector("input")
    
    input.addEventListener("change", handleInput);
    function handleInput(e){
        const input = e.target.value
        console.log(input)
        weather(input);
    }

    
    function weather(cityname) {
        const api = "f8d77a8717d41a7529bb83ece54c1905";
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${api}`)
            .then(function (resp) { return resp.json() })
            .then(function (data) {
                currentWeather(data)
            })
    }

    function currentWeather(data) {
        console.log(data.name)
        const temp = data.main.feels_like;
        const sky = data.weather[0].description;
        const location = data.name;
        const celcius = temp - 273.15;
        const fahrenheit = (1.8 * (temp - 273)) + 32;
        document.getElementById("current-temp").innerHTML = `${Math.round(fahrenheit)}°F`;
        document.getElementById("current-sky").innerHTML = `${sky}`;
        document.getElementById("location").innerHTML = `${location}`;
    }

    
})
