'use strict'
const todayComponent = document.querySelector("#todayComponent");
const dateComponent = document.querySelector("#dateComponent");
const locationComponent = document.querySelector("#location");
const temperature = document.querySelector("#temperature");
const iconComponent = document.querySelector("#iconComponent");
const condition = document.querySelector("#condition")
const firstIcon = document.querySelector("#firstIcon")
const secondIcon = document.querySelector("#secondIcon")
const thirdIcon = document.querySelector("#thirdIcon")
const searchInput = document.querySelector('#searchInput');
const tomorrow = document.querySelector(".day");
const iconTomorrow = document.querySelector(".icon-tomorrow");
const greatTomorrow = document.querySelector(".great");
const minorTomorrow = document.querySelector(".minor");
const tomorrowCondition = document.querySelector("#tomorrowCondition");
const dayAfterTomorrow = document.querySelector(".dayAfterTomorrow");
const iconAfterTomorrow = document.querySelector(".icon-after-tomorrow");
const greatAfterTomorrow = document.querySelector(".great-after");
const minorAfterTomorrow = document.querySelector(".minor-after");
const tomorrowAfterCondition = document.querySelector("#afterTomorrowaCondition");

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        console.log(lat, long);
        getDataFromApi(`${lat},${long}`);
    })
}
async function getDataFromApi(query) {
    let res = await fetch(`https://api.weatherapi.com/v1/forecast.json?q=${query}&days=3&key=b3e9a818e11b4dba96b190609242406`);
    let finalRes = await res.json();
    displayToday(finalRes);
    displayTomorrow(finalRes);
    displayAfterTomorrow(finalRes);
}
searchInput.addEventListener('input', function (e) {
    getDataFromApi(e.target.value);
});

function displayToday(allData) {
    let currentDate = allData.current.last_updated;
    let currentLocation = allData.location.name;
    let curretntTemp = allData.current.temp_c;
    let currentIcon = allData.current.condition.icon;
    let currentCondition = allData.current.condition.text;
    let currentHumidity = allData.current.humidity;
    let currentwindKph = allData.current.wind_kph;
    let currentwindDir = allData.current.wind_dir;
    let date = new Date(currentDate);
    let day = date.toLocaleString("en-us", { weekday: 'long' });
    let dayOfNum = date.getDate();
    let month = date.toLocaleString("en-us", { month: 'long' });
    todayComponent.innerHTML = day;
    dateComponent.innerHTML = `${dayOfNum}${month}`;
    locationComponent.innerHTML = currentLocation;
    temperature.innerHTML = `${curretntTemp}<sup>o</sup>c`;
    iconComponent.setAttribute('src', currentIcon);
    condition.innerHTML = currentCondition;
    firstIcon.innerHTML = currentHumidity;
    secondIcon.innerHTML = currentwindKph;
    thirdIcon.innerHTML = currentwindDir;
}

function displayTomorrow({ forecast }) {
    tomorrow.innerHTML = new Date(forecast.forecastday[1].date).toLocaleString('en-us', { weekday: 'long' });
    iconTomorrow.setAttribute('src', forecast.forecastday[1].day.condition.icon);
    greatTomorrow.innerHTML = `${forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>c`;
    minorTomorrow.innerHTML = `${forecast.forecastday[1].day.mintemp_c}<sup>o</sup>c`;
    tomorrowCondition.innerHTML = forecast.forecastday[1].day.condition.text;
}

function displayAfterTomorrow({ forecast }) {
    dayAfterTomorrow.innerHTML = new Date(forecast.forecastday[2].date).toLocaleString('en-us', { weekday: 'long' });
    iconAfterTomorrow.setAttribute('src', forecast.forecastday[2].day.condition.icon);
    greatAfterTomorrow.innerHTML =`${forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>c`;
    minorAfterTomorrow.innerHTML = `${forecast.forecastday[2].day.mintemp_c}<sup>o</sup>c`;
    tomorrowAfterCondition.innerHTML = forecast.forecastday[2].day.condition.text;
}