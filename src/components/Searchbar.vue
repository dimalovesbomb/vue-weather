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

export default {
    name: 'AutocompleteAsync',
    data: () => {
        return {
            userInput: '',
            cities: []
        }
    },
    methods: {
        requestCities(searchTerm) {
            const URL = 'https://geocode-maps.yandex.ru/1.x/';

            this.cities = new Promise(resolve => {
                if (!searchTerm || (searchTerm.length <= 2)) {
                    resolve([{GeoObject:{name: 'Type 3 or more letters', description: ''}}])
                } else {
                    fetch(`${URL}?geocode=${searchTerm}&format=json&apikey=0aa5a112-1461-4070-ae3d-31b73d94583c`)
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