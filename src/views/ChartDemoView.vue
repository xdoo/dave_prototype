<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <heatmap-card
            height="500px"
        ></heatmap-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
          <belastungsplan-card
              height="1000px"
          ></belastungsplan-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
  import Vue from 'vue'
  import {Component} from "vue-property-decorator"

  import HeatmapCard from "@/components/charts/HeatmapCard.vue"

  import BelastungsplanCard from "@/components/charts/BelastungsplanCard.vue";

  @Component({
  components: {
    HeatmapCard,
    BelastungsplanCard
  }
})
export default class ChartDemoView extends Vue {
}
</script>