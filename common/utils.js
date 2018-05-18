// Add zero in front of numbers < 10
export function zeroPad(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

//Month and Day Stuff

let months = [
  "Jan", 
  "Feb", 
  "Mar", 
  "Apr", 
  "May", 
  "June", 
  "July", 
  "Aug", 
  "Sept", 
  "Oct",
  "Nov",
  "Dec",
  
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
]

let days = [ 
  "Sun", 
  "Mon", 
  "Tues", 
  "Wed", 
  "Thurs", 
  "Fri", 
  "Sat",
  
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
]

export function toMonth(month, len = "short") {
  if (len == "long"){
    month += 12;
  }
  return months[month];
}

export function toDay(day, len = "short") {
  day = day%7;
  if (len == "long"){
    day += 7;
  }
  return days[day];
}


// Simulate mono-fonts
export function monoDigits(digits) {
  var ret = "";
  var str = digits.toString();
  for (var index = 0; index < str.length; index++ ) {
    var num = str.charAt(index);
    ret = ret.concat(hex2a("0x1" + num));
  }
  return ret;
}

export function hex2a(hex) {
  var str = "";
  for (var index = 0; index < hex.length; index += 2 ) {
    var val = parseInt(hex.substr(index, 2), 16);
    if (val) str += String.fromCharCode(val);
  }
  return str.toString();
}

//Formats the hour based on the user pref
export function formatHour(hour, clockPref) {
  if (clockPref == '12h'){
    if(hour > 12) {
      hour -= 12;
    } else if(hour == 0) {
      hour = "12";
    }
  }
  return hour;
}

export function hexcolor(colString) {
  var correct = true;
  let newString = colString.match(/#[0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f]/i);
  if ( newString == null || newString[0].length != 7){
    console.log(newString + " not correct, length: " + newString[0].length);
    correct = false;
  }
  return correct;
}

//Localisation for Day and Month; the switch seems to be slower than the array...
export var weekday = {
	de: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
	da: ["sø", "ma", "ti", "on", "to", "fr", "lø"],
	en: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
	es: ["do", "lu", "ma", "mi", "ju", "vi", "sá"],
	fr: ["di", "lu", "ma", "me", "je", "ve", "sa"],
	nl: ["zo", "ma", "di", "wo", "do", "vr", "za"],
	it: ["do", "lu", "ma", "me", "gi", "ve", "sa"],
	pt: ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"],
	pl: ["N", "Pn", "Wt", "Śr", "Cz", "Pt", "So"],
  sv: ["sö", "må", "ti", "on", "to", "fr", "lö"],
  ja: ["日", "月", "火", "水", "木", "金", "土"],
  ko: ["일", "월", "화", "수", "목", "금", "토"],
  zh: ["日", "一", "二", "三", "四", "五", "六"]
};