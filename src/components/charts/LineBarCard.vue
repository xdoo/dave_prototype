<template>
  <v-card
      :height="height"
      :width="width"
      outlined
  >
    <v-card-title>Vergleich der Belastung pro Zähldatum</v-card-title>
    <v-card-text>
      Die Grafik zeigt, wieviele Fahrzeuge, wecher Art, die Zählstelle an einem Datum passiert haben. Wenn Sie mit der
      Maus über die Abschnitte fahren, werden Ihnen die genauen Zahlen angezeigt. Fahren Sie mit der Maus unten über die
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
<!--      <v-btn-->
<!--          @click="takePicture()"-->
<!--          title="Chart als Bild herunterladen."-->
<!--          icon>-->
<!--        <v-icon>mdi-image</v-icon>-->
<!--      </v-btn>-->
<!--      <v-btn-->
<!--          title="Daten als Tabelle herunter laden."-->
<!--          icon>-->
<!--        <v-icon>mdi-table-large</v-icon>-->
<!--      </v-btn>-->
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

  // import {base64ToBlob} from "base64-blob"

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

    // takePicture() {
    //
    //   const b64 = this.linebar.printImage()
    //
    //   base64ToBlob(b64)
    //       .then((b) => {
    //         const name = "linebar.png"
    //         const url = URL.createObjectURL(b)
    //         const link = document.createElement('a')
    //         link.href = url
    //         link.download
    //         link.setAttribute('download', name)
    //         document.body.appendChild(link)
    //         link.click()
    //       })
    // }
  }
</script>