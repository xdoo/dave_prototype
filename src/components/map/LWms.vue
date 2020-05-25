<template>
  <div/>
</template>

<script>
    import {findRealParent, propsBinder} from 'vue2-leaflet';
    import * as L from 'leaflet';
    import 'leaflet.nontiledlayer';


    const props = {
        url: {
            type: String
        },
        options: {
            type: Object,
            default() {
                return {};
            },
        },
    };

    export default {
        mounted() {
            props,
                this.mapObject = L.nonTiledLayer.wms(this.url, this.options);
            L.DomEvent.on(this.mapObject, this.$listeners);
            propsBinder(this, this.mapObject, props);
            this.parentContainer = findRealParent(this.$parent);
            this.parentContainer.addLayer(this);
        }

    }
</script>