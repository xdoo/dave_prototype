<template>
  <v-container class="ma-4">
    <v-row>
      <h1 class="heading-4 text-truncate">{{counter.counter}}</h1>
    </v-row>
    <v-row>
      <span class="font-weight-thin body-2">Stadtbezirk {{counter.districtNumber}}, {{counter.district}} <br/> Lat {{counter.lat}}, Lng {{counter.lng}} | Nr. 4711</span>
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