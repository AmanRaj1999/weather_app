import React, { useState } from 'react';
import './WeatherApp.css';

import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';
import humidity_icon from '../assets/humidity.png';

const WeatherApp = () => {
    const [weatherData, setWeatherData] = useState({
        icon: cloud_icon,
        temperature: '',
        location: '',
        humidity: '',
        windSpeed: ''
    });

    const api_key = "f33bec5db7d1c2c6155c0a0d9c39c169";

    const search = async () => {
        const cityInput = document.querySelector(".cityInput");
        const cityName = cityInput.value.trim();

        if (!cityName) {
            alert("Please enter a city name.");
            return;
        }

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${api_key}`;

        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Weather data not found for this location.');
            }

            const data = await response.json();

            const { main, wind, name, weather } = data;

            setWeatherData({
                icon: getWeatherIcon(weather[0].icon),
                temperature: `${main.temp}°C`,
                location: name,
                humidity: `${Math.floor(main.humidity)}%`,
                windSpeed: `${Math.floor(wind.speed)} km/h`
            });
        } catch (error) {
            console.error('Error fetching weather data:', error.message);
            alert('Weather data not found. Please try again.');
        }
    };

    const getWeatherIcon = (iconCode) => {
        switch (iconCode) {
            case "01d":
            case "01n":
                return clear_icon;
            case "02d":
            case "02n":
            case "03d":
            case "03n":
                return cloud_icon;
            case "04d":
            case "04n":
                return drizzle_icon;        
            case "09d":
            case "09n":
            case "10d":
            case "10n":
                return rain_icon;
            case "13d":
            case "13n":
                return snow_icon;
            default:
                return clear_icon;
        }
    };

    return (
        <div className='container'>
            <div className="top-bar">
                <input type="text" className="cityInput" placeholder='Search' />
                <div className="search-icon" onClick={search}>
                    <img src={search_icon} alt="Search" />
                </div>
            </div>
            <div className="weather-image">
                <img src={weatherData.icon} alt="Weather Icon" />
            </div>
            <div className="weather-temp">{weatherData.temperature}</div>
            <div className="weather-location">{weatherData.location}</div>
            <div className="data-container">
                <div className="element">
                    <img src={humidity_icon} alt="Humidity Icon" />
                    <div className="data">
                        <div className="humidity-percent">{weatherData.humidity}</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src={wind_icon} alt="Wind Icon" />
                    <div className="data">
                        <div className="wind-rate">{weatherData.windSpeed}</div>
                        <div className="text">Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherApp;












// import React, { useState } from 'react'
// import './WeatherApp.css'

// import search_icon from '../assets/search.png';
// import clear_icon from '../assets/clear.png';
// import cloud_icon from '../assets/cloud.png';
// import drizzle_icon from '../assets/drizzle.png';
// import rain_icon from '../assets/rain.png';
// import snow_icon from '../assets/snow.png';
// import wind_icon from '../assets/wind.png';
// import humidity_icon from '../assets/humidity.png';

// const WeatherApp = () => {

    
//     const [wicon,setWicon] = useState(cloud_icon);

//     let api_key = "f33bec5db7d1c2c6155c0a0d9c39c169";
//     const search = async () => {
//         const element = document.getElementsByClassName("cityInput");
//         if(element[0].value === ""){
//             return 0;
//         }

//         let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;


//          let response =  await fetch(url);
//          let data = await response.json();
//          const humidity = document.getElementsByClassName("humidity-percent");
//          const wind = document.getElementsByClassName("wind-rate");
         
//          const tempature = document.getElementsByClassName("weather-temp");
         
//          const location = document.getElementsByClassName("weather-location");

//          humidity[0].innerHTML = data.main.humidity + "%";
//          wind[0].innerHTML = data.wind.speed + "km/h";
//          tempature[0].innerHTML = data.main.temp + "°c";
//          location[0].innerHTML = data.name;

//          if(data.weather[0].icon === "01d" || data.weather[0].icon === "01n"){
//             setWicon(clear_icon);
//          }

//          else if(data.weather[0].icon === "02d" || data.weather[0].icon === "02n"){
//             setWicon(cloud_icon);
//          }

//          else if(data.weather[0].icon === "03d" || data.weather[0].icon === "03n"){
//             setWicon(drizzle_icon);
//          }
//          else if(data.weather[0].icon === "04d" || data.weather[0].icon === "04n"){
//             setWicon(drizzle_icon);
//          }
//          else if(data.weather[0].icon === "09d" || data.weather[0].icon === "09n"){
//             setWicon(rain_icon);
//          }
//          else if(data.weather[0].icon === "10d" || data.weather[0].icon === "10n"){
//             setWicon(rain_icon);
//          }

//          else if(data.weather[0].icon === "13d" || data.weather[0].icon === "13n"){
//             setWicon(snow_icon);
//          }
//          else{
//             setWicon(clear_icon);
//          }



//     }
//   return (
//     <div className='container'>
//         <div className="top-bar">
//             <input type="text" className="cityInput" placeholder='Search' />
//             <div className="search-icon" onClick={()=>{search()}}>
//                 <img src={search_icon} alt="" />
//             </div>
//         </div>
//         <div className="weather-image">
//             <img src={wicon} alt="" />
//         </div>

//         <div className="weather-temp">24°c</div>
//         <div className="weather-location">London</div>
//         <div className="data-container">
//             <div className="element">
//                 <img src={humidity_icon} alt="" />
//                 <div className="data">
//                     <div className="humidity-percent">64%</div>
//                     <div className="text">Humdidity</div>
//                 </div>
//             </div>

//             <div className="element">
//                 <img src={wind_icon} alt="" />
//                 <div className="data">
//                     <div className="wind-rate">18 km/h</div>
//                     <div className="text">Wind Speed</div>
//                 </div>
//             </div>
//         </div>
        
//     </div>
//   )
// }

// export default WeatherApp

