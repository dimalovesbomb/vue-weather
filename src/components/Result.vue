<template>
    <section class="result">
          <swiper class="swiper" ref="mySwiper" :options="swiperOptions">
            <swiper-slide :key="slide.name" v-for="slide in weatherResult">
                <p>{{slide.td * 1000}}</p>
                <p>{{slide.weather[0].main}}</p>
                <p>{{slide.temp.day}}</p>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </section>
</template>

<script>
  export default {
    props: {
        weatherResult: {
            type: Array
        }
    },
    data() {
      return {
        slides: [],
        swiperOptions: {
            slidesPerView : 4,
            slidesPerGroup: 1,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        },
        on: {
            progress: swiper => swiper.updateSlides()
        }
      }
    },
    computed: {
        swiper() {
            return this.$refs.mySwiper.$swiper
        }
    },
    mounted() {
        setTimeout(() => this.slides = [{name:'1', desc: 'a1'},{name:'2', desc: 'a2'},{name:'3', desc: 'a3'},{name:'4', desc: 'a4'},{name:'5', desc: 'a5'},{name:'6', desc: 'a6'},], 1000);
        console.log('Current Swiper instance object', this.swiper);
        console.log(this.props);
        this.swiper.slideTo(1, 1000, false)
    }
  }
</script>

<style lang="scss" scoped>
.result {
    margin-top: 200px;
}

.swiper {
    position: relative;
    max-width: 1170px;
    padding-bottom: 100px;

    .swiper-pagination {
        top: 120px;
        .swiper-pagination-bullet {
            width: 35px !important;
            height: 5px !important;
            border-radius: 5px !important;
        }

        .swiper-pagination-bullet-active {
            opacity: 1;
            background: #ff6633 !important;
        }
    }
}


</style>

