<template>
  <v-card
      :height="height"
      :width="width"
      outlined
  >
    <v-card-title>Tabellarische Darstellung</v-card-title>
    <v-card-text>
      Die Grafik zeigt, wieviele Fahrzeuge, wecher Art, die Zählstelle in einem Zeitintervall passiert haben.
    </v-card-text>
    <v-card-actions>
      <v-select
          class="px-2"
          v-model="node"
          :items="nodes"
          v-on:change="switchData()"
          label="Knotenpunkte"
      ></v-select>
    </v-card-actions>
    <v-sheet height="72%">
      <list
          ref="list"
      ></list>
    </v-sheet>
  </v-card>
</template>
<script lang="ts">
  import Vue from 'vue'
  import {Component, Prop, Ref} from "vue-property-decorator"

  import List from "@/components/charts/List.vue";

  @Component({
    components: {
      List
    }
  })
  export default class ListCard extends Vue {

    node: string = "Gesamt"

    @Prop({default: "100%"}) readonly height!: string
    @Prop({default: "100%"}) readonly width!: string

    @Ref('list') readonly list!: List

    get nodes() {
      return ['Gesamt', 'Donnersberger Brücke (N)', 'Donnersberger Brücke (S)', 'Fehler', 'Ereignis']
    }
  }
</script>