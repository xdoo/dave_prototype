<template>
  <dummy-map
      height="100%"
      width="100%"
      show-marker=true
      :zoom="12"
  />
<!--  <v-container>-->
<!--    <v-layout-->
<!--        text-center-->
<!--        wrap-->
<!--    >-->
<!--      <v-flex xs12>-->
<!--        <v-img-->
<!--            :src="require('../assets/logo_dave.png')"-->
<!--            class="my-3"-->
<!--            contain-->
<!--            height="200"-->
<!--        />-->
<!--      </v-flex>-->

<!--      <v-flex mb-4>-->
<!--        <h1 class="display-2 font-weight-bold mb-3">-->
<!--          Willkommen bei DAVe-->
<!--        </h1>-->
<!--        <h2>-->
<!--          Datenbank und Auswertungen von Verkehrszählungen-->
<!--        </h2>-->
<!--        <v-btn-->
<!--            id="chart-demo-btn"-->
<!--            :to="{path: '/chartdemo'}"-->
<!--        >-->
<!--          <v-icon>mdi-google-downasaur</v-icon>-->
<!--        </v-btn>-->
<!--      </v-flex>-->
<!--    </v-layout>-->
<!--  </v-container>-->
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import DummyMap from "@/components/map/DummyMap.vue";
  import {latLng} from "leaflet";

  @Component({
    components: {DummyMap}
  })
  export default class App extends Vue {

    mounted() {
      window.scrollTo(0, 0);
    }

    get center() {
      return latLng(48.137227,11.575517);
    }

  }
</script>