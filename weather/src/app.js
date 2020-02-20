// first goal: create a simple server that fetches some arbitrary weather
// data from Dark Sky and shoots it to the Vue App for display

const express = require ('express');
const bodyParser = require ('body-parser');
const cors = require ('cors');
const app = express ();

const geo = require ('./geo');
const weather = require ('./weather');
const interpret = require('./interpretWeather');
const places = require('./saveLocations');



let port = process.env.PORT | 8081;

app.use (bodyParser.json ());
app.use (cors ());



const getWeather = async (geoData) => {
  try {
    let weatherData = await weather.fetchWeather(geoData);
    return formatWeatherReport(weatherData);
  }
  catch (err){
    throw new Error(err);
  }
};


const formatWeatherReport = (fetchedData) => {
  
  return {
    uvHighTime: convertUnixtime (fetchedData.time.uvIndexTime),
    hottestTime: convertUnixtime (fetchedData.time.temperatureHighTime),
    hottestApparentTime: convertUnixtime (fetchedData.time.apparentTemperatureHighTime),
    uvRating: interpret.uvIndexLevel (fetchedData.daily.uvIndex),
    aqi: interpret.ozoneLevel (fetchedData.daily.aqiUS)
  };
  // console.log (`${fetchedData.name}:`);
  // console.log (`It is ${fetchedData.current.temperature} degrees, but feels like ${fetchedData.current.apparentTemperature} degrees.`);
  // console.log (`It will reach ${fetchedData.daily.temperatureHigh} degrees at ${hottestTime}.`)
  // console.log (`It will feel the hottest at ${hottestApparentTime}`);
  // console.log (`Maximum UV exposure will be ${uvRating} and will be highest at ${uvHighTime}. `);
  // console.log (`The air quality will be ${aqi}.`)
};

/*
I: a number in the form of a unix time stamp
O: a date time string localized
C: none
E: none
What this fn does: It converts unix time to human readable time in the form of hh:mm, omitting seconds.
*/
const convertUnixtime = (unix_timestamp) => {
  const date = new Date (unix_timestamp * 1000);
  return date.toLocaleTimeString ();
};

app.get ('/weather', async (req, res) => {
  
  try{
    const geoData = await geo.fetchGeoData(94112);
    const weatherReport = await getWeather(geoData);
    console.log('out',weatherReport);
    res.send(weatherReport);
  
  }
  catch (err){
    throw new Error(err)
  }
  });


app.listen (port, () => {
  console.log (`CORS enabled WEATHER server listening on ${port}`);
})