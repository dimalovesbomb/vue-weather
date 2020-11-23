<template>
    <div class="center">
        <section>
            <md-autocomplete
                class="search"
                v-model="userInput"
                :md-options="cities"
                @md-changed="requestCities"
                @md-selected="onSelectCity"
                md-layout="box"
                md-dense>
                <label>Search</label>
                <template slot="md-autocomplete-item" slot-scope="{item}">{{`${item.GeoObject.name}, ${item.GeoObject.description}`}}</template>
            </md-autocomplete>
        </section>
    </div>
</template>

<script>
import Api from '@/api';
export default {
    name: 'AutocompleteAsync',
    data: () => {
        return {
            userInput: '',
            cities: []
        }
    },
    beforeMount() {
        if (Object.keys(this.$route.query).length) {
            const { lon, lat } = this.$route.query;
            const { url, kind, lang, format, apikey } = Api.yandex;
            
            fetch(`${url}?geocode=${lon},${lat}&kind=${kind}&lang=${lang}&format=${format}&apikey=${apikey}`)
                .then(res => res.json())
                .then(res => {
                    this.userInput = res.response.GeoObjectCollection.featureMember[0].GeoObject.name;
                })
                .catch(error => console.error(error));
        }
    },
    methods: {
        requestCities(searchTerm) {
            const { url, format, apikey } = Api.yandex;

            this.cities = new Promise(resolve => {
                if (!searchTerm || (searchTerm.length <= 2)) {
                    resolve([{GeoObject:{name: 'Type 3 or more letters', description: ''}}])
                } else {
                    fetch(`${url}?geocode=${searchTerm}&format=${format}&apikey=${apikey}`)
                        .then(res => res.json())
                        .then(payload => resolve(payload.response.GeoObjectCollection.featureMember))
                        .catch(error => console.error(error));
                }
            })
        },
        onSelectCity(object) {
            this.userInput = object.GeoObject.name;

            this.$emit('select-city', object);
        }
    }
}
</script>

<style lang="scss" scoped>

    .center {
        display: flex;
        justify-content: center;
        width: 100%;
        padding-top: 10vh;
    }
    .search {
        width: 700px;
    }


</style>