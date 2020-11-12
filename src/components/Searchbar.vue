<template>
    <section>
    <md-autocomplete
      v-model="selectedCity"
      :md-options="cities"
      md-layout="box"
      md-dense>
      <label>Search</label>
    </md-autocomplete>

    </section>
</template>

<script>
// import { MdAutocomplete } from 'vue-material/dist/components';
export default {
    name: 'AutocompleteBox',
    data: () => {
        return {
            selectedCity: null,
            cities: ['Sochi', 'Moscow', 'Tel-Aviv', 'Beijing']
        }
    },
    // components: {
    //     MdAutocomplete
    // }
}
</script>

<style lang="scss">
    .search {
        max-width: 500px;
    }


</style>