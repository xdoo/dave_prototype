<template>
  <div>
    <v-overlay :value="overlay" light :dark="false">
      <v-card
          :height="$vuetify.breakpoint.height * 0.98"
          :width="$vuetify.breakpoint.width * 0.98"
          outlined
      >

        <v-system-bar window>
          Belastung nach Zeit und Fahrzeugen
          <v-spacer/>
          <v-btn icon @click="overlay = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-system-bar>
        <v-card-text>
          Die Grafik zeigt, wieviele Fahrzeuge, wecher Art, zu welcher Zeit, die Zählstelle passiert haben. Wenn Sie mit
          der Maus über das Chart fahren, dann werden Ihnen die konkreten Zahlen angezeigt.
        </v-card-text>
        <v-row>
          <v-col cols="12" md="9">
            <v-sheet :height="$vuetify.breakpoint.height * 0.8" max-height="500">
              <step-line
                  ref="stepline"
              ></step-line>
            </v-sheet>
          </v-col>
          <v-col cols="12" md="3">
            <v-card-actions>
              <v-select
                  class="px-2"
                  v-model="node"
                  :items="nodes"
                  v-on:change="switchData()"
                  label="Knotenpunkte"
              ></v-select>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-card>
    </v-overlay>
    <v-card
        :height="height"
        :width="width"
        outlined
    >
      <v-system-bar window>
        <v-spacer/>
        <v-btn icon @click="overlay = true">
          <v-icon>mdi-window-maximize</v-icon>
        </v-btn>
      </v-system-bar>
      <v-card-title>Belastung nach Zeit und Fahrzeugen</v-card-title>
      <v-card-text>
        Die Grafik zeigt, wieviele Fahrzeuge, wecher Art, zu welcher Zeit, die Zählstelle passiert haben. Wenn Sie mit
        der Maus über das Chart fahren, dann werden Ihnen die konkreten Zahlen angezeigt.
      </v-card-text>
      <v-row>
        <v-col cols="12" md="9">
          <v-sheet :height="$vuetify.breakpoint.height * 0.8" max-height="500">
            <step-line
                ref="stepline"
            ></step-line>
          </v-sheet>
        </v-col>
        <v-col cols="12" md="3">
            <v-card-actions>
              <v-select
                  class="px-2"
                  v-model="node"
                  :items="nodes"
                  v-on:change="switchData()"
                  label="Knotenpunkte"
              ></v-select>
            </v-card-actions>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue'
  import {Component, Prop, Ref} from "vue-property-decorator"

  import StepLine from "@/components/charts/StepLine.vue"

  // import { base64ToBlob } from "base64-blob"

  @Component({
    components: {
      StepLine
    }
  })
  export default class StepLineCard extends Vue {

    node: string = "Gesamt"

    @Prop({default: "100%"}) readonly height!: string
    @Prop({default: "100%"}) readonly width!: string

    @Ref('stepline') readonly stepline!: StepLine

    overlay:boolean = false;

    get nodes() {
      return ['Gesamt', 'Donnersberger Brücke (N)', 'Donnersberger Brücke (S)', 'Fehler', 'Ereignis']
    }

    // takePicture() {
    //
    //   const b64 = this.stepline.printImage()
    //
    //   base64ToBlob(b64)
    //   .then((b) => {
    //     const name = "stepline.png"
    //     const url = URL.createObjectURL(b)
    //     const link = document.createElement('a')
    //     link.href = url
    //     link.download
    //     link.setAttribute('download', name)
    //     document.body.appendChild(link)
    //     link.click()
    //   })
    // }
  }
</script>