<template>
    <v-card
    :height="height"
    :width="width"
    outlined
  > 
    <v-card-title>Nutzung über 24 Stunden</v-card-title>
    <v-card-text>
      Die Grafik zeigt, wieviele Fahrzeuge, wecher Art, zu welcher Zeit, die Zählstelle passiert haben. Wenn Sie mit der Maus über die Abschnitte fahren, werden Ihnen die genauen Zahlen angezeigt. Fahren Sie mit der Maus unten über die Legende, so werden die Abschnitte hervorgehoben, die zur Farbe passen.
    </v-card-text>
    <v-card-actions>
        <v-select
          class="px-2"
          v-model="node"
          :items="nodes"
          v-on:change="switchData()"
          label="Knotenpunkte"
        ></v-select>
        <v-btn
          @click="takePicture()"
          title="Chart als Bild herunterladen." 
          icon>
          <v-icon>mdi-image</v-icon>
        </v-btn>
        <v-btn 
          title="Daten als Tabelle herunter laden."
          icon>
          <v-icon>mdi-table-large</v-icon>
        </v-btn>
    </v-card-actions>
    <step-line
      ref="stepline"
    ></step-line>
  </v-card>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Ref } from "vue-property-decorator"

import StepLine from "@/components/charts/StepLine.vue"

import { base64ToBlob } from "base64-blob"

@Component({
  components: {
    StepLine
  }
})
export default class StepLineCard extends Vue {
   
  @Prop({default: "100%"}) readonly height!: string
  @Prop({default: "100%"}) readonly width!: string

  @Ref('stepline') readonly stepline!: StepLine


  takePicture() {

    const b64 = this.stepline.printImage()
    
    base64ToBlob(b64)
    .then((b) => {
      const name = "stepline.png"
      const url = URL.createObjectURL(b)
      const link = document.createElement('a')
      link.href = url
      link.download
      link.setAttribute('download', name)
      document.body.appendChild(link)
      link.click()
    })
  }
}
</script>