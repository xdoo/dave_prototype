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
        <v-card
            height="400px"
        >
          <v-card-title>Zählung am 05.04.2016 auf der Landshuter Allee</v-card-title>
          <belastungsplan
              name="Zählung 05.04.2016"
              :data="dataBelastungsplan1"
              :color="colorBelastungsplan">
          </belastungsplan>
        </v-card>
      </v-col>
      <v-col>
        <stepline-card
          height="800px"
        ></stepline-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card
            height="400px"
        >
          <v-card-title>Zählung am 05.04.2016 auf der Landshuter Allee ohne Knotenarm 3</v-card-title>
          <belastungsplan
              name="Zählung 05.04.2016"
              :data="dataBelastungsplan2"
              :color="colorBelastungsplan">
          </belastungsplan>
        </v-card>
      </v-col>
    </v-row>
    </v-container>
  </v-container>
</template>
<script lang="ts">
  import Vue from 'vue'
  import {Component} from "vue-property-decorator"

  import HeatmapCard from "@/components/charts/HeatmapCard.vue"
  import SteplineCard from "@/components/charts/StepLineCard.vue"
  import Belastungsplan from "@/components/charts/Belastungsplan.vue"
  import ZaehlstelleHeader from "@/components/zaehlstelle/ZaehlstelleHeader.vue"

  @Component({
  components: {
    HeatmapCard,
    SteplineCard,
    Belastungsplan,
    ZaehlstelleHeader
  }
})
export default class ChartDemoView extends Vue {

  get colorBelastungsplan() {
    return ['black', 'red', 'green', 'blue', 'yellow', 'purple', 'lime', 'grey'];
  }

  get dataBelastungsplan1() {
    return[
      [202,6099,2077,1324],
      [5036,0,3282,11179],
      [983,1680,1682,7085],
      [80,10349,5028,0],
    ];
  }
  get dataBelastungsplan2() {
    return[
      [202,6099,0,1324],
      [5036,0,0,11179],
      [0,0,0,0],
      [80,10349,0,0],
    ];
  }

}
</script>