<template>
    <v-container class="py-10">
      <v-row>
        <h1 class="display-2">{{counter.counter}}</h1>
      </v-row>
      <v-row>
        <span class="font-weight-thin body-2">Stadtbezirk {{counter.districtNumber}}, {{counter.district}} | {{counter.lat}}, {{counter.lng}} | Nr. 4711</span>
      </v-row>
      <v-row>
    
    <v-container>
      <v-row>
        <v-col cols="6">
          <v-card
            height="100%"
            outlined
          >
            <v-card-title>Zählung vom 24.12.2019</v-card-title>
            <v-card-subtitle>Zählart XY</v-card-subtitle>
            <v-card-text>
              Es werden die Daten der Zählung vom 24.12.2019 angezeigt. Um eine andere Zähldaten anzuzeigen, bitte unten eine entsprechende Zählung auswählen. Die Änderung wirkt sich auf die komplette Seite aus!
            </v-card-text>
            <v-card-actions>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="2">
          <v-card 
            height="100%"
            outlined
            >
            <v-card-title>Wetter</v-card-title>
            <v-card-subtitle>leicht bewölkt</v-card-subtitle>
            <v-row justify="center">
              <v-col cols="7">
                <v-icon class="grey--text text--darken3" size="100px">mdi-weather-partly-cloudy</v-icon>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="2">
          <v-card
            height="100%"
            outlined
          >
            <v-card-title>Zähldauer</v-card-title>
            <v-card-subtitle>0 bis 24 Uhr</v-card-subtitle>
            <v-row justify="center" align="center">
              <v-col cols="8">
                <span class="display-3 font-weight-black grey--text text--darken3">24h</span>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="2">
          <v-card
            height="100%"
            outlined
          >
            <v-card-title>Knoten</v-card-title>
            <v-img 
              :src="require('@/assets/knoten.png')"
              contain
              height="150px"
            >
            </v-img>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
      </v-row>
      </v-container>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from "vue-property-decorator"

import CounterService from "@/services/CounterService"

@Component
export default class ZaehlstelleHeader extends Vue {

  @Prop() readonly counterId!: string

  // Zählungen
  zaehlung: string = "24.12.2019 Standardzählung"
  items: string [] = ["24.12.2019 Standardzählung", "16.04.2018 Querschnittzählung", "12.08.2015 Standardzählung"]


  get counter() {
    return CounterService.counterById(this.counterId)
  }

}
</script>