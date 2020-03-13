import vueAxiosService from './vueAxiosService.js';

export default {
  /* define a new function that accepts an object and sends the appropriate url to the router*/
  
  fetchWeather(location) {
    let route = '/weather/';
    return vueAxiosService().get(`${route}${location}`);
  },
  
  fetchWeather_GeoLocationAPI(coords) {
    let route = `/weatherGEO/${coords.lat}/${coords.long}`; //params
    return vueAxiosService().get(`${route}`);
  },

};
/* reference to path in the GET request in '/weather' is in server/src/server.js*/


// https://crockford.com/javascript/private.html
//http://ryanmorr.com/understanding-scope-and-context-in-javascript/
//https://modev.net/aysnchronous-operations-nodejs/
// https://medium.com/@Rahulx1/understanding-event-loop-call-stack-event-job-queue-in-javascript-63dcd2c71ecd
//https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/
