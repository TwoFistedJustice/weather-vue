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

// dev constants
const fs = require('fs');
const stringify = require('json-stringify-safe');


let port = process.env.PORT | 8081;

app.use (bodyParser.json ());
app.use (cors ());


//todo this has same name as function in Weather.vue, change one of them
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

const fsCB = (err, data) => {
  if (err) {
    console.log('Error writing request to file from weather app');
  }
  console.log('Writing request to file');
};

const stringData = (req) => {
  let fieldBreak = '\n\n**************** NEw REQUEST ****************';
  let url = '\nurl: ' + stringify (req.url, null, 2);;
  let route = '\nroute: ' + stringify (req.route, null, 2);
  let params = '\nparams: ' + stringify (req.params, null, 2);
  return `${fieldBreak}${url}${route}${params}`;
  
};

const visualizeAppDataLog = (req) => {
  console.log(stringData(req));
};


// This function will will block the event loop and prevent the GET request
// from completing. Use it, manual debugging only, and then delete call.
const visualizeAppDataFile = (req) => {
  fs.appendFileSync ('request.json',stringData(req), fsCB);
};



app.get ('/weather/:loc', async (req, res) => {
  
  // when typed by user it comes in as a string
  let location = req.params.loc;
  
  //geoData is in the form: { name: 'San Francisco', lat: 37.720647, lng: -122.442853 }
  try {
  // todo make fs append the newest log to the top of the file so I don't have to scroll
      if (req) {
        visualizeAppDataLog(req);
        // visualizeAppDataFile(req)
      }
    const geoData = await geo.fetchGeoData (location);
    const weatherReport = await getWeather (geoData);
    
    res.send (weatherReport);
  }
  catch (err){
    throw new Error(err)
  }
  });


app.listen (port, () => {
  console.log (`CORS enabled WEATHER server listening on ${port}`);
})