import "./styles/index.scss";

// window.addEventListener("DOMContentLoaded", () => {
//     function time() {
//         const date = new Date();
//         document.getElementById("time").innerHTML = `${date.toLocaleTimeString()}`;
//     }
//     setInterval(time, 1000);

//     const currentUserLocation = document.querySelector('#current-location');
//     currentUserLocation.addEventListener("click", currentLocation);

//     function currentLocation() {
//         if (window.navigator.geolocation) { 
//             // console.log(navigator.geolocation);
//             window.navigator.geolocation.getCurrentPosition(function(pos){
//                 debugger
//                 const crd = pos.coords;
//                 console.log("here?")
//                 const latitude = crd.latitude;
//                 const longitude = crd.longitude;
//                 fetch(`api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid="f8d77a8717d41a7529bb83ece54c1905"`)
//                     .then(function (resp) { return resp.json() })
//                     .then(function (data) {
//                         currentWeather(data)
//                     })
//             }, function (err) {
//                     document.getElementById("geolocation-unaviable").innerHTML = err.message;
//             }, { enableHighAccuracy: false, timeout: 5000 });
//         } else {
//             document.getElementById("geolocation-unaviable").innerHTML = "Geolocation is not avaible on your browser, Please type in your city.";
//         }
//         // var ip = '134.201.250.155'
//         // var access_key = '8a3fd288bf68414d9567475f8132c251';
//         // console.log("here")
//         // fetch(`http://api.ipstack.com/${ip}?access_key=${access_key}`)
//         //     .then(resp =>resp.json)
//         //     .then(data => console.log(data.city))
//         // // weatherSearch(data.city);
//     }

//     // Search Bar
//     const input = document.querySelector("input");
//     input.addEventListener("change", handleInput);
//     function handleInput(e) {
//         const input = e.target.value
//         weatherSearch(input);
//     }

//     function weatherSearch(cityname) {
//         console.log(cityname)
//         const api = "f8d77a8717d41a7529bb83ece54c1905";
//         fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${api}`)
//             .then(function (resp) { return resp.json() })
//             .then(function (data) {
//                 currentWeather(data)
//             })
//     }

//     function currentWeather(data) {
//         console.log(data)
//         const temp = data.main.feels_like;
//         const sky = data.weather[0].description;
//         const location = data.name;
//         const celcius = temp - 273.15;
//         const fahrenheit = (1.8 * (temp - 273)) + 32;
//         document.getElementById("current-temp").innerHTML = `${Math.round(fahrenheit)}°F`;
//         document.getElementById("current-sky").innerHTML = `${sky}`;
//         document.getElementById("location").innerHTML = `${location}`;
//     }

//     // Scrolling
//     // function scrollTime(){
//     //     debugger
//     //     console.log("hello")
//     // }
//     // const scrolling = document.getElementById('scrollTime');
//     // if (scrolling){
//     //     console.log("made it?")
//     //     scrolling.addEventListener("scroll", scrollTime);
//     // }

// })


function getWeather() {
    if ("geolocation" in navigator) {
        console.log("hello")
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log("helloooo")
            // console.log("Found your location \nLat : "+position.coords.latitude+" \nLang :"+ position.coords.longitude);
            console.log(position.coords);
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const API_KEY = "f8d77a8717d41a7529bb83ece54c1905";
            $.ajax({
                type: "GET",
                url: `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`,
                success: function (response) {
                    const tempC = response.main.temp;
                    const tempF = (tempC * (9 / 5)) + 32;
                    const iconId = response.weather[0].icon;
                    console.log(response);
                    weatherId = response.weather[0].id;
                    weatherDesc = response.weather[0].main;
                    console.log(weatherDesc);
                }
            })
        });
    } else {
        console.log("Browser doesn't support geolocation");
    }
}
window.addEventListener('load', getWeather);