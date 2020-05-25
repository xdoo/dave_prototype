<template>
  <div style="height: 500px; width: 100%">
    <div style="height: 200px; overflow: auto;">
      <p>First marker is placed at {{ withPopup.lat }}, {{ withPopup.lng }}</p>
      <p>Center is at {{ currentCenter }} and the zoom is: {{ currentZoom }}</p>
      <button @click="showLongText">
        Toggle long popup
      </button>
      <button @click="showMap = !showMap">
        Toggle map
      </button>
    </div>
    <l-map
        v-if="showMap"
        :minZoom="10"
        :zoom="zoom"
        :center="center"
        :options="mapOptions"
        :bounds="bounds"
        :maxBounds="bounds"
        style="height: 80%"
        @update:center="centerUpdate"
        @update:zoom="zoomUpdate"
    >
      <l-tile-layer
          :url="url"
          :attribution="attribution"
      />
      <l-marker :lat-lng="withPopup">
        <l-popup>
          <div @click="innerClick">
            I am a popup
            <p v-show="showParagraph">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              sed pretium nisl, ut sagittis sapien. Sed vel sollicitudin nisi.
              Donec finibus semper metus id malesuada.
            </p>
          </div>
        </l-popup>
      </l-marker>
      <l-marker :lat-lng="withTooltip">
        <l-tooltip :options="{ permanent: true, interactive: true }">
          <div @click="innerClick">
            I am a tooltip
          </div>
        </l-tooltip>
      </l-marker>
    </l-map>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  // eslint-disable-next-line no-unused-vars
  import {LatLng, latLng, latLngBounds, LatLngBounds} from "leaflet";
  import {LMap, LMarker, LPopup, LTileLayer, LTooltip} from "vue2-leaflet";

  @Component({
    components: {LMap, LTileLayer, LMarker, LPopup, LTooltip}
  })
  export default class MyMapSimple extends Vue {

    private zoom: number = 13;
    private center: LatLng = latLng(48.138500, 11.569000);
    private url: string = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    private attribution: string = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';
    private withPopup: LatLng = latLng(48.137079, 11.576006);
    private withTooltip: LatLng = latLng(48.139609, 11.565949);
    private currentZoom: number = 11.5;
    private currentCenter: LatLng = latLng(48.137079, 11.576006);
    private showParagraph: boolean = false;
    private mapOptions: object = {
      zoomSnap: 0.5
    };
    private showMap: boolean = true;
    private bounds: LatLngBounds = latLngBounds([
      [48.261704, 11.346126],
      [47.990074, 11.768045]
    ]);

    private zoomUpdate(zoom: number) {
      this.currentZoom = zoom;
    }

    private centerUpdate(center: LatLng) {
      this.currentCenter = center;
    }

    private showLongText() {
      this.showParagraph = !this.showParagraph;
    }

    private innerClick() {
      alert("Click!");
    }

  }
</script>