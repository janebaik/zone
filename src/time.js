
export function time() {
    // current time
    const date = new Date();
    document.getElementById("time").innerHTML = `${date.toLocaleTimeString()}`;
}

export function timeConversion(unixTime){
    const myDate = new Date(unixTime * 1000);
    let currentTime = myDate.toUTCString();
    currentTime = currentTime.slice(0, currentTime.length-7);
    console.log(currentTime)
    return currentTime;
}

export function unixTime(hour, mins) {
    // could use this to get unixTime
    const today = new Date();
    const month = today.getMonth();
    const date = today.getDate();
    const second = today.getSeconds();
    const dateUnix = new Date(Date.UTC(2021, month, date, hour, mins, second));
    const unixTime = dateUnix.getTime() / 1000;
    document.getElementById("date").innerHTML = unixTime;
}


