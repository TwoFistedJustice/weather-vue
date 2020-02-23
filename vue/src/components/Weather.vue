<template>
    <div>
        <h1>Add an auto location grab</h1>
        <div class="form-group">
            <input
                    type="text"
                    id="getLocation"
                    v-on:keyup.enter="getWeather"
                    v-model.lazy="location">
            <button @click="getWeather">Get my weather!</button>
        </div>

        <div v-if="displayReport">
            <h2>{{weather.name}}</h2>
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
        displayReport: false,
        location: '',
        weather: {
          message: 'No response to our hails Captain!',

        }
      };
    },
    mounted () {
      // this.getWeather(this.location);
      this.getWeather ();
    },
    methods: {
      // async getWeatherOLD (location) {
      //   try {
      //     const response = await weatherService.fetchWeather (location);
      //     this.displayReport = true;
      //     this.weather = response.data;
      //   } catch (err) {
      //     if (err) ;
      //     throw new Error (err);
      //   }
      //
      // },
      async getWeather () {
        this.displayReport = false;
        try {
          const response = await weatherService.fetchWeather (this.location);
          this.displayReport = true;
          this.weather = response.data;
        } catch (err) {
          if (err) ;
          throw new Error (err);
        }
        this.location = '';
      }
    }
  };

</script>