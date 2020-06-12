<template>
  <v-container fluid class="pa-0">
    <v-row no-gutters>
      <dummy-map></dummy-map>
    </v-row>
    <v-row>
      <v-col cols="2">
        <v-list width="100%" two-line subheader class="pt-10">
          <v-subheader></v-subheader>
          <v-list-item @click="dummyClick()">
            <v-list-item-avatar>
              <v-icon>mdi-map-marker-radius-outline</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>Zählung vom 24.12.2019 </v-list-item-title>
              <v-list-item-subtitle>Standardzählung</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="dummyClick()">
            <v-list-item-avatar>
              <v-icon>mdi-map-marker-radius-outline</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>Zählung vom 16.04.2018 </v-list-item-title>
              <v-list-item-subtitle>Querschnittzählung</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="dummyClick()">
            <v-list-item-avatar>
              <v-icon>mdi-map-marker-radius-outline</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>Zählung vom 12.08.2015 </v-list-item-title>
              <v-list-item-subtitle>Standardzählung</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="dummyClick()">
            <v-list-item-avatar>
              <v-icon>mdi-robot</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>Sensorzählung</v-list-item-title>
              <v-list-item-subtitle>---</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
      <v-col cols="10">
        <v-container class="pa-0">
          <v-row>
            <zaehlstelle-header></zaehlstelle-header>
          </v-row>
          <v-row>
            <v-container>
              <v-row>
                <v-col>
                  <heatmap-card
                    height="500px"
                  ></heatmap-card>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="12">
                  <belastungsplan-card
                      height="820"
                  ></belastungsplan-card>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="12">
                  <stepline-card
                    height="820"
                  ></stepline-card>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <line-bar-card
                      height="810">
                  </line-bar-card>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <list-card
                      height="400">
                  </list-card>
                </v-col>
              </v-row>
            </v-container>
          </v-row>
        </v-container>
      </v-col>
    </v-row>

  </v-container>
</template>
<script lang="ts">
  import Vue from 'vue'
  import {Component} from "vue-property-decorator"

  import DummyMap from "@/components/map/DummyMap.vue"

  import HeatmapCard from "@/components/charts/HeatmapCard.vue"
  import BelastungsplanCard from "@/components/charts/BelastungsplanCard.vue";
  import SteplineCard from "@/components/charts/StepLineCard.vue"
  import LineBarCard from "@/components/charts/LineBarCard.vue";
  import ZaehlstelleHeader from "@/components/zaehlstelle/ZaehlstelleHeader.vue"
  import ListCard from "@/components/charts/ListCard.vue";

  @Component({
  components: {
    HeatmapCard,
    SteplineCard,
    ZaehlstelleHeader,
    BelastungsplanCard,
    LineBarCard,
    DummyMap,
    ListCard
  }
})
export default class ChartDemoView extends Vue {

  dummyClick() {
    console.log("happy click :)")
  }

}
</script>