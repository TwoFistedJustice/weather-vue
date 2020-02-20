<template>
    <div>
        <h1><img alt="Vue logo" src="../assets/logo.png">eather?</h1>
        <!----><p>{{weather.message}}</p>
        <p>{{weather.name}}</p>

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