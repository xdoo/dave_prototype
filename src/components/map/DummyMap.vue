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
        :key="marker.id"
        :lat-lng="createLatLng(marker.lat, marker.lng)"
        :options="options(marker.id)"
        @click="showMe(marker.id)"
      >
        <l-tooltip :options="{
            direction: 'top'
        }">
          <div>
            <b>{{marker.counter}}</b><br/>
            Stadtbezirk: {{marker.districtNumber}} <br/>
            Anzahl der Zählungen: {{marker.countsNum}} <br/>
            Letzte Zählung: {{marker.lastCount}}  <br/>
            Grund d. Zählung: {{marker.reason}}
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

  import CounterService from "@/services/CounterService"

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
    //@Prop({default: latLng(48.142537,11.534742)}) center!: LatLng;

    @Prop() selectedMarkerId!: string

    @Prop({default: false}) readonly showMarker!: boolean;

    // Map
    // zoom: number = 14
    // center: LatLng = latLng(48.142537,11.534742)
    // center: LatLng = latLng(48.137227,11.575517)
    url: string = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    attribution: string = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'

    private showMe(id: string) {
      this.$router.push("/chartdemo/" + id);
    }

    get center() {
      if(this.selectedMarkerId) {
        const c = CounterService.counterById(this.selectedMarkerId)
        if(c) {
          return this.createLatLng(c.lat, c.lng)
        } else {
          // Mitte von München
          return this.createLatLng("48.137227","11.575517")
        }
      } else {
        // Mitte von München
        return this.createLatLng("48.137227","11.575517")
      }
    }

    createLatLng(lat: string, lng: string) {
      return latLng(parseFloat(lat), parseFloat(lng))
    }

    options(id: string) {
      if(this.selectedMarkerId) {
        if(this.selectedMarkerId === id) {
          return {opacity: 1.0}
        } else {
          return {opacity: 0.5}
        }
      }
    }

    get markers () {
      const dummyresult = this.$store.getters["search/dummyresult"]
      if(Array.isArray(dummyresult)) {
        if (dummyresult.length > 0 && !this.selectedMarkerId) {
          return this.counters.filter(counter => dummyresult.includes(parseInt(counter.id)))
        } else {
          return this.counters
        }
      } else {
        console.log("no array")
        return this.counters
      }
    }

    get counters (): any[] {
      return CounterService.counters()
    }
  }
</script>