<template>
  <v-container class="pa-0">
    <v-row>
      <v-col class="pa-0">
        <div style="height: 180px; width: 100%;">
          <l-map 
            ref="map"
            :zoom="zoom" 
            :center="center" 
            style="z-index: 1">
            <l-marker :lat-lng="marker"></l-marker>
            <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
          </l-map>
        </div>
      </v-col>
    </v-row>
    <v-container class="pa-10">
      <v-row>
        <h1 class="display-2">Zählstelle Donnersberger Brücke</h1>
      </v-row>
      <v-row>
        <span class="font-weight-thin body-2">Stadtbezirk 8, Schwanthalerhöhe | 48.142537, 11.534742 | Nr. 4711</span>
      </v-row>
    </v-container>
</v-container>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component } from "vue-property-decorator"

// imports for leaflet
import {LMap, LTileLayer, LMarker} from "vue2-leaflet"
// eslint-disable-next-line no-unused-vars
import {latLng, LatLng} from "leaflet"

@Component({
  components: {
    LMap,
    LTileLayer,
    LMarker
  }
})
export default class ZaehlstelleHeader extends Vue {

  // Map
  zoom: number = 14
  center: LatLng = latLng(48.142537,11.534742)
  url: string = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  attribution: string = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'

  // Marker
  marker: LatLng = latLng(48.142537,11.534742)
}
</script>