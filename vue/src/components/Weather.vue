<template>
    <div>
        <h1><img alt="Vue logo" src="../assets/logo.png">eather?</h1>
        <p>{{weather.message}}</p>

    </div>
</template>

<script>
    import weatherService from "../services/weatherService.js";

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
          alert(response.data.message)
          this.weather = response.data;
        }
      }
    };

</script>