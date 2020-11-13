<template>
  <div id="app">
    <Searchbar @select-city="pushSelectedCity" />
    <Result v-if="weatherResult.length"
            :weatherResult="weatherResult" />
    <router-view/>
  </div>
</template>

<script>
import Searchbar from '@/components/Searchbar';
import Result from '@/components/Result';

export default {
  data() {
    return {
      city: {},
      weatherResult: []
    }
  },
  watch: {
    city(value) {
      this.getWeatherByCoords(value.GeoObject.Point.pos);
    },
    weatherResult(value) {
      console.log(value);
    }
  },
  methods: {
    pushSelectedCity(cityObj) {
      this.city = cityObj;
    },
    getWeatherByCoords(coords) {
      const URL = 'https://api.openweathermap.org/data/2.5/onecall';
      const APP_ID = '09e9879c47b2100b6e33141332699804';
      const exclude = 'current,minutely,hourly,alerts';
      const units = 'metric';
      const lang = 'ru';
      const [lon, lat] = coords.split(' ');

      fetch(`${URL}?lat=${lat}&lon=${lon}&exclude=${exclude}&units=${units}&lang=${lang}&appid=${APP_ID}`)
        .then(res => res.json())
        .then(res => this.weatherResult = res.daily)
        .catch(error => console.error(error));
    }
  },
  components: {
    Searchbar, Result
  }
}
</script>

<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: white;
  }
</style>
