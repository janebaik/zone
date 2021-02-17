

export function timeConversion(unixTime){
    const myDate = new Date(unixTime * 1000);
    let currentTime = myDate.toLocaleString();
    return currentTime;
}

export function timeInternationalConversion(unixTime) {
    const myDate = new Date(unixTime * 1000);
    let currentTime = myDate.toUTCString();
    currentTime = currentTime.slice(0, currentTime.length - 7);
    return currentTime;
}


