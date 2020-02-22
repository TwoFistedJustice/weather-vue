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

// this function is important because it converts unix time to people time
const formatWeatherReport = (fetchedData) => {
  
  Object.defineProperties(fetchedData, {
    appData: {
      value: {
        uvHighTime: convertUnixtime (fetchedData.time.uvIndexTime),
        hottestTime: convertUnixtime (fetchedData.time.temperatureHighTime),
        hottestApparentTime: convertUnixtime (fetchedData.time.apparentTemperatureHighTime),
        uvRating: interpret.uvIndexLevel (fetchedData.daily.uvIndex),
        aqi: interpret.ozoneLevel (fetchedData.daily.aqiUS),
      },
      enumerable: true,
      writable: true
    }
  });
  return fetchedData;
  
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

app.get ('/weather/:loc', async (req, res) => {
  let location = req.params.loc;
  console.dir(req.params.loc);
  // console.log(req.params.loc.zip);
  try{
    // const geoData = await geo.fetchGeoData(94112);
    const geoData = await geo.fetchGeoData(location);
    const weatherReport = await getWeather(geoData);
    // console.log('out',weatherReport);
    res.send(weatherReport);
  
  }
  catch (err){
    throw new Error(err)
  }
  });


app.listen (port, () => {
  console.log (`CORS enabled WEATHER server listening on ${port}`);
})