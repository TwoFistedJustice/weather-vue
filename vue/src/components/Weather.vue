<template>
    <div>
        <h1><img alt="Vue logo" src="../assets/logo.png">eather?</h1>
        <h3>UV Info</h3>
        <p>The highest ultra-violet level will be {{weather.appData.uvRating}} at {{weather.appData.uvHighTime}}</p>

        <h3>Heat Info</h3>
        <p>this can be a watched property and eliminate duplication</p>
        <p> It will be hottest at {{weather.appData.hottestTime}}. But will feel hottest at {{weather.appData.hottestApparentTime}}</p>
        <p></p>

        <h3>Air Quality</h3>
        <p>{{weather.appData.aqi}}</p>

        <h3>Is it 'supposed' to rain this week?</h3>
        <p>{{weather.daily.summaryWeekly}}</p>



    </div>
</template>

<script>
    import weatherService from "../services/vueweatherService.js";

    export default {
      data () {
        return {
          weather: {
            message: 'No response to our hails Captain!'
          }
        };
      },
      mounted(){
        this.getWeather();
      },
      methods: {
        async getWeather () {
          const response = await weatherService.fetchWeather();
          this.weather = response.data;
        }
      }
    };

</script>