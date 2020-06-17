<template>
  <div id="all">
  <div id="map" style="height: 500px; width: 80%;">
    <l-map
        :options="mapOptions"
        style="height: 500px; width: 100%; z-index:0;"
        @update:center="centerUpdate"
        @update:zoom="zoomUpdate"
    >
      <l-wms-tile-layer
          v-for="layer in layers"
          :key="layer.name"
          :base-url="baseUrl"
          :layers="layer.layers"
          :visible="layer.visible"
          :name="layer.name"
          :attribution="layer.attribution"
          layer-type="base"
      />
      <l-marker v-for="zaehlstelle in zaehlstellen"
          :key="zaehlstelle.id"
          :lat-lng="calculateLatLng(zaehlstelle)">
        <l-popup>
          <div @click="innerClick(zaehlstelle)">
            Zählstelle: {{ zaehlstelle.zaehlstellennummer }}<br/>
            Zählart: {{ zaehlstelle.zaehlart }}<br/>
            Anzahl der Zählungen: {{ zaehlstelle.zaehlungen.length }} <br/>
            Letzte Zählung: {{ zaehlstelle.zaehlungen[0].zaehldatum }}
            Letzte Zählung: {{ zaehlstelle.zaehlungen[zaehlstelle.zaehlungen.length - 1].zaehldatum }}
          </div>
        </l-popup>
      </l-marker>

<!--      <l-marker :lat-lng="withPopup">-->
<!--        <l-popup>-->
<!--          <div @click="innerClick">-->
<!--            Zählstelle: 123456<br/>-->
<!--            Zählart: R<br/>-->
<!--            Anzahl der Zählungen: 5 <br/>-->
<!--            Letzte Zählung: 22.05.2020-->
<!--          </div>-->
<!--        </l-popup>-->
<!--      </l-marker>-->
    </l-map>
  </div>

<!--    <my-dialog :value="dialog" :zaehlstelle="dialogInput" @closeDialog="closeDialog"/>-->

  </div>
</template>

<script lang="ts">
  import {LMap, LWMSTileLayer, LMarker, LPopup} from "vue2-leaflet";
  // eslint-disable-next-line no-unused-vars
  import {latLng, LatLng, LatLngBounds, latLngBounds} from "leaflet";
  import {Component, Prop, Vue} from "vue-property-decorator";
  import proj4 from "proj4";
  import MyDialog from "@/components/common/MyDialog.vue";
  // eslint-disable-next-line no-unused-vars
  import ZaehlstelleSearchObject from "@/types/zaehlstelle/ZaehlstelleSearchObject";

  @Component({
    components: {LMap, 'l-wms-tile-layer': LWMSTileLayer, LMarker, LPopup, MyDialog}
  })
  export default class MyMap extends Vue {

    @Prop()
    private zaehlstellen!:ZaehlstelleSearchObject[];

    private baseUrl: string = 'https://geoportal.muenchen.de/geoserver/gsm/wms?';
    // private bounds: LatLngBounds = latLngBounds([[48.137079, 11.576006], [48.137079, 11.576006]]);
    private bounds: LatLngBounds = latLngBounds([[48.261704, 11.346126], [47.990074, 11.768045]]);

    private currentZoom: number = 15;
    private currentCenter: LatLng = latLng(48.137079, 11.576006);
    private center: LatLng = latLng(48.137079, 11.576006);
    private withPopup: LatLng = latLng(48.137079, 11.576006);
    private mapOptions: object = {
      minZoom: 10,
      maxZoom: 18,
      // center: this.center,
      // bounds: this.bounds,
      maxBounds: this.bounds,
      zoom: 10,
    };
    private layers: object[] = [
      {
        name: 'Stadtplan',
        visible: true,
        format: 'image/png',
        layers: 'g_stadtkarte_gesamt',
        transparent: true,
        attribution: '&copy; <a href="https://www.muenchen.de/rathaus/Stadtverwaltung/Kommunalreferat/geodatenservice/geobasisdaten.html">GeodatenService München</a>'
      },
    ];

    private dialog:boolean = false;
    private dialogInput:ZaehlstelleSearchObject = {} as ZaehlstelleSearchObject;

    private calculateLatLng(zaehlstelle:ZaehlstelleSearchObject):LatLng {
      const utm = "+proj=utm +zone=32";
      const lngLat = proj4(utm,'WGS84',[Number.parseInt(zaehlstelle.xkoordinate), Number.parseInt(zaehlstelle.ykoordinate)]);
      return new LatLng(lngLat[1], lngLat[0]);
    }

    private zoomUpdate(zoom: number) {
      this.currentZoom = zoom;
    }

    private centerUpdate(center: LatLng) {
      this.currentCenter = center;
    }

    private innerClick(zaehlstelle:ZaehlstelleSearchObject) {
      // this.dialog = true;
      // this.dialogInput = zaehlstelle;
      this.$emit("dialogInput", zaehlstelle);
      // alert(`${zaehlstelle.id}, ${zaehlstelle.zaehlstellennummer}, ${zaehlstelle.zaehlart}`);
      // let utm = "+proj=utm +zone=32";
      // const lngLat = proj4(utm,'WGS84',[510000, 7042000]);
      // return new LatLng(lngLat[1], lngLat[0]);
    }

    // private closeDialog() {
    //   this.dialog = false;
    //   this.dialogInput = {} as ZaehlstelleSearchObject;
    // }

  }
</script>