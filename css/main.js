let today=document.getElementById("today");
let todayData=document.getElementById("todayData");
let  locationData=document.getElementById("location");
let  degree=document.getElementById("degree");
let  icon=document.getElementById("icon");
let  description=document.getElementById("description");
let  humidity=document.getElementById("humidity");
let  wind=document.getElementById("wind");
let  compass=document.getElementById("compass");
let  searchBar=document.getElementById("searchBar");
let  apiRes;
let api;
let locationSearch='london';
// today
// console.log(compass);

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let  Months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Spet", "Octber", "Novembar", "Dec"];
 let  date = new Date();

// next days
let nextDay=document.getElementsByClassName("nextDay");
let iconNext=document.getElementsByClassName("icon-next");
let maxDegree=document.getElementsByClassName("maxDegree");
let minDegree=document.getElementsByClassName("minDegree");
let nextDesc=document.getElementsByClassName("nextDesc");
// console.log(nextDesc);


searchBar.addEventListener("keyup",function () {
  let locationSearch=  searchBar.value;
  getWeather(locationSearch);
})

async function getWeather(locationSearch="london") {
     api=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=aa26f0b9fb0149889a0223027221505&q=${locationSearch}&days=3`)
     apiRes=await api.json()
    console.log(apiRes);
    displayToday()
    displayNextWeather()
}
getWeather()


function displayToday(){
    today.innerHTML=days[date.getDay()];
    todayData.innerHTML=`${date.getDate()} ${Months[date.getMonth()]} `
    locationData.innerHTML=apiRes.location.name;
    degree.innerHTML=apiRes.current.temp_c;
    icon.setAttribute("src",`https:${apiRes.current.condition.icon}`);
    description.innerHTML=apiRes.current.condition.text;
    humidity.innerHTML=apiRes.current.humidity;
    wind.innerHTML=apiRes.current.wind_kph;
    compass.innerHTML=apiRes.current.wind_dir;
}
// console.log();
function displayNextWeather(){
    for (let i = 0; i < nextDay.length; i++) {
        nextDay[i].innerHTML=days[ new Date(apiRes.forecast.forecastday[i+1].date).getDay()];
        iconNext[i].setAttribute("src",`https:${apiRes.forecast.forecastday[i+1].day.condition.icon}`)
        maxDegree[i].innerHTML=apiRes.forecast.forecastday[i+1].day.maxtemp_c;
        minDegree[i].innerHTML=apiRes.forecast.forecastday[i+1].day.mintemp_c;
        nextDesc[i].innerHTML=apiRes.forecast.forecastday[i+1].day.condition.text
    }
}
