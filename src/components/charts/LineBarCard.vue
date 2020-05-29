<template>
  <v-card
      :height="height"
      :width="width"
      outlined
  >
    <v-card-title>Vergleich der Belastung pro Zähldatum</v-card-title>
    <v-card-text>
      Die Grafik zeigt, wieviele Fahrzeuge, wecher Art, die Zählstelle an einem Datum passiert haben. Wenn Sie mit der
      Maus über die Abschnitte fahren, werden Ihnen die genauen Zahlen angezeigt. Fahren Sie mit der Maus oben über die
      Legende, so werden die Abschnitte hervorgehoben, die zur Farbe passen.
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
      <line-bar
          ref="linebar"
      ></line-bar>
    </v-sheet>
  </v-card>
</template>
<script lang="ts">
  import Vue from 'vue'
  import {Component, Prop, Ref} from "vue-property-decorator"

  import LineBar from "@/components/charts/LineBar.vue";

  @Component({
    components: {
      LineBar
    }
  })
  export default class LineBarCard extends Vue {

    node: string = "Gesamt"

    @Prop({default: "100%"}) readonly height!: string
    @Prop({default: "100%"}) readonly width!: string

    @Ref('linebar') readonly linebar!: LineBar

    get nodes() {
      return ['Gesamt', 'Donnersberger Brücke (N)', 'Donnersberger Brücke (S)', 'Fehler', 'Ereignis']
    }
  }
</script>