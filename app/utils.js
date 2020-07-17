
let recordLog = [];



export function hide(element) {
    element.style.display = "none";
}

export function show(element) {
    element.style.display = "inline";
}

export function handleNewRecord(record) {
    recordLog.push(record);
    console.log("record: " + JSON.stringify(record));
}

export function getRecordLog() {
  return recordLog;
}

export function clearRecordLog() {
  recordLog = [];
}

export function getFallEvent(event) {
    let fallEvent;
    if (event == "fall") {
        fallEvent = "Fall";
    }
    else if (event == "near fall") {
        fallEvent = "NearFall";
    }
    return fallEvent;
}

export function getFallType(fallType) {
    let fallDescStr;
    switch (fallType) {
        case 1:
            fallDescStr = "Trip";
            break;
        case 2:
            fallDescStr= "Slip";
            break;
        case 3:
            fallDescStr= "Collapse";
            break;
        default:
            fallDescStr = "Other";
    }
    return fallDescStr
}

export function getFallDirection(fallDirection) {
    let fallDirecStr;
    switch (fallDirection) {
        case 1:
            fallDirecStr= "Forewards";
            break;
        case 2:
            fallDirecStr = "Backwards";
            break;
        case 3:
            fallDirecStr = "Leftwards";
            break;
        case 4:
            fallDirecStr = "Rightwards";
            break;
        default:
            fallDirecStr = "Other";
    }
    return fallDirecStr;
}

export function getActivity(activityDesc) {
    let activity;
    switch (activityDesc) {
        case 1:
            activity = "Walk";
            break;
        case 2:
            activity = "Run";
            break;
        case 3:
            activity = "Hike";
            break;
        case 4:
            activity = "Cycle";
            break;
        case 5:
            activity = "Box";
            break;
        case 6:
            activity = "Swim";
            break;
        case 7:
            activity = "Yoga";
            break;
        case 8:
            activity = "Sit";
            break;
        case 9:
            activity = "Sleep";
        break;
        default:
            activity = "Other";
    }
    return activity;
}

export function getLocation(location) {
    let locationStr;
    switch (location) {
        case 1:
            locationStr = "Home";
            break;
        case 2:
            locationStr = "Work";
            break;
        case 3:
            locationStr = "Church";
            break;
        case 4:
            locationStr = "Outside";
            break;
        case 5:
            locationStr = "Store";
            break;
        case 6:
            locationStr = "Gym";
            break;
        case 7:
            locationStr = "School";
            break;
        default:
            activity = "Other";
    }
    return locationStr;
}

export function getEmotion(emotion) {
    let emotionStr;
    switch (emotion) {
        case 1:
            emotionStr = "Happy";
            break;
        case 2:
            emotionStr = "Sad";
            break;
        case 3:
            emotionStr = "Stressed";
            break;
        case 4:
            emotionStr = "Angry";
            break;
        case 5:
            emotionStr = "Anxious";
            break;
        case 6:
            emotionStr = "Upset";
            break;
        default:
            emotionStr = "Other";
    }
    return emotionStr;
}

//----------------------------------------CLOCK FUNCTIONS-------------------------------------------//
export function getTimeDuration(miliseconds) {
    let seconds = zeroPad(getSeconds(miliseconds) % 60);
    let minutes = zeroPad(getMinutes(miliseconds) % 60);
    let hours = zeroPad(getHours(miliseconds));
    return (`${hours}:${minutes}:${seconds}`);
}

function zeroPad(num) {
    if (num < 10) {
        num = "0" + num;
    }
    return num;
}

 function getSeconds(miliseconds) {
    let seconds;
    seconds = Math.round(miliseconds / 1000);
    return seconds;
}

function getMinutes(miliseconds) {
    let minutes
    minutes = Math.floor(Math.round(miliseconds / 1000) / 60);
    return minutes;
}

 function getHours(miliseconds) {
    let hours;
    hours = Math.floor(Math.round(miliseconds / 1000) / 3600);
    return hours;
}




