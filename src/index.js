import "./styles/index.scss";
window.addEventListener("DOMContentLoaded", () => {
    function time() {
        const date = new Date();
        document.getElementById("time").innerHTML = `${date.toLocaleTimeString()}`;
    }
    setInterval(time, 1000);
    
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
                        currentWeather(data)
                    })
            }, function (err) {
                    document.getElementById("geolocation-unaviable").innerHTML = err.message;
            }, { enableHighAccuracy: false, timeout: 5000 });
        } else {
            document.getElementById("geolocation-unaviable").innerHTML = "Geolocation is not avaible on your browser, Please type in your city.";
        }
    }
    window.addEventListener('load', currentLocation);

    // Search Bar
    const input = document.querySelector("input");
    input.addEventListener("change", handleInput);
    function handleInput(e) {
        const input = e.target.value
        weatherSearch(input);
    }

    function weatherSearch(cityname) {
        console.log(cityname)
        const api = "f8d77a8717d41a7529bb83ece54c1905";
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${api}`)
            .then(function (resp) { return resp.json() })
            .then(function (data) {
                currentWeather(data)
            })
    }

    function currentWeather(data) {
        console.log(data)
        const temp = data.main.feels_like;
        const sky = data.weather[0].description;
        const location = data.name;
        const celcius = temp - 273.15;
        const fahrenheit = (1.8 * (temp - 273)) + 32;
        document.getElementById("current-temp").innerHTML = `${Math.round(fahrenheit)}°F`;
        document.getElementById("current-sky").innerHTML = `${sky}`;
        document.getElementById("location").innerHTML = `${location}`;
    }

    // Scrolling
    // function scrollTime(){
    //     debugger
    //     console.log("hello")
    // }
    // const scrolling = document.getElementById('scrollTime');
    // if (scrolling){
    //     console.log("made it?")
    //     scrolling.addEventListener("scroll", scrollTime);
    // }

})
