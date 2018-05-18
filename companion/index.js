import { settingsStorage } from "settings";
import * as messaging from "messaging";

let timeColors = settingsStorage.getItem("timeColors");


messaging.peerSocket.onopen = () => {
  console.log("Companion Socket Open");
}

messaging.peerSocket.close = () => {
  console.log("Companion Socket Closed");
}

let KEY_DATECOLOR = timeColors;
let KEY_STATSCOLOR = statsColors;

// A user changes settings
settingsStorage.onchange = evt => {
  let data = {
    key: evt.key,
    newValue: evt.newValue
  };
  sendVal(data);
};

// Restore any previously saved settings and send to the device
function restoreSettings() {
  console.log("Restoring Settings! ", settingsStorage.length + " settings to restore");
  for (let index = 0; index < settingsStorage.length; index++) {
    let key = settingsStorage.key(index);
    //console.log("restoring: " + data.key);
    if (key) {
      let data = {
        key: key,
        newValue: settingsStorage.getItem(key)
      };
      sendVal(data);
    }
  }
}

// Send data to device using Messaging API
function sendVal(data) {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send(data);
  }
}
