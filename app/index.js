import clock from "clock";
import document from "document";
import userActivity from "user-activity";
import { HeartRateSensor } from "heart-rate";
import { locale } from "user-settings";
import { preferences } from "user-settings";
import * as messaging from "messaging";
import * as fs from "fs";
import { me as device } from "device";
import { battery, charger } from "power";
import { me } from "appbit";

import * as util from "../common/utils";

// Update the clock every minute
clock.granularity = "seconds";
const clockPref = preferences.clockDisplay;
let lastValueTimestamp = Date.now();
if (!device.screen) device.screen = { width: 348, height: 250 };
console.log(`Dimensions: ${device.screen.width}x${device.screen.height}`);
const deviceType = "Ionic";
 if (device.screen.width == 300 && device.screen.height == 300)
deviceType = "Versa";

const SETTINGS_TYPE = "cbor";
const SETTINGS_FILE = "settings.cbor";

let timecol = json_timeread.timec || "#f8fcf8";
let othercol = json_timeread.otherc || "#f8fcf8";
var color = "white";

// Get Goals to reach
const distanceGoal = userActivity.goals.distance;
const caloriesGoal = userActivity.goals["calories"];
const stepsGoal = userActivity.goals.steps;
const elevationGoal = userActivity.goals.elevationGain;
const activeGoal = userActivity.goals.activeMinutes;

//var myBattery = document.getElementById("myBattery");
var batteryLine = document.getElementById("batteryLine");
//var myBatteryLow = document.getElementById("myBatteryLow");
var charge = document.getElementById("charge");

let myDateLabel = document.getElementById("myDateLabel");
let myClock = document.getElementById("myTime");
let dailysteps = document.getElementById("mySteps");
let dailystairs = document.getElementById("myStairs");
let dailycals = document.getElementById("myCals");
let dailymins = document.getElementById("myMins");
let stepRing = document.getElementById("stepsArc");
let stairsRing = document.getElementById("stairsArc");
let calRing = document.getElementById("calsArc");
let activeRing = document.getElementById("activeArc");


function updateStats() {
  const metricSteps = "steps";  // distance, calories, elevationGain, activeMinutes
  const amountSteps = userActivity.today.adjusted[metricSteps] || 0;
  const metricElevation = "elevationGain";
  const amountElevation = userActivity.today.adjusted[metricElevation] || 0;
  const metricCals = "calories";  // distance, calories, elevationGain, activeMinutes
  const amountCals = userActivity.today.adjusted[metricCals] || 0;
  const metricActive = "activeMinutes";
  const amountActive = userActivity.today.adjusted[metricActive] || 0;
  let stepString = amountSteps;
  let stairsString = amountElevation;
  let calString = amountCals;
  let minsString = amountActive;
  
  dailysteps.text = stepString; 
  let stepAngle = Math.floor(360*(amountSteps/stepsGoal));
  if ( stepAngle > 360 ) {
    stepAngle = 360;
    stepRing.fill="#58e078";
  }
  stepRing.sweepAngle = stepAngle;
  
  dailystairs.text = stairsString; 
  let stairsAngle = Math.floor(360*(amountElevation/elevationGoal));
  if ( stairsAngle > 360 ) {
    stairsAngle = 360;
    stairsRing.fill="#58e078";
  }
  stairsRing.sweepAngle = stairsAngle;

  dailycals.text = calString; 
  let calAngle = Math.floor(360*(amountCals/caloriesGoal));
  if ( calAngle > 360 ) {
    calAngle = 360;
    calRing.fill="#58e078";
  }
  calRing.sweepAngle = calAngle;
  
  dailymins.text = minsString; 
  let activeAngle = Math.floor(360*(amountActive/activeGoal));
  if ( activeAngle > 360 ) {
    activeAngle = 360;
    activeRing.fill="#58e078";
  }
  activeRing.sweepAngle = activeAngle;
}  

function updateClock() {
  let lang = locale.language;
  let today = new Date();
  let hours = util.formatHour(today.getHours(), clockPref);
  let mins = util.zeroPad(today.getMinutes());
  let monthnum = today.getMonth();
  let date = today.getDate();
  let day = today.getDay();
  let month = today.getMonth();
  
  myDateLabel.text = `${util.toDay(day, "short")}, ${util.toMonth(month)} ${date}`;
  myClock.text = `${hours}:${mins}`;
  updateStats();
  if ( (Date.now() - lastValueTimestamp)/1000 > 5 ) {
  }
}

//if (battery.chargeLevel > 20)
//  {myBattery.text = `${battery.chargeLevel}` + "%";}
//else
//  {myBatteryLow.text = `${battery.chargeLevel}` + "%";}


let batLengthI = Math.round((100-battery.chargeLevel)*3.48);
let batLengthV = Math.round((100-battery.chargeLevel)*3);

if (deviceType == "Ionic")
 { batteryLine.x2 = batLengthI;}
else
  {batteryLine.x2 = batLengthV;}

if (battery.chargeLevel >= 50)
  {batteryLine.style.fill="green";}
else if (battery.chargeLevel <= 49)
  {if (battery.chargeLevel > 20 )
  {batteryLine.style.fill="#ffd733";}}
else {batteryLine.style.fill="red";}


if (charger.connected == true)
   {charge.image = "charge2.png";}
  else {charge.image = "";}

// Update the clock every tick event
clock.ontick = () => updateClock();

// Don't start with a blank screen
updateClock();

messaging.peerSocket.onopen = () => {
  console.log("App Socket Open");
}

messaging.peerSocket.close = () => {
  console.log("App Socket Closed");
}
let settings = loadSettings();

messaging.peerSocket.onmessage = evt => {
  console.log(`App received: ${JSON.stringify(evt)}`);
  
  if (evt.data.key === "color" && evt.data.newValue) {
    settings.color = JSON.parse(evt.data.newValue);
    setColor();
  }
  
}

function applySettings(){
  setColor();
}

function setColor(){
  color = settings.color;
  myDateLabel.style.fill = color;
  myClock.style.fill = color;
}

me.onunload = saveSettings;

function loadSettings() {
  try {
    return fs.readFileSync(SETTINGS_FILE, SETTINGS_TYPE);
  } catch (ex) {
    // Defaults
    return {
      color : "white",
    }
  }
}
applySettings();

function saveSettings() {
  settings.noFile = false;
  fs.writeFileSync(SETTINGS_FILE, settings, SETTINGS_TYPE);
}

