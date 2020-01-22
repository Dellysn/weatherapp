const key = "43f95659e0013b1364a6bd64926f8e0c";
let loader = document.getElementById("loader");
let isLoaded = false;
let errorMsg = document.querySelector("#errorMsg");
const logInputCurrentTimeAndWeather = async locationsInput => {
  try {
    //check if input argument is empty
    if (locationsInput.length < 1) {
      errorMsg.style.display = "block";
      errorMsg.textContent = "Please provide location input";
      setTimeout(() => {
        errorMsg.style.display = "none";
      }, 1000);
      return false;
    }

    // weather API call
    const response = await axios.get(
      `http://api.weatherstack.com/current?access_key=${key}&query=${locationsInput}`
    );
    // destructure API response

    const {
      location: { name, country, localtime },
      current: {
        observation_time,
        temperature,
        wind_speed,
        wind_dir,
        pressure,
        humidity,
        weather_icons,
        weather_descriptions
      }
    } = response.data;

    loader.style.display = "none";
    isLoaded = true;

    // format console responcse
    // console.log(
    //   `Weather in ${name}, ${country} local time ${localtime} is \n \t Temperature : ${temperature}℃  \n \t Observation Time : ${observation_time}  \n \t Wind Speed : ${wind_speed}  \n \t Wind Direction : ${wind_dir} \n \t Pressure : ${pressure}mbar \n \t Humidity : ${humidity}% \n`
    // );
    let output = `
    
    <li><img id="weather-icon" src="${weather_icons}"></li>
    <li>Weather Description: ${weather_descriptions}</li>
    <li>Name: ${name}</li>
    <li> Country: ${country} </li>
    <li>Local Time: ${localtime}</li>
    <li>Temperature: ${temperature}℃ </li>
    <li>Observation: ${observation_time}</li>
    <li>Wind Speed: ${wind_speed}</li>
    <li>Wind Direction: ${wind_dir}</li>
    <li>Pressure: ${pressure}mbar</li>
    <li>Humidity: ${humidity}%</li>
    
    
    
    
    
  `;
    document.getElementById("output").innerHTML = output;
  } catch (err) {
    console.error(err);
  }
};
// const locationsInput = ["New York", 10005, "Tokyo", "São Paulo", "Pluto"];
// const locationsInput = [10005]

document.addEventListener("click", function(e) {
  if (!e.target.matches("#btn")) {
    return false;
  } else {
    let searchInput = document.getElementById("search-input").value;

    logInputCurrentTimeAndWeather(searchInput);
  }
});
document.addEventListener("DOMContentLoaded", function() {
  let searchInput = document.getElementById("search-input").value;
  if (searchInput.length === 0) {
    logInputCurrentTimeAndWeather("Nigeria");
  }
});
