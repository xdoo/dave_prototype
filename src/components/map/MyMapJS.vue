<template>
  <div style="height: 500px; width: 100%">
    <l-map
        :minZoom="10"
        :bounds="bounds"
        :maxBounds="bounds"
        style="height: 500px; width: 100%"
    >
      <l-wms-tile-layer
          v-for="layer in layers"
          :key="layer.name"
          :base-url="baseUrl"
          :layers="layer.layers"
          :visible="layer.visible"
          :name="layer.name"
          layer-type="base"
      />
    </l-map>
  </div>
</template>

<script>
    import { LMap, LWMSTileLayer } from "vue2-leaflet";
    import {latLngBounds} from "leaflet";

    export default {
        name: "MyMap",
        components: {
            LMap,
            "l-wms-tile-layer": LWMSTileLayer,
        },
        data() {
            return {
                zoom: 2,
                center: [49, 12],
                baseUrl: 'https://geoportal.muenchen.de/geoserver/gsm/wms?',
                bounds: latLngBounds([
                [48.261704, 11.346126],
                [47.990074, 11.768045]
            ]),
                layers: [
                    {
                        name: 'Weather Data',
                        visible: true,
                        format: 'image/png',
                        layers: 'g_stadtkarte_gesamt',
                        transparent: true,
                        attribution: '&copy; <a href="https://www.muenchen.de/rathaus/Stadtverwaltung/Kommunalreferat/geodatenservice/geobasisdaten.html">GeodatenService München</a>'
                    }
                ]
            };
        }

    };
</script>