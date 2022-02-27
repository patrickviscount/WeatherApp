
const api = {
  key: "0e8b2c4e5a41d2b3b81897c77b9e4d88",
  baseurl: "https://api.openweathermap.org/data/2.5"
}

window.addEventListener('load', (event) => {
  navigator.geolocation.getCurrentPosition(sucessfulLookup, defaultLocation);
});

const searchbox = document.querySelector('.search-box');
if(searchbox) {
  searchbox.addEventListener('keypress', setQuery);
}

function setQuery(evt) {
    if(evt.keyCode == 13) {
    getResults(searchbox.value);
    }
}

function defaultLocation() {
  getResults("Wolfville");
}

async function sucessfulLookup(position) {
  const {latitude, longitude } = position.coords;
  const location = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=ce0f52510fee4b78ac9a3641ff2eee49`).then(responce => responce.json());
  const userLocation = location.results[0].formatted.split(",")[1];
  getResults(userLocation);
};

function getResults(query) {

  fetch(`${api.baseurl}/weather?q=${query}&units=metric&APPID=${api.key}`)
  .then(weather => {
    return weather.json();
  }).then(displayResults);
}

function backgroundImageSelector(time, temp) {
  if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    if (time < 8 || time > 19) {
      document.querySelector('body').style.backgroundImage = 'url(https://cdn.dribbble.com/users/925716/screenshots/3333720/attachments/722375/night.png)';
      let workLocation = document.querySelector('.wouldIGo');
      workLocation.innerHTML = `I'd work online, it's too late to go in!`;
    }
    else {
      if(temp > 4) {
        document.querySelector('body').style.backgroundImage = 'url(https://cdn.dribbble.com/users/925716/screenshots/3333720/attachments/722376/after_noon.png)';
        let workLocation = document.querySelector('.wouldIGo');
        workLocation.innerHTML = `Perfect day to go into the office!`;
      }
      else {
        document.querySelector('body').style.backgroundImage = 'url(https://wallpaperaccess.com/full/1093718.jpg)';
        let workLocation = document.querySelector('.wouldIGo');
        workLocation.innerHTML = `I'd work online, it's too cold outside!`;
      }
    }
  }
  else{
    if (time < 8 || time > 19) {
      document.querySelector('body').style.backgroundImage = 'url(https://wallpaperaccess.com/full/121188.jpg)';
      let workLocation = document.querySelector('.wouldIGo');
      workLocation.innerHTML = `I'd work online, it's too late to go in!`;
    }
    else {
      if(temp > 1) {
        document.querySelector('body').style.backgroundImage = 'url(https://cdn.wallpapersafari.com/1/89/QOiHx5.jpg)';
        let workLocation = document.querySelector('.wouldIGo');
        workLocation.innerHTML = `Perfect day to go into the office!`;
      }
      else {
        document.querySelector('body').style.backgroundImage = 'url(https://cdn.wallpapersafari.com/58/99/9bAkfd.jpg)';
        let workLocation = document.querySelector('.wouldIGo');
        workLocation.innerHTML = `I'd work online, it's too cold outside!`;
      }
    }
  }
}

function displayResults (weather) {

  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  var time = now.getHours();

  backgroundImageSelector(time, weather.main.temp);

  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `${weather.main.temp_min} °c / ${weather.main.temp_max} °c`;
}

function dateBuilder (d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();
  
  return `${day} ${date} ${month} ${year}`;
}