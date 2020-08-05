import React, {useState, useEffect} from 'react';

import ClipLoader from "react-spinners/ClipLoader";

// import { Container } from './styles';

function Weather({city, date}) {

    const weatherKey = "36fe1373ba5d7b27e8674a870def84fc";
    const d = new Date();
    let days = new Date(date.year, date.month, date.day);
    days = Math.ceil((days-d)/86400000);
    
    const [forecast, setForecast] = useState(null);

    async function getWeather(){

        const corsUrl= "https://cors-anywhere.herokuapp.com/";
        const url = `${corsUrl}api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=${days}&appid=${weatherKey}`;
        
        try{
        const response = await fetch(url, { 
            method: 'GET',
              
            });

            const responseJson = await response.json();
            const lastWeather = responseJson.list[responseJson.list.length-1];
            const [weather] = lastWeather.weather;
            
            setForecast("Forecast: "+weather.main);
            
            
        }catch(err){
            
            setForecast("No Forecast!");
        }
    }
    

    useEffect(()=>{
        if(days>0){
            getWeather();
        }
    }, []);

  return(
      <div>
          {forecast ? forecast :<ClipLoader size={16}/>}
      </div>
  );
}

export default Weather;