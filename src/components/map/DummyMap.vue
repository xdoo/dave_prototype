<template>
  <div :style="{
    height: this.height,
    width: this.width
  }">
    <l-map 
      ref="map"
      :zoom="zoom" 
      :center="center" 
      style="z-index: 1">
      <l-marker :lat-lng="marker1" v-if="showMarker" @click="showMe"></l-marker>
      <l-marker :lat-lng="marker2" v-if="showMarker" @click="showMe"></l-marker>
      <l-marker :lat-lng="marker3" v-if="showMarker" @click="showMe"></l-marker>
      <l-marker :lat-lng="marker" @click="showMe"></l-marker>
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
    </l-map>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import {Component, Prop} from "vue-property-decorator"

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
export default class DummyMap extends Vue {

  @Prop({default: "180px"}) readonly height!: string;
  @Prop({default: "100%"}) readonly width!: string;
  @Prop({default: 14}) zoom!: number;
  @Prop({default: latLng(48.142537,11.534742)}) center!: LatLng;


  @Prop({default: false}) readonly showMarker!: boolean;

  // Map
  // zoom: number = 14
  // center: LatLng = latLng(48.142537,11.534742)
  // center: LatLng = latLng(48.137227,11.575517)
  url: string = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  attribution: string = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'

  // Marker
  marker: LatLng = latLng(48.142537,11.534742)
  marker1: LatLng = latLng(48.134294,11.522714)
  marker2: LatLng = latLng(48.150122,11.520306)
  marker3: LatLng = latLng(48.143104,11.503206)

  private showMe() {
    this.$router.push(`/chartdemo`);
  }
}
</script>