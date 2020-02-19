import vueAxiosService from './vueAxiosService.js';
// const argv = require('../../../weather/app/app.js');
import argv from '../../../weather/app/app.js';

export default {
  fetchWeather() {
    alert(argv);
    return vueAxiosService().get('/weather');
  }
};

/*
* reference to path in the GET request in '/weather' is in server/src/server.js
* */