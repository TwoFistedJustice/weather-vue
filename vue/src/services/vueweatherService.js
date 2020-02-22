import vueAxiosService from './vueAxiosService.js';

export default {
  fetchWeather(location) {
    
    let route = '/weather/';
    // return vueAxiosService().get(`/weather/ ${location}`);
    return vueAxiosService().get(`${route} ${location}`);
  }
};

/* reference to path in the GET request in '/weather' is in server/src/server.js*/
