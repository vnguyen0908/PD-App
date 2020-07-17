

import document from "document";
import clock from "clock";
import { HeartRateSensor } from "heart-rate";
import * as messaging from "messaging";
import exercise from "exercise";
import * as utils from "./utils.js";
import SensorRecord from "./classes/sensorRecord.js";
import Record from "./classes/record.js";
import FallDesc from "./classes/fallDesc.js";
import UserInfo from "./classes/userInfo.js";
import { Barometer} from "barometer";
import { Gyroscope} from "gyroscope";
import { Accelerometer} from "accelerometer";
import {OrientationSensor} from "orientation";

//------------------------------------------DECLARE VARS----------------------------------------------//

let container = document.getElementById("container");
var fallDirection = 0;
var fallType = 0;
var event = null;
var activityDesc = null;
var location = 0;
var emotion = 0;
var userInfo = new UserInfo();
container.value = 0; // jump to first slide
exercise.state == "stopped"; // initialize activity to stopped state

//-------------------------------------------SENSORS----------------------------------------------------//

// Create a new instance of the sensor objects
const hrm = new HeartRateSensor();
const bar = new Barometer();
const accel = new Accelerometer({ frequency: 1});

// Begin monitoring sensors
hrm.start();
bar.start();
accel.start();

// Listen for the onopen event
messaging.peerSocket.onopen = function () {
    console.log("socket opened App");  // Ready to send or receive messages
}

//record sensor data every 1 second
setInterval(getSensorRecord, 1000);

//-----------------------------------------------------------------------------CLOCKS------------------------------------------------------------------//

let activityStartTime       = Date.now();
let locationStartTime       = Date.now();
let emotionStartTime        = Date.now();
let locationState           = "stopped";
let emotionState            = "stopped";
let activityClock           = document.getElementById("activityClock");
let locationClock           = document.getElementById("locationClock");
let emotionClock            = document.getElementById("emotionClock");

clock.ontick = function () { handleClock() };

clock.granularity = 'seconds';


//-----------------------------------------------------------------------------CLOCK FUNCTIONS------------------------------------------------------------------//

function handleClock() {
    if (exercise.state === "started") {
        activityClock.text = utils.getTimeDuration(Date.now() - activityStartTime );
    }
    if (locationState == "started") {
        locationClock.text = utils.getTimeDuration(Date.now() - locationStartTime);
    }
    if (emotionState == "started") {
        emotionClock.text = utils.getTimeDuration(Date.now() - emotionStartTime);
    }
}

//-----------------------------------------------------------------------------POPUPS------------------------------------------------------------------//

let demographic1_popup              = document.getElementById("demographic1_popup");        //  dominant hand
let demographic2_popup              = document.getElementById("demographic2_popup");        // wrist watch is on
let demographic3_popup              = document.getElementById("demographic3_popup");        // gender
let demographic4_popup              = document.getElementById("demographic4_popup");        // height
let demographic5_popup              = document.getElementById("demographic5_popup");        // activities per week
let demographic6_popup              = document.getElementById("demographic6_popup");        // active time (per week?)
let fallTypeList                    = document.getElementById("fallTypeList");
let fallDescList                    = document.getElementById("fallDescList");
let fallConfirm                     = document.getElementById("fallConfirm");
let activityBeginConfirm_popup      = document.getElementById("activityBeginConfirm_popup");
let activityEndConfirm_popup        = document.getElementById("activityEndConfirm_popup");
let locationBeginConfirm_popup      = document.getElementById("locationBeginConfirm_popup");
let locationEndConfirm_popup        = document.getElementById("locationEndConfirm_popup");
let emotionBeginConfirm_popup       = document.getElementById("emotionBeginConfirm_popup");
let emotionEndConfirm_popup         = document.getElementById("emotionEndConfirm_popup");

//-----------------------------------------------------------------------------BUTTONS------------------------------------------------------------------//

let tumblerFt                       = demographic4_popup.getElementById("tumblerFt");
let tumblerIn                       = demographic4_popup.getElementById("tumblerIn");
let tumblerActivities               = demographic5_popup.getElementById("tumblerActivities");
let tumblerHr                       = demographic6_popup.getElementById("tumblerHr");
let tumblerMin                      = demographic6_popup.getElementById("tumblerMin");

let beginBtn                        = document.getElementById("beginBtn");
let rhBtn                           = demographic1_popup.getElementById("rhBtn");
let lhBtn                           = demographic1_popup.getElementById("lhBtn");
let bothBtn                         = demographic1_popup.getElementById("bothBtn");
let rwBtn                           = demographic2_popup.getElementById("rwBtn");
let lwBtn                           = demographic2_popup.getElementById("lwBtn");
let fmaleBtn                        = demographic3_popup.getElementById("fmaleBtn");
let maleBtn                         = demographic3_popup.getElementById("maleBtn");
let otherGenBtn                     = demographic3_popup.getElementById("otherGenBtn");
let heightBtn                       = demographic4_popup.getElementById("heightBtn");
let activitiesBtn                   = demographic5_popup.getElementById("activitiesBtn");
let activeTimeBtn                   = demographic6_popup.getElementById("activeTimeBtn");
let walkBtn                         = document.getElementById("walkBtn");
let sitBtn                          = document.getElementById("sitBtn");
let runBtn                          = document.getElementById("runBtn");
let hikeBtn                         = document.getElementById("hikeBtn");
let cycleBtn                        = document.getElementById("cycleBtn");
let boxBtn                          = document.getElementById("boxBtn");
let swimBtn                         = document.getElementById("swimBtn");
let yogaBtn                         = document.getElementById("yogaBtn");
let sleepBtn                        = document.getElementById("sleepBtn");
let otherActBtn                     = document.getElementById("otherBtn");
let fallBtn                         = document.getElementById("fallBtn");
let nearFallBtn                     = document.getElementById("nearFallBtn");
let tripBtn                         = fallTypeList.getElementById("tripBtn");
let slipBtn                         = fallTypeList.getElementById("slipBtn");
let collapseBtn                     = fallTypeList.getElementById("collapseBtn");
let foreBtn                         = fallDescList.getElementById("foreBtn");
let backBtn                         = fallDescList.getElementById("backBtn");
let rightBtn                        = fallDescList.getElementById("rightBtn");
let leftBtn                         = fallDescList.getElementById("leftBtn");
let homeBtn                         = document.getElementById("homeBtn");
let workBtn                         = document.getElementById("workBtn");
let churchBtn                       = document.getElementById("churchBtn");
let outsideBtn                      = document.getElementById("outsideBtn");
let storeBtn                        = document.getElementById("storeBtn");
let gymBtn                          = document.getElementById("gymBtn");
let schoolBtn                       = document.getElementById("schoolBtn");
let otherLocBtn                     = document.getElementById("otherLocBtn");
let happyBtn                        = document.getElementById("happyBtn");
let sadBtn                          = document.getElementById("sadBtn");
let stressedBtn                     = document.getElementById("stressedBtn");
let angryBtn                        = document.getElementById("angryBtn");
let anxiousBtn                      = document.getElementById("anxiousBtn");
let upsetBtn                        = document.getElementById("upsetBtn");
let otherEmotBtn                    = document.getElementById("otherEmotBtn");
let activityBeginConfirmBtn         = activityBeginConfirm_popup.getElementById("yesBtn");
let activityBeginNotConfirmBtn      = activityBeginConfirm_popup.getElementById("noBtn");
let activityEndConfirmBtn           = activityEndConfirm_popup.getElementById("yesBtn");
let activityEndNotConfirmBtn        = activityEndConfirm_popup.getElementById("noBtn");
let fallConfirmBtn                  = fallConfirm.getElementById("yesBtn");
let fallNotConfirmBtn               = fallConfirm.getElementById("noBtn");
let locationBeginConfirmBtn         = locationBeginConfirm_popup.getElementById("yesBtn");
let locationBeginNotConfirmBtn      = locationBeginConfirm_popup.getElementById("noBtn");
let locationEndConfirmBtn           = locationEndConfirm_popup.getElementById("yesBtn");
let locationEndNotConfirmBtn        = locationEndConfirm_popup.getElementById("noBtn");
let emotionBeginConfirmBtn          = emotionBeginConfirm_popup.getElementById("yesBtn");
let emotionBeginNotConfirmBtn       = emotionBeginConfirm_popup.getElementById("noBtn");
let emotionEndConfirmBtn            = emotionEndConfirm_popup.getElementById("yesBtn");
let emotionEndNotConfirmBtn         = emotionEndConfirm_popup.getElementById("noBtn");
let endActivityBtn                  = document.getElementById("endActivityBtn");
let endLocationBtn                  = document.getElementById("endLocationBtn");
let endEmotionBtn                   = document.getElementById("endEmotionBtn");

// -------------------------------------------------------------------ONCLICK FUNCTIONS-------------------------------------------------------------------//

beginBtn.onclick                    = function () { handleDemoBtn("begin", 0) }
rhBtn.onclick                       = function () { handleDemoBtn("hand", 1) };
lhBtn.onclick                       = function () { handleDemoBtn("hand", 2) };
bothBtn.onclick                     = function () { handleDemoBtn("hand", 3) };
rwBtn.onclick                       = function () { handleDemoBtn("wrist", 1) };
lwBtn.onclick                       = function () { handleDemoBtn("wrist", 2) };
fmaleBtn.onclick                    = function () { handleDemoBtn("gender", 1) };
maleBtn.onclick                     = function () { handleDemoBtn("gender", 2) };
otherGenBtn.onclick                 = function () { handleDemoBtn("gender", 3) };
heightBtn.onclick                   = function () { handleDemoBtn("height", null) };
activitiesBtn.onclick               = function () { handleDemoBtn("activity", null) };
activeTimeBtn.onclick               = function () { handleDemoBtn("activeTime", null) };
walkBtn.onclick                     = function () { handleActivityBtn(1) };             
runBtn.onclick                      = function () { handleActivityBtn(2) };        
hikeBtn.onclick                     = function () { handleActivityBtn(3) };       
cycleBtn.onclick                    = function () { handleActivityBtn(4) };       
boxBtn.onclick                      = function () { handleActivityBtn(5) };        
swimBtn.onclick                     = function () { handleActivityBtn(6) };       
yogaBtn.onclick                     = function () { handleActivityBtn(7) }; 
sitBtn.onclick                      = function () { handleActivityBtn(8) };
sleepBtn.onclick                    = function () { handleActivityBtn(9) };
otherActBtn.onclick                 = function () { handleActivityBtn(0) };
fallBtn.onclick                     = function () { handleFallBtn("fall") };
nearFallBtn.onclick                 = function () { handleFallBtn("near fall") }; 
tripBtn.onclick                     = function () { handleFallTypeBtn(1) };       
slipBtn.onclick                     = function () { handleFallTypeBtn(2) };             
collapseBtn.onclick                 = function () { handleFallTypeBtn(3) };   
foreBtn.onclick                     = function () { handleFallDirectionBtn(1) };       
backBtn.onclick                     = function () { handleFallDirectionBtn(2) };   
leftBtn.onclick                     = function () { handleFallDirectionBtn(3) };  
rightBtn.onclick                    = function () { handleFallDirectionBtn(4) };
homeBtn.onclick                     = function () { handleLocationBtn(1) };
workBtn.onclick                     = function () { handleLocationBtn(2) };
churchBtn.onclick                   = function () { handleLocationBtn(3) };
outsideBtn.onclick                  = function () { handleLocationBtn(4) };
storeBtn.onclick                    = function () { handleLocationBtn(5) };
gymBtn.onclick                      = function () { handleLocationBtn(6) };
schoolBtn.onclick                   = function () { handleLocationBtn(7) };
otherLocBtn.onclick                 = function () { handleLocationBtn(0) };
happyBtn.onclick                    = function () { handleEmotionBtn(1) };
sadBtn.onclick                      = function () { handleEmotionBtn(2) };
stressedBtn.onclick                 = function () { handleEmotionBtn(3) };
angryBtn.onclick                    = function () { handleEmotionBtn(4) };
anxiousBtn.onclick                  = function () { handleEmotionBtn(5) };
upsetBtn.onclick                    = function () { handleEmotionBtn(6) }
otherEmotBtn.onclick                = function () { handleEmotionBtn(0) };
fallConfirmBtn.onclick              = function () { handleYesBtn("fallConfirm") };
fallNotConfirmBtn.onclick           = function () { handleNoBtn("fallConfirm") };
activityBeginConfirmBtn.onclick     = function () { handleYesBtn("activityBeginConfirm") };
activityBeginNotConfirmBtn.onclick  = function () { handleNoBtn("activityBeginConfirm") };
activityEndConfirmBtn.onclick       = function () { handleYesBtn("activityEndConfirm") };
activityEndNotConfirmBtn.onclick    = function () { handleNoBtn("activityEndConfirm") };
locationBeginConfirmBtn.onclick     = function () { handleYesBtn("locationBeginConfirm") };
locationBeginNotConfirmBtn.onclick  = function () { handleNoBtn("locationBeginConfirm") };
locationEndConfirmBtn.onclick       = function () { handleYesBtn("locationEndConfirm") };
locationEndNotConfirmBtn.onclick    = function () { handleNoBtn("locationEndConfirm") };
emotionBeginConfirmBtn.onclick      = function () { handleYesBtn("emotionBeginConfirm") };
emotionBeginNotConfirmBtn.onclick   = function () { handleNoBtn("emotionBeginConfirm") };
emotionEndConfirmBtn.onclick        = function () { handleYesBtn("emotionEndConfirm") };
emotionEndNotConfirmBtn.onclick     = function () { handleNoBtn("emotionEndConfirm") };
endActivityBtn.onclick              = function () { handleEndBtn("activity") };
endLocationBtn.onclick              = function () { handleEndBtn("location") };
endEmotionBtn.onclick               = function () { handleEndBtn("emotion") };

// -------------------------------------------------------------------LABELS-------------------------------------------------------------------//

let demoLabel       = document.getElementById('demoLabel');
let activityLabel   = document.getElementById('activityLabel');
let locationLabel   = document.getElementById('locationLabel');
let emotionLabel    = document.getElementById('emotionLabel');


function changeLabel(type) {
    if (type == "activity") {
        activityLabel.textContent = utils.getActivity(activityDesc);
    }
    if (type == "location") {
        locationLabel.textContent = utils.getLocation(location);
    }
    if (type == "emotion") {
        emotionLabel.textContent = utils.getEmotion(emotion);
    }
}

// -------------------------------------------------------------------BUTTON FUNCTIONS-------------------------------------------------------------------//



function handleDemoBtn(demo, type) {
    if (demo == "begin") {
            utils.show(demographic1_popup);
    }
    if (demo == "hand") {                        // 1=right, 2=left, 3=other
            userInfo.hand = type;
            utils.hide(demographic1_popup);
            utils.show(demographic2_popup);
    }
    if (demo == "wrist") {                           // 1=right, 2=left
        userInfo.wrist = type;
        utils.hide(demographic2_popup);
        utils.show(demographic3_popup);
    }
    if (demo == "gender") {                          // 1=female, 2=male, 3=other
        userInfo.gender = type;
        utils.hide(demographic3_popup);
        utils.show(demographic4_popup);
    }
    if (demo == "height") {
        let ft = tumblerFt.getElementById("item" + tumblerFt.value).getElementById("content").text;
        let inch = tumblerIn.getElementById("item" + tumblerIn.value).getElementById("content").text;
        userInfo.height = (`${ft}'${inch}"`);
        utils.hide(demographic4_popup);
        utils.show(demographic5_popup);
    }
  if (demo == "activity") {
      let activityNum = tumblerActivities.getElementById("item" + tumblerActivities.value).getElementById("content").text;
      userInfo.dayperweek = activityNum;
      utils.hide(demographic5_popup);
      utils.show(demographic6_popup);
  }
  if (demo == "activeTime") {
      let hr = tumblerHr.getElementById("item" + tumblerHr.value).getElementById("content").text;
      let min = tumblerMin.getElementById("item" + tumblerMin.value).getElementById("content").text;
      userInfo.activeTime = (`${hr}hr${min}min`);
      utils.hide(demographic6_popup);
      utils.hide(beginBtn);
      utils.hide(demoLabel);
      console.log(JSON.stringify(userInfo));
      utils.show(document.getElementById('swipeLabel'));
      sendToCompanion(userInfo);
  }
}

function handleActivityBtn(type) {
    if (type == activityDesc && exercise.state === "stopped") {
        utils.show(activityBeginConfirm_popup);
    }
    if (type == activityDesc && exercise.state === "started") {
        utils.show(activityEndConfirm_popup);
    }
    if (type != activityDesc && exercise.state === "started") {
        utils.show(activityEndConfirm_popup);
    }
    if (type != activityDesc && exercise.state === "stopped") {
        activityDesc = type;
        utils.show(activityBeginConfirm_popup);
    }
}

function handleFallBtn(type) {
    event = type;
    utils.show(fallTypeList);
}

function handleFallTypeBtn(type) {
    fallType = type;
    utils.hide(fallTypeList);
    if (type == 3) {
        utils.show(fallConfirm);
    } else {
        utils.show(fallDescList);
    }
}

function handleFallDirectionBtn(type) {
    fallDirection = type;
    utils.hide(fallDescList);
    utils.show(fallConfirm);
}
  
function handleLocationBtn(type) {
    if (type == location && locationState == "stopped") {
        utils.show(locationBeginConfirm_popup)
    }
    if (type == location && locationState == "started") {
      utils.show(locationEndConfirm_popup);
    }
    if (type != location && locationState == "started") {
        utils.show(locationEndConfirm_popup);
    }
    if (type != location && locationState == "stopped") {
        location = type;
        utils.show(locationBeginConfirm_popup);
    }
}

function handleEmotionBtn(type) {
    if (type == emotion && emotionState == "started") {
        utils.show(emotionBeginConfirm_popup)
    }
    if (type == emotion && emotionState == "started") {
        utils.show(emotionEndConfirm_popup)
    }
    if (type != emotion && emotionState == "started") {
        utils.show(emotionEndConfirm_popup);
    }
    if (type != emotion && emotionState == "stopped") {
        emotion = type;
        utils.show(emotionBeginConfirm_popup);
    }
}

function handleEndBtn(type) {
    if (type == "activity") {
        utils.show(activityEndConfirm_popup);
    }
    if (type == "location") {
        utils.show(locationEndConfirm_popup);
    }
    if (type == "emotion") {
        utils.show(emotionEndConfirm_popup);
    }
}

function handleYesBtn(type) {
    let record = new Record();
    if (type == "fallConfirm") {
        record.event = utils.getFallEvent(event);
        if (fallType == 3) {
            record.desc = "Collapse";
        } else {
            let fallDesc = new FallDesc();
            fallDesc.type = utils.getFallType(fallType);
            fallDesc.direction = utils.getFallDirection(fallDirection);
            record.desc = fallDesc;
        }
        utils.handleNewRecord(record);
        utils.hide(fallConfirm);
    }
    
    if (type == "activityBeginConfirm") {
        record.event = "Activity";
        record.desc = (utils.getActivity(activityDesc) + ":Begin");
        utils.handleNewRecord(record);
        activityStartTime = Date.now();
        utils.show(activityClock);
        changeLabel("activity");
        utils.show(activityLabel);
        utils.show(endActivityBtn);
        exercise.start(record.desc);
        utils.hide(activityBeginConfirm_popup);
    }
    if (type == "activityEndConfirm") {
        record.event = "Activity";
        record.desc = (utils.getActivity(activityDesc) + ":End");
        utils.handleNewRecord(record);
        exercise.stop();
        activityClock.text = "00:00:00";
        utils.hide(activityLabel);
        utils.hide(endActivityBtn);
        utils.hide(activityEndConfirm_popup);
    }

    if (type == "locationBeginConfirm") {
        record.event = "Location";
        record.desc = (utils.getLocation(location) + ":Begin");
        utils.handleNewRecord(record);
        locationStartTime = Date.now();
        changeLabel("location");
        utils.show(locationLabel);
        utils.show(endLocationBtn);
        locationState = "started";
        utils.hide(locationBeginConfirm_popup);
    }
    if (type == "locationEndConfirm") {
        record.event = "Location";
        record.desc = (utils.getLocation(location) + ":End");
        utils.handleNewRecord(record);
        locationClock.text = "00:00:00";
        utils.hide(locationLabel);
        utils.hide(endLocationBtn);
        locationState = "stopped";
        utils.hide(locationEndConfirm_popup);
    }
    if (type == "emotionBeginConfirm") {
        record.event = "Emotion";
        record.desc = (utils.getEmotion(emotion) + ":Begin");
        utils.handleNewRecord(record);
        emotionStartTime = Date.now();
        changeLabel("emotion");
        utils.show(emotionLabel);
        utils.show(endEmotionBtn);
        emotionState = "started";
        utils.hide(emotionBeginConfirm_popup);
    }
    if (type == "emotionEndConfirm") {
        record.event = "Emotion";
        record.desc = (utils.getEmotion(emotion) + ":End");
        utils.handleNewRecord(record);
        emotionClock.text = "00:00:00";
        utils.hide(emotionLabel);
        utils.hide(endEmotionBtn);
        emotionState = "stopped";
        utils.hide(emotionEndConfirm_popup);
    }
}

 function handleNoBtn(type) {
    if (type == "fallConfirm") {
        utils.hide(fallConfirm);
    }
    if (type == "activityBeginConfirm") {
        utils.hide(activityBeginConfirm_popup);
        activityDesc = 0;
    }
    if (type == "activityEndConfirm") {
        utils.hide(activityEndConfirm_popup);
        activityDesc = 0;
    }
    if (type == "locationBeginConfirm") {
        utils.hide(locationBeginConfirm_popup);
        location = 0;
     }
     if (type == "locationEndConfirm") {
         utils.hide(locationEndConfirm_popup);
         location = 0;
     }
    if (type == "emotionBeginConfirm") {
        utils.hide(emotionBeginConfirm_popup);
        emotion = 0;
     }
     if (type == "emotionEndConfirm") {
         utils.hide(emotionEndConfirm_popup);
         emotion = 0;
     }
}


//-----------------------------------------------------------SENSOR OUTPUT FUNCTIONS----------------------------------------------------------//
//let sensorRecordLog = [];

function getSensorRecord() {
    let sensorRecord = new SensorRecord();
    // generates new time stamp for each new message
    var timeStamp = new Date();
    var time = timeStamp.toJSON();
   // sensorRecord.time = time;
    sensorRecord.hr = hrm.heartRate;
    sensorRecord.press = bar.pressure;
    sensorRecord.accel = accel.x +"," + accel.y +","+ accel.z;
    utils.handleNewRecord(sensorRecord);
  
    // send to companion after each record
    if (utils.getRecordLog().length >= 1) {         
        sendToCompanion(utils.getRecordLog());
        utils.clearRecordLog();
    }
  
}

function sendToCompanion(data) {
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
        // Send the data to peer as a message;
        messaging.peerSocket.send(data);
    } else {
        // Catch error
        console.error("Unable to send data from app.");
    }
}



// Message socket closes
messaging.peerSocket.onclose = () => {
    console.warn("App Socket Closed");
};