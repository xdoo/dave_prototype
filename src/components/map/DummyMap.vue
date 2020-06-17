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
      <l-marker :lat-lng="marker1" v-if="showMarker" @click="showMe">
        <l-tooltip :options="{
            direction: 'top'
        }">
          <div>
            Zählstelle: Westend<br/>
            Stadtbezirk: 14 <br/>
            Anzahl der Zählungen: 1 <br/>
            Letzte Zählung: 27.02.2020  <br/>
          </div>
        </l-tooltip>
      </l-marker>
      <l-marker :lat-lng="marker2" v-if="showMarker" @click="showMe">
        <l-tooltip :options="{
            direction: 'top'
        }">
          <div>
            Zählstelle: Steubenplatz<br/>
            Stadtbezirk: 12 <br/>
            Anzahl der Zählungen: 5 <br/>
            Letzte Zählung: 13.05.2020  <br/>
          </div>
        </l-tooltip>
      </l-marker>
      <l-marker :lat-lng="marker3" v-if="showMarker" @click="showMe">
        <l-tooltip :options="{
            direction: 'top'
        }">
          <div>
            Zählstelle: Laimerunterführung<br/>
            Stadtbezirk: 8 <br/>
            Anzahl der Zählungen: 2 <br/>
            Letzte Zählung: 02.07.2018  <br/>
          </div>
        </l-tooltip>
      </l-marker>
      <l-marker :lat-lng="marker" @click="showMe">
        <l-tooltip :options="{
            direction: 'top'
        }">
          <div>
            Zählstelle: Donnersberger Brücke<br/>
            Stadtbezirk: 8 <br/>
            Anzahl der Zählungen: 4 <br/>
            Letzte Zählung: 24.12.2019  <br/>
          </div>
        </l-tooltip>
      </l-marker>
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
  import {Component, Prop} from "vue-property-decorator"

  // imports for leaflet
  import {LMap, LTileLayer, LWMSTileLayer, LMarker, LTooltip} from "vue2-leaflet"
  // eslint-disable-next-line no-unused-vars
  import {latLng, LatLng} from "leaflet"

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