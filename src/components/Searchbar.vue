<template>
    <div class="center">
        <section>
            <md-autocomplete
                class="search"
                v-model="userInput"
                :md-options="cities"
                @input="requestCities"
                
                md-layout="box"
                md-dense>
                <label>Search</label>
                <template slot="md-autocomplete-item" slot-scope="{item}">{{item.GeoObject.name}}</template>
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
                    resolve([{GeoObject:{name: 'Type 3 or more letters'}}])
                } else {
                    fetch(`${URL}?geocode=${searchTerm}&format=json&apikey=0aa5a112-1461-4070-ae3d-31b73d94583c`)
                        .then(res => res.json())
                        .then(payload => resolve(payload.response.GeoObjectCollection.featureMember))
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>

    .center {
        display: flex;
        justify-content: center;
        width: 100%;
        margin-top: 10vh;
    }
    .search {
        width: 500px;
    }


</style>