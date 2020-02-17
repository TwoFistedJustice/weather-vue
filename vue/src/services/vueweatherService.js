import vueAxiosService from './vueAxiosService.js';

export default {
  fetchWeather() {
    return vueAxiosService().get('/weather');
  }
};

/*
* reference to path in the GET request in '/weather' is in server/src/server.js
* */