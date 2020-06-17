<template>
  <div id="mapid" :style="{
    height: this.height,
    width: this.width
  }">
  </div>
</template>
<script lang="ts">
  import Vue from 'vue'
  import {Component, Prop} from "vue-property-decorator"

  import CounterService from "@/services/CounterService"

  // eslint-disable-next-line no-unused-vars
  import {latLng, Map, Marker, TileLayer} from 'leaflet'
  // eslint-disable-next-line no-unused-vars
  import Counter from "@/types/Counter";

  import 'leaflet.markercluster';

  @Component
  export default class DummyMap extends Vue {

    @Prop({default: "180px"}) readonly height!: string;
    @Prop({default: "100%"}) readonly width!: string;
    @Prop({default: 12}) zoom!: number;
    //@Prop({default: latLng(48.142537,11.534742)}) center!: LatLng;

    @Prop() selectedMarkerId!: string

    @Prop({default: false}) readonly showMarker!: boolean;

    mounted() {
      let map = new Map('mapid', {center: this.center, zoom: this.zoom});
      let wmsLayer = new TileLayer.WMS('https://geoportal.muenchen.de/geoserver/gsm/wms?', {
        layers: 'g_stadtkarte_gesamt',
        attribution:'&copy; <a href="https://www.muenchen.de/rathaus/Stadtverwaltung/Kommunalreferat/geodatenservice/geobasisdaten.html">GeodatenService München</a>',
      })
      map.addLayer(wmsLayer);

      const L = window['L'];

      const mymarkers = L.markerClusterGroup();

      const markers1:Counter[] = this.markers;
      markers1.forEach(mark => {
        let marker = new Marker(this.createLatLng(mark.lat, mark.lng), this.options(mark.id));
            marker.bindTooltip(`<div>`
                + `<b>${mark.counter}</b><br/>`
                + `Stadtbezirk: ${mark.districtNumber} <br/>`
                + `Anzahl der Zählungen: ${mark.countsNum} <br/>`
                + `Letzte Zählung: ${mark.lastCount}  <br/>`
                + `Grund d. Zählung: ${mark.reason}`
                + `</div>`,
                {direction: "top"});
            marker.on('click', () => {
              this.showMe(mark.id);
            });
            if(this.selectedMarkerId !== "") {
              mymarkers.addLayer(marker)
            } else {
              marker.addTo(map);
            }


      });
      if(this.selectedMarkerId !== "") {
        map.addLayer(mymarkers);
      }
    }

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

    get counters (): Counter[] {
      return CounterService.counters()
    }
  }
</script>