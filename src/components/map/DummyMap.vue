<template>
  <div :style="{
    height: this.height,
    width: this.width
  }">
    <l-map
        ref="map"
        :zoom="zoom"
        :center="center"
        :options="mapOptions"
        style="z-index: 1">
      <l-wms-tile-layer
          base-url='https://geoportal.muenchen.de/geoserver/gsm/wms?'
          layers='g_stadtkarte_gesamt'
          :visible=true
          name="Stadtplan"
          attribution='&copy; <a href="https://www.muenchen.de/rathaus/Stadtverwaltung/Kommunalreferat/geodatenservice/geobasisdaten.html">GeodatenService München</a>'
          layer-type="base"
      />
    </l-map>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue'
  import {Component, Prop, Ref} from "vue-property-decorator"

  import CounterService from "@/services/CounterService"

  // imports for leaflet
  import {LMap, LTileLayer, LWMSTileLayer, LMarker, LTooltip} from "vue2-leaflet"
  // eslint-disable-next-line no-unused-vars
  import {latLng, LatLng, Map, Marker, TileLayer} from "leaflet"
  // eslint-disable-next-line no-unused-vars
  import Counter from "@/types/Counter";

  @Component({
    components: {
      LMap,
      LTileLayer,
      LMarker,
      LTooltip,
      'l-wms-tile-layer': LWMSTileLayer,
    }
  })
  export default class DummyMap extends Vue {

    @Prop({default: "180px"}) readonly height!: string;
    @Prop({default: "100%"}) readonly width!: string;
    @Prop({default: 12}) zoom!: number;
    //@Prop({default: latLng(48.142537,11.534742)}) center!: LatLng;

    @Prop() selectedMarkerId!: string

    @Prop({default: false}) readonly showMarker!: boolean;

    @Ref('map') readonly mymap!: LMap

    private mapOptions: object = {
      minZoom: 10,
      maxZoom: 18,
    };

    // Map
    // zoom: number = 14
    // center: LatLng = latLng(48.142537,11.534742)
    // center: LatLng = latLng(48.137227,11.575517)
    url: string = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    attribution: string = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'

    mounted() {
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
        if(this.selectedMarkerId === undefined) {
          mymarkers.addLayer(marker)
        } else {
          marker.addTo(this.mymap.mapObject);
        }


      });
      if(this.selectedMarkerId === undefined) {
        this.mymap.mapObject.addLayer(mymarkers);
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

    get counters (): any[] {
      return CounterService.counters()
    }
  }
</script>