<template>
  <v-container fluid class="pa-0">
    <v-row>
      <zaehlstelle-header></zaehlstelle-header>
    </v-row>
    <v-container>
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
      <v-col>
        <stepline-card
          height="810"
        ></stepline-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>

      </v-col>
    </v-row>
    </v-container>
  </v-container>
</template>
<script lang="ts">
  import Vue from 'vue'
  import {Component} from "vue-property-decorator"

  import HeatmapCard from "@/components/charts/HeatmapCard.vue"

  import BelastungsplanCard from "@/components/charts/BelastungsplanCard.vue";
  import SteplineCard from "@/components/charts/StepLineCard.vue"
  import ZaehlstelleHeader from "@/components/zaehlstelle/ZaehlstelleHeader.vue"

  @Component({
  components: {
    HeatmapCard,
    SteplineCard,
    ZaehlstelleHeader,
    BelastungsplanCard,
  }
})
export default class ChartDemoView extends Vue {
}
</script>