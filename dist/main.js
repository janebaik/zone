!function(e){var t={};function n(o){if(t[o])return t[o].exports;var a=t[o]={i:o,l:!1,exports:{}};return e[o].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(o,a,function(t){return e[t]}.bind(null,a));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/dist/",n(n.s=1)}([function(e,t,n){},function(e,t,n){"use strict";n.r(t);n(0);function o(e){var t=function(e){var t=new Date(1e3*e).toUTCString();return t=t.slice(0,t.length-7),console.log(t),t}(e.dt+e.timezone);document.getElementById("time").innerHTML=t;var n=e.main.feels_like,o=e.weather[0].description,a=e.name,r=n-273.15,i=1.8*(n-273)+32;document.getElementById("current-temp").innerHTML="".concat(Math.round(r),"°C || ").concat(Math.round(i),"°F"),document.getElementById("current-sky").innerHTML="".concat(o),document.getElementById("location").innerHTML="".concat(a)}"geolocation"in navigator?navigator.geolocation.getCurrentPosition((function(e){var t=e.coords,n=t.latitude,a=t.longitude;fetch("https://api.openweathermap.org/data/2.5/weather?lat=".concat(n,"&lon=").concat(a,"&appid=").concat("f8d77a8717d41a7529bb83ece54c1905")).then((function(e){return e.json()})).then((function(e){o(e)}))}),(function(e){document.getElementById("geolocation-unaviable").innerHTML=e.message}),{enableHighAccuracy:!1,timeout:5e3}):document.getElementById("geolocation-unaviable").innerHTML="Geolocation is not avaible on your browser, Please type in your city.",document.getElementById("input-city").addEventListener("change",(function(e){t=e.target.value,fetch("https://api.openweathermap.org/data/2.5/weather?q=".concat(t,"&appid=").concat("f8d77a8717d41a7529bb83ece54c1905")).then((function(e){return e.json()})).then((function(e){o(e)}));var t}));var a=document.getElementById("modal-btn"),r=document.querySelector(".modal"),i=document.querySelector(".close-btn");a.onclick=function(){r.style.display="block"},i.onclick=function(){r.style.display="none"},window.onclick=function(e){e.target==r&&(r.style.display="none")};var c=document.getElementById("btn-forecast"),l=document.querySelector(".modal-forecast"),u=document.querySelector(".close-forecast-btn");c.onclick=function(){l.style.display="block"},u.onclick=function(){l.style.display="none"},window.onclick=function(e){e.target==l&&(l.style.display="none")},document.getElementById("input-forecast-city").addEventListener("change",(function(e){t=e.target.value,fetch("https://api.openweathermap.org/data/2.5/forecast?q=".concat(t,"&appid=").concat("f8d77a8717d41a7529bb83ece54c1905")).then((function(e){return e.json()})).then((function(e){!function(e,t){document.getElementById("future-location").innerHTML=e,document.querySelector("#diagram-date").innerHTML="<ul>"+t.map((function(e){var t=e.main.feels_like-273.15,n=1.8*(e.main.feels_like-273)+32;d.push([e.dt_txt,Math.round(n),Math.round(t)]),s.push([e.dt_txt,e.weather[0].description]),console.log(s)}))}(e.city.name,e.list)}));var t}));var d=[],s=[];window.onload=function(){var e=d.map((function(e){return{label:"".concat(e[0]),y:e[1]}})),t=d.map((function(e){return{label:"".concat(e[0]),y:e[2]}})),n=new CanvasJS.Chart("weatherContainer",{animationEnabled:!0,title:{text:"Forecasted Degree For Next Five Days"},axisY:{title:"Fahrenheit",titleFontColor:"#4F81BC",lineColor:"#4F81BC",labelFontColor:"#4F81BC",tickColor:"#4F81BC"},axisY2:{title:"Celcius",titleFontColor:"#C0504E",lineColor:"#C0504E",labelFontColor:"#C0504E",tickColor:"#C0504E"},toolTip:{shared:!0},legend:{cursor:"pointer",itemclick:function(e){void 0===e.dataSeries.visible||e.dataSeries.visible?e.dataSeries.visible=!1:e.dataSeries.visible=!0;n.render()}},data:[{type:"column",name:"Fahrenheit Degree",legendText:"Fahrenheit Degree",showInLegend:!0,dataPoints:[{itemC:e}]},{type:"column",name:"Celcius Degree",legendText:"Celcius Degree",axisYType:"secondary",showInLegend:!0,dataPoints:[{itemF:t}]}]});n.render()}}]);
//# sourceMappingURL=main.js.map