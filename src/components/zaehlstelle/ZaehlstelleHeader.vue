<template>
  <v-container class="pt-0">
    <v-row>
      <v-col class="pt-0">
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
    <v-container>
      <v-row>
        <v-col cols="5">
          <v-card
            height="100%"
            outlined
          >
            <v-card-title>Zählung vom 24.12.2019</v-card-title>
            <v-card-subtitle>Zählart XY</v-card-subtitle>
            <v-card-text>
              Es werden die Daten der Zählung vom 24.12.2019 angezeigt. Um eine andere Zähldaten anzuzeigen, bitte unten eine entsprechende Zählung auswählen.
            </v-card-text>
            <v-card-actions>
              <v-select
                v-model="zaehlung"
                :items="items"
                label="Zählung"
              ></v-select>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="2">
          <v-card 
            height="100%"
            outlined
            >
            <v-card-title>Wetter</v-card-title>
            <v-card-subtitle>leicht bewölkt</v-card-subtitle>
            <v-row justify="center">
              <v-col cols="7">
                <v-icon class="grey--text text--darken3" size="100px">mdi-weather-partly-cloudy</v-icon>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="2">
          <v-card
            height="100%"
            outlined
          >
            <v-card-title>Zähldauer</v-card-title>
            <v-card-subtitle>0 bis 24 Uhr</v-card-subtitle>
            <v-row justify="center" align="center">
              <v-col cols="8">
                <span class="display-3 font-weight-black grey--text text--darken3">24h</span>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="2">
          <v-card
            height="100%"
            outlined
          >
            <v-card-title>Knoten</v-card-title>
            <v-img 
              :src="require('@/assets/knoten.png')"
              contain
              height="150px"
            >
            </v-img>
          </v-card>
        </v-col>
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

  // Zählungen
  zaehlung: string = "24.12.2019 Standardzählung"
  items: string [] = ["24.12.2019 Standardzählung", "16.04.2018 Querschnittzählung", "12.08.2015 Standardzählung"]
}
</script>