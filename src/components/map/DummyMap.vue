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
      <l-marker
        v-for="marker in markers"
        :key="marker.lat"
        :lat-lng="createLatLng(marker.lat, marker.lng)"
        @click="showMe"
      >
        <l-tooltip :options="{
            direction: 'top'
        }">
          <div>
            <b>{{marker.counter}}</b><br/>
            Stadtbezirk: {{marker.districtNumber}} <br/>
            Anzahl der Zählungen: {{marker.countsNum}} <br/>
            Letzte Zählung: {{marker.lastCount}}  <br/>
          </div>
        </l-tooltip>
      </l-marker>
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
    </l-map>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue'
  import {Component, Prop} from "vue-property-decorator"

  // imports for leaflet
  import {LMap, LTileLayer, LMarker, LTooltip} from "vue2-leaflet"
  // eslint-disable-next-line no-unused-vars
  import {latLng, LatLng} from "leaflet"

  @Component({
    components: {
      LMap,
      LTileLayer,
      LMarker,
      LTooltip,
    }
  })
  export default class DummyMap extends Vue {

    @Prop({default: "180px"}) readonly height!: string;
    @Prop({default: "100%"}) readonly width!: string;
    @Prop({default: 12}) zoom!: number;
    @Prop({default: latLng(48.142537,11.534742)}) center!: LatLng;


    @Prop({default: false}) readonly showMarker!: boolean;

    // Map
    // zoom: number = 14
    // center: LatLng = latLng(48.142537,11.534742)
    // center: LatLng = latLng(48.137227,11.575517)
    url: string = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    attribution: string = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'

    private showMe() {
      this.$router.push(`/chartdemo`);
    }

    createLatLng(lat: string, lng: string) {
      return latLng(parseFloat(lat), parseFloat(lng))
    }

    get markers () {
      return [
        {districtNumber: '13', district: 'Bogenhausen', counter: 'Kreuzung Denninger Str. /  Vollmannstr.', streets: 'Denninger Str., Vollmannstr.', lng: '11.6261303', lat: '48.147486', countsNum: '4', lastCount: '11.07.2019', keywords: ''},
        {districtNumber: '13', district: 'Bogenhausen', counter: 'Luitpoldbrücke', streets: 'Luitpoldbrücke', lng: '11.5939997', lat: '48.141759', countsNum: '6', lastCount: '17.06.2018', keywords: 'Isar'},
        {districtNumber: '13', district: 'Bogenhausen', counter: 'Max-Joseph-Brücke', streets: 'Max-Joseph-Brücke', lng: '11.5979578', lat: '48.149204', countsNum: '3', lastCount: '20.03.2020', keywords: 'Isar'},
        {districtNumber: '13', district: 'Bogenhausen', counter: 'Truderinger Str.', streets: 'Truderinger Str.', lng: '11.6326668', lat: '48.135299', countsNum: '6', lastCount: '15.12.2019', keywords: 'Bahn'},
        {districtNumber: '13', district: 'Bogenhausen', counter: 'Effnerplatz', streets: 'Effnerplatz, Effnerstr., Bülowstr., Richard-Strauss-Str.', lng: '11.6135198', lat: '48.152782', countsNum: '8', lastCount: '12.01.2020', keywords: ''},
        {districtNumber: '8', district: 'Schwanthalerhöhe', counter: 'Donnersberger Brücke', streets: 'Donnersberger Brücke', lng: '11.5323823', lat: '48.141895', countsNum: '4', lastCount: '15.06.2019', keywords: 'Bahn'},
        {districtNumber: '8', district: 'Schwanthalerhöhe', counter: 'Kreuzung Trappentreustr. / Donnersbergerbrücke', streets: 'Trappentreustr., Donnersbergerbrücke', lng: '11.5324463', lat: '48.13994', countsNum: '5', lastCount: '11.02.2018', keywords: ''},
        {districtNumber: '8', district: 'Schwanthalerhöhe', counter: 'Kreuzung Westend- / Bergmannstr.', streets: 'Westendstr., Bergmannstr.', lng: '11.5371788', lat: '48.138163', countsNum: '7', lastCount: '11.02.2018', keywords: ''},
        {districtNumber: '8', district: 'Schwanthalerhöhe', counter: 'Kreuzung Guldein- / Astallerstr.', streets: 'Guldeinstr., Astallerstr.', lng: '11.5306388', lat: '48.138784', countsNum: '3', lastCount: '11.02.2018', keywords: ''}
      ]
    }
  }
</script>