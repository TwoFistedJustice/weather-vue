<template>
    <div>
        <h1>My Ubiquitous Weather App</h1>
        <div class="form-group">
            <input
                    type="text"
                    id="getLocation"
                    v-on:keyup.enter="getWeather"
                    v-model.lazy="location">
<!--            <div>-->
<!--                <p>latitude: {{coords_geoLocationAPI.lat}}</p>-->
<!--                <p>longitude: {{coords_geoLocationAPI.long}}</p>-->
<!--            </div>-->
            <button @click="getWeather">Search weather!</button>
            <button @click="getWeather_geoLocationAPI">Get weather here</button>
        </div>
        <div>
<p>{{status_geoLocationAPI}}</p>
        </div>

        <div v-if="displayReport">
            <h2>{{weather.locale.city}}, {{weather.locale.state}}</h2>
            <h3>UV Info</h3>
            <p>The highest ultra-violet level will be {{weather.appData.uvRating}} at
                {{weather.appData.uvHighTime}}</p>

            <h3>Heat Info</h3>
            <p>this can be a watched property and eliminate duplication</p>
            <p> It will be hottest at {{weather.appData.hottestTime}}. But will feel hottest at
                {{weather.appData.hottestApparentTime}}</p>
            <p></p>

            <h3>Air Quality</h3>
            <p>{{weather.appData.aqi}}</p>

            <h3>Is it 'supposed' to rain this week?</h3>
            <p>{{weather.daily.summaryWeekly}}</p>
        </div>

    </div>
</template>

<script>
  import weatherService from "../services/vueweatherService.js";

  export default {
    data () {
      return {
        coords_geoLocationAPI: {
          lat: null,
          long: null
        },
        displayReport: false,
        location: '94112',
        weather: {
          message: 'No response to our hails Captain!',

        },
        status_geoLocationAPI: null,
        options_geoLocationAPI: {
          enableHighAccuracy: false,
          timeout: 5000,
          maximumAge: 10000
        },
      };
    },
    mounted () {
      // this.fetch_Coordinates_geoLocationAPI();
      // this.getWeather();
      },
    methods: {
      error_geoLocationAPI (err) {
        if (!navigator.geolocation){
          this.status_geoLocationAPI = 'Geolocation is not supported by your browser';
        } else if (err.code === 2) {
          this.status_geoLocationAPI = 'Your browser may be blocking location services.';
          console.warn(`geoLocationAPI error! ${err.code}\n${err.message}\n`);
        } else {
          console.warn(`geoLocationAPI error! ${err.code}\n${err.message}`);
        }
      },

      successCB_geoLoctionAPI (pos) {
        this.coords_geoLocationAPI.lat = pos.coords.latitude;
        this.coords_geoLocationAPI.long = pos.coords.longitude;
        this.getWeather();
      },

      fetch_Coordinates_geoLocationAPI () {
        let success = this.successCB_geoLoctionAPI;
        let error = this.error_geoLocationAPI;
        let options = this.options_geoLocationAPI;
        navigator.geolocation.getCurrentPosition(success, error, options );
      },

      async getWeather () {
        this.displayReport = false;
        /* vueWeatherService converts the data into a Route
        *  So the job of converting the object into a usable form falls to that
        * */
        try {
          const response = await weatherService.fetchWeather (this.location)
          this.displayReport = true;
          this.weather = response.data;
        } catch (err) {
          if (err) ;
          throw new Error (err);
        }
        this.location = '';
      },

      async getWeather_geoLocationAPI () {
        this.fetch_Coordinates_geoLocationAPI();
        this.displayReport = false;
        let coords = this.coords_geoLocationAPI;
        let geo = !!coords.lat || !!coords.long;
        console.log('geo active', geo, coords);

        try {
          const response = await weatherService.fetchWeather_GeoLocationAPI(coords);
          this.displayReport = true;
          this.weather = response.data;

        } catch (err){
          if (err) ;
          throw new Error (err);
        }
        this.location = '';
      }


    }
  };

</script>