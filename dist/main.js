/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _time__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./time */ "./src/time.js");
/* harmony import */ var _styles_index_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles/index.scss */ "./src/styles/index.scss");
/* harmony import */ var _styles_index_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_index_scss__WEBPACK_IMPORTED_MODULE_1__);


window.addEventListener("DOMContentLoaded", function () {
  currentLocation(); // Current location

  function currentLocation() {
    if ("geolocation" in navigator) {
      // console.log(navigator.geolocation);
      navigator.geolocation.getCurrentPosition(function (pos) {
        var api = "f8d77a8717d41a7529bb83ece54c1905";
        var crd = pos.coords;
        var latitude = crd.latitude;
        var longitude = crd.longitude;
        fetch("https://api.openweathermap.org/data/2.5/weather?lat=".concat(latitude, "&lon=").concat(longitude, "&appid=").concat(api)).then(function (resp) {
          return resp.json();
        }).then(function (data) {
          currentTimeWeather(data);
        });
      }, function (err) {
        document.getElementById("geolocation-unaviable").innerHTML = err.message;
      }, {
        enableHighAccuracy: false,
        timeout: 5000
      });
    } else {
      document.getElementById("geolocation-unaviable").innerHTML = "Geolocation is not avaible on your browser, Please type in your city.";
    }
  } // Search Bar


  var input = document.querySelector("input");
  input.addEventListener("change", handleInput);

  function handleInput(e) {
    // location based on user's input
    var input = e.target.value;
    Object(_time__WEBPACK_IMPORTED_MODULE_0__["timeConversion"])(input);
    weatherSearch(input);
  }

  function weatherSearch(cityname) {
    var api = "f8d77a8717d41a7529bb83ece54c1905";
    fetch("https://api.openweathermap.org/data/2.5/weather?q=".concat(cityname, "&appid=").concat(api)).then(function (resp) {
      return resp.json();
    }).then(function (data) {
      currentTimeWeather(data);
    });
  }

  function currentTimeWeather(data) {
    // current time
    var unixTime = data.dt + data.timezone;
    var currentTime = Object(_time__WEBPACK_IMPORTED_MODULE_0__["timeConversion"])(unixTime);
    document.getElementById("time").innerHTML = currentTime; // current weather

    var temp = data.main.feels_like;
    var sky = data.weather[0].description;
    var location = data.name;
    var celcius = temp - 273.15;
    var fahrenheit = 1.8 * (temp - 273) + 32;
    document.getElementById("current-temp").innerHTML = "".concat(Math.round(celcius), "\xB0C");
    document.getElementById("current-sky").innerHTML = "".concat(sky);
    document.getElementById("location").innerHTML = "".concat(location);
  } // time phases


  document.getElementById("change-morning").onclick = function changeMorning() {
    document.getElementById("phaseOfDay").innerHTML = "9:00AM";
  };

  document.getElementById("change-afternoon").onclick = function changeMorning() {
    document.getElementById("phaseOfDay").innerHTML = "12:00PM";
  };

  document.getElementById("change-night").onclick = function changeMorning() {
    document.getElementById("phaseOfDay").innerHTML = "6:00PM";
  }; // document.getElementById("change-now").onclick = function changeMorning() {
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

});

/***/ }),

/***/ "./src/styles/index.scss":
/*!*******************************!*\
  !*** ./src/styles/index.scss ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/time.js":
/*!*********************!*\
  !*** ./src/time.js ***!
  \*********************/
/*! exports provided: timeConversion, unixTime */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "timeConversion", function() { return timeConversion; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unixTime", function() { return unixTime; });
function timeConversion(unixTime) {
  var myDate = new Date(unixTime * 1000);
  var currentTime = myDate.toUTCString();
  currentTime = currentTime.slice(0, currentTime.length - 7);
  console.log(currentTime);
  return currentTime;
}
function unixTime(hour, mins) {
  // could use this to get unixTime
  var today = new Date();
  var month = today.getMonth();
  var date = today.getDate();
  var second = today.getSeconds();
  var dateUnix = new Date(Date.UTC(2021, month, date, hour, mins, second));
  var unixTime = dateUnix.getTime() / 1000;
  document.getElementById("date").innerHTML = unixTime;
}

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZXMvaW5kZXguc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvdGltZS5qcyJdLCJuYW1lcyI6WyJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwiY3VycmVudExvY2F0aW9uIiwibmF2aWdhdG9yIiwiZ2VvbG9jYXRpb24iLCJnZXRDdXJyZW50UG9zaXRpb24iLCJwb3MiLCJhcGkiLCJjcmQiLCJjb29yZHMiLCJsYXRpdHVkZSIsImxvbmdpdHVkZSIsImZldGNoIiwidGhlbiIsInJlc3AiLCJqc29uIiwiZGF0YSIsImN1cnJlbnRUaW1lV2VhdGhlciIsImVyciIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJpbm5lckhUTUwiLCJtZXNzYWdlIiwiZW5hYmxlSGlnaEFjY3VyYWN5IiwidGltZW91dCIsImlucHV0IiwicXVlcnlTZWxlY3RvciIsImhhbmRsZUlucHV0IiwiZSIsInRhcmdldCIsInZhbHVlIiwidGltZUNvbnZlcnNpb24iLCJ3ZWF0aGVyU2VhcmNoIiwiY2l0eW5hbWUiLCJ1bml4VGltZSIsImR0IiwidGltZXpvbmUiLCJjdXJyZW50VGltZSIsInRlbXAiLCJtYWluIiwiZmVlbHNfbGlrZSIsInNreSIsIndlYXRoZXIiLCJkZXNjcmlwdGlvbiIsImxvY2F0aW9uIiwibmFtZSIsImNlbGNpdXMiLCJmYWhyZW5oZWl0IiwiTWF0aCIsInJvdW5kIiwib25jbGljayIsImNoYW5nZU1vcm5pbmciLCJteURhdGUiLCJEYXRlIiwidG9VVENTdHJpbmciLCJzbGljZSIsImxlbmd0aCIsImNvbnNvbGUiLCJsb2ciLCJob3VyIiwibWlucyIsInRvZGF5IiwibW9udGgiLCJnZXRNb250aCIsImRhdGUiLCJnZXREYXRlIiwic2Vjb25kIiwiZ2V0U2Vjb25kcyIsImRhdGVVbml4IiwiVVRDIiwiZ2V0VGltZSJdLCJt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T0FBTixFQUFiO0FBQ0EsTUFBTUMsTUFBTSxHQUFHTCxLQUFLLENBQUNNLFVBQU4sRUFBZjtBQUNBLE1BQU1DLFFBQVEsR0FBRyxJQUFJZixJQUFKLENBQVNBLElBQUksQ0FBQ2dCLEdBQUwsQ0FBUyxJQUFULEVBQWVQLEtBQWYsRUFBc0JFLElBQXRCLEVBQTRCTCxJQUE1QixFQUFrQ0MsSUFBbEMsRUFBd0NNLE1BQXhDLENBQVQsQ0FBakI7QUFDQSxNQUFNaEMsUUFBUSxHQUFHa0MsUUFBUSxDQUFDRSxPQUFULEtBQXFCLElBQXRDO0FBQ0FuRCxVQUFRLENBQUNDLGNBQVQsQ0FBd0IsTUFBeEIsRUFBZ0NDLFNBQWhDLEdBQTRDYSxRQUE1QztBQUNILEMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Rpc3QvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiaW1wb3J0IHtcbiAgICB0aW1lQ29udmVyc2lvbixcbiAgICB1bml4VGltZVxufSBmcm9tIFwiLi90aW1lXCI7XG5pbXBvcnQgXCIuL3N0eWxlcy9pbmRleC5zY3NzXCI7XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG5cbiAgICBjdXJyZW50TG9jYXRpb24oKTtcblxuICAgIC8vIEN1cnJlbnQgbG9jYXRpb25cbiAgICBmdW5jdGlvbiBjdXJyZW50TG9jYXRpb24oKSB7XG4gICAgICAgIGlmIChcImdlb2xvY2F0aW9uXCIgaW4gbmF2aWdhdG9yKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhuYXZpZ2F0b3IuZ2VvbG9jYXRpb24pO1xuICAgICAgICAgICAgbmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbihmdW5jdGlvbiAocG9zKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYXBpID0gXCJmOGQ3N2E4NzE3ZDQxYTc1MjliYjgzZWNlNTRjMTkwNVwiO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNyZCA9IHBvcy5jb29yZHM7XG4gICAgICAgICAgICAgICAgY29uc3QgbGF0aXR1ZGUgPSBjcmQubGF0aXR1ZGU7XG4gICAgICAgICAgICAgICAgY29uc3QgbG9uZ2l0dWRlID0gY3JkLmxvbmdpdHVkZTtcbiAgICAgICAgICAgICAgICBmZXRjaChgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/bGF0PSR7bGF0aXR1ZGV9Jmxvbj0ke2xvbmdpdHVkZX0mYXBwaWQ9JHthcGl9YClcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3ApIHsgcmV0dXJuIHJlc3AuanNvbigpIH0pXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50VGltZVdlYXRoZXIoZGF0YSlcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdlb2xvY2F0aW9uLXVuYXZpYWJsZVwiKS5pbm5lckhUTUwgPSBlcnIubWVzc2FnZTtcbiAgICAgICAgICAgIH0sIHsgZW5hYmxlSGlnaEFjY3VyYWN5OiBmYWxzZSwgdGltZW91dDogNTAwMCB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2VvbG9jYXRpb24tdW5hdmlhYmxlXCIpLmlubmVySFRNTCA9IFwiR2VvbG9jYXRpb24gaXMgbm90IGF2YWlibGUgb24geW91ciBicm93c2VyLCBQbGVhc2UgdHlwZSBpbiB5b3VyIGNpdHkuXCI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBTZWFyY2ggQmFyXG4gICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiaW5wdXRcIik7XG4gICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBoYW5kbGVJbnB1dCk7XG4gICAgZnVuY3Rpb24gaGFuZGxlSW5wdXQoZSkge1xuICAgICAgICAvLyBsb2NhdGlvbiBiYXNlZCBvbiB1c2VyJ3MgaW5wdXRcbiAgICAgICAgY29uc3QgaW5wdXQgPSBlLnRhcmdldC52YWx1ZVxuICAgICAgICB0aW1lQ29udmVyc2lvbihpbnB1dCk7XG4gICAgICAgIHdlYXRoZXJTZWFyY2goaW5wdXQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHdlYXRoZXJTZWFyY2goY2l0eW5hbWUpIHtcbiAgICAgICAgY29uc3QgYXBpID0gXCJmOGQ3N2E4NzE3ZDQxYTc1MjliYjgzZWNlNTRjMTkwNVwiO1xuICAgICAgICBmZXRjaChgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/cT0ke2NpdHluYW1lfSZhcHBpZD0ke2FwaX1gKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3ApIHsgcmV0dXJuIHJlc3AuanNvbigpIH0pXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRUaW1lV2VhdGhlcihkYXRhKVxuICAgICAgICAgICAgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjdXJyZW50VGltZVdlYXRoZXIoZGF0YSkge1xuICAgICAgICAvLyBjdXJyZW50IHRpbWVcbiAgICAgICAgY29uc3QgdW5peFRpbWUgPSBkYXRhLmR0ICsgZGF0YS50aW1lem9uZTtcbiAgICAgICAgY29uc3QgY3VycmVudFRpbWUgPSB0aW1lQ29udmVyc2lvbih1bml4VGltZSk7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGltZVwiKS5pbm5lckhUTUwgPSBjdXJyZW50VGltZTtcbiAgICAgICAgLy8gY3VycmVudCB3ZWF0aGVyXG4gICAgICAgIGNvbnN0IHRlbXAgPSBkYXRhLm1haW4uZmVlbHNfbGlrZTtcbiAgICAgICAgY29uc3Qgc2t5ID0gZGF0YS53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uO1xuICAgICAgICBjb25zdCBsb2NhdGlvbiA9IGRhdGEubmFtZTtcbiAgICAgICAgY29uc3QgY2VsY2l1cyA9IHRlbXAgLSAyNzMuMTU7XG4gICAgICAgIGNvbnN0IGZhaHJlbmhlaXQgPSAxLjgqKHRlbXAgLSAyNzMpICsgMzJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjdXJyZW50LXRlbXBcIikuaW5uZXJIVE1MID0gYCR7TWF0aC5yb3VuZChjZWxjaXVzKX3CsENgO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImN1cnJlbnQtc2t5XCIpLmlubmVySFRNTCA9IGAke3NreX1gO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvY2F0aW9uXCIpLmlubmVySFRNTCA9IGAke2xvY2F0aW9ufWA7XG4gICAgfVxuXG4gICAgLy8gdGltZSBwaGFzZXNcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNoYW5nZS1tb3JuaW5nXCIpLm9uY2xpY2sgPSBmdW5jdGlvbiBjaGFuZ2VNb3JuaW5nKCl7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGhhc2VPZkRheVwiKS5pbm5lckhUTUwgPSBcIjk6MDBBTVwiXG4gICAgfVxuXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjaGFuZ2UtYWZ0ZXJub29uXCIpLm9uY2xpY2sgPSBmdW5jdGlvbiBjaGFuZ2VNb3JuaW5nKCkge1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBoYXNlT2ZEYXlcIikuaW5uZXJIVE1MID0gXCIxMjowMFBNXCJcbiAgICB9XG5cbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNoYW5nZS1uaWdodFwiKS5vbmNsaWNrID0gZnVuY3Rpb24gY2hhbmdlTW9ybmluZygpIHtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwaGFzZU9mRGF5XCIpLmlubmVySFRNTCA9IFwiNjowMFBNXCJcbiAgICB9XG4gICAgLy8gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjaGFuZ2Utbm93XCIpLm9uY2xpY2sgPSBmdW5jdGlvbiBjaGFuZ2VNb3JuaW5nKCkge1xuICAgICAgICAvLyBUT0RPOiBJbXBsZW1lbnQgdGhpcyBpbiBvcmRlciB0byBnYWluIHRoZSBjdXJyZW50IHRpbWUgYWdhaW5cbiAgICAvLyAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwaGFzZU9mRGF5XCIpLmlubmVySFRNTCA9IG51bGw7XG4gICAgLy8gfVxuXG4gICAgLy8gTk9URTogQm90aCB0aGVzZSBmdW5jdGlvbnMgYXJlIGZvciB1bHRpbWF0ZSBzY3JvbGxpbmdcblxuICAgIC8vICAgICB2YXIgZGF0dW0gPSBuZXcgRGF0ZShEYXRlLlVUQygyMDIxLCAxLCA5LCA2LCA0LCAzKSk7XG4gICAgLy8gICAgIHJldHVybiBkYXR1bS5nZXRUaW1lKCkgLyAxMDAwO1xuXG4gICAgLy8gZnVuY3Rpb24gc2Nyb2xsVGltZSgpe1xuICAgIC8vICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Njcm9sbFRpbWUnKTtcbiAgICAvLyAgICAgbGV0IHkgPSBlbGVtZW50LnNjcm9sbFRvcDtcbiAgICAvLyAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmdXR1cmUtdGltZVwiKS5pbm5lckhUTUwgPSB5O1xuICAgIC8vICAgICBjb25zb2xlLmxvZyhcImhlbGxvXCIpXG4gICAgLy8gfVxufSlcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiIsIlxuXG5leHBvcnQgZnVuY3Rpb24gdGltZUNvbnZlcnNpb24odW5peFRpbWUpe1xuICAgIGNvbnN0IG15RGF0ZSA9IG5ldyBEYXRlKHVuaXhUaW1lICogMTAwMCk7XG4gICAgbGV0IGN1cnJlbnRUaW1lID0gbXlEYXRlLnRvVVRDU3RyaW5nKCk7XG4gICAgY3VycmVudFRpbWUgPSBjdXJyZW50VGltZS5zbGljZSgwLCBjdXJyZW50VGltZS5sZW5ndGgtNyk7XG4gICAgY29uc29sZS5sb2coY3VycmVudFRpbWUpXG4gICAgcmV0dXJuIGN1cnJlbnRUaW1lO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdW5peFRpbWUoaG91ciwgbWlucykge1xuICAgIC8vIGNvdWxkIHVzZSB0aGlzIHRvIGdldCB1bml4VGltZVxuICAgIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKTtcbiAgICBjb25zdCBtb250aCA9IHRvZGF5LmdldE1vbnRoKCk7XG4gICAgY29uc3QgZGF0ZSA9IHRvZGF5LmdldERhdGUoKTtcbiAgICBjb25zdCBzZWNvbmQgPSB0b2RheS5nZXRTZWNvbmRzKCk7XG4gICAgY29uc3QgZGF0ZVVuaXggPSBuZXcgRGF0ZShEYXRlLlVUQygyMDIxLCBtb250aCwgZGF0ZSwgaG91ciwgbWlucywgc2Vjb25kKSk7XG4gICAgY29uc3QgdW5peFRpbWUgPSBkYXRlVW5peC5nZXRUaW1lKCkgLyAxMDAwO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGF0ZVwiKS5pbm5lckhUTUwgPSB1bml4VGltZTtcbn1cblxuXG4iXSwic291cmNlUm9vdCI6IiJ9