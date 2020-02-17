import ajax from './ajax.js';

export default {
  fetchWeather() {
    return ajax().get('/weather');
  }
};