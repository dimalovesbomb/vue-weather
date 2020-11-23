<template>
  <div id="app">
    <h1 class="header">Погода</h1>
    <Searchbar @select-city="pushSelectedCity"
               :initialCityName="initialCityName" />
    <Result v-if="weatherResult.length"
            @slide-change="updateUrl"
            :initialSlideIndex="initialSlideIndex"
            :weatherResult="weatherResult" />
    <router-view/>
  </div>
</template>

<script>
import Searchbar from '@/components/Searchbar';
import Result from '@/components/Result';
import Api from '@/api';

export default {
  data() {
    return {
      city: {},
      weatherResult: [],
      initialCityName: '',
      initialSlideIndex: 0,
    }
  },
  watch: {
    city(value) {
      if (value) {
        this.getWeatherByCoords(value.GeoObject.Point.pos);
      }
    },
    // weatherResult(value) {
    //   console.log(value);
    // }
  },
  mounted() {
    if ( !Object.keys(this.$route.query).length ) {
      return;
    }

    const {slideIndex} = this.$route.query;
    this.initialSlideIndex = slideIndex;

    const {lon, lat} = this.$route.query;
    this.getCityByCoords(lon, lat);
    
    const lonLatToString = [lon, lat].join(' ');
    this.getWeatherByCoords(lonLatToString);
  },
  methods: {
    pushSelectedCity(cityObj) {
      this.city = cityObj;
    },
    getWeatherByCoords(coords) {
      const [lon, lat] = coords.split(' ');
      const { url, exclude, units, lang, appId } = Api.weathermap;

      fetch(`${url}?lat=${lat}&lon=${lon}&exclude=${exclude}&units=${units}&lang=${lang}&appid=${appId}`)
        .then(res => res.json())
        .then(res => this.weatherResult = res.daily)
        .catch(error => console.error(error));
    },
    async getCityByCoords(lon, lat) {
      const { url, kind, lang, format, apikey } = Api.yandex;

      await fetch(`${url}?geocode=${lon},${lat}&kind=${kind}&lang=${lang}&format=${format}&apikey=${apikey}`)
        .then(res => res.json())
        .then(res => {
          this.initialCityName = res.response.GeoObjectCollection.featureMember[0].GeoObject.name;
          this.city = res.response.GeoObjectCollection.featureMember[0];
        })
        .catch(error => console.error(error));
    },
    updateUrl(activeSlide) {
      const [lon, lat] = this.city.GeoObject.Point.pos.split(' ');
      const url = {
        slideIndex: activeSlide,
        lon,
        lat
      };
      this.$router.push({path: '/', query: {...url}});
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

  .header {
    margin-top: 0;
    padding-top: 50px;
  }
</style>
