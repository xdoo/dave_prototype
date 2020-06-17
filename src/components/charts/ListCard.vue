<template>
  <div>
    <v-overlay :value="overlay" light :dark="false">
      <v-card
          :height="$vuetify.breakpoint.height * 0.98"
          :width="$vuetify.breakpoint.width * 0.98"
          outlined
      >
        <v-system-bar window>
          Tabellarische Darstellung
          <v-spacer/>
          <v-btn icon @click="overlay = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-system-bar>
        <v-card-text>
          Die Grafik zeigt, wieviele Fahrzeuge, wecher Art, die Zählstelle in einem Zeitintervall passiert haben.
        </v-card-text>
        <v-row>
          <v-col cols="12" md="9">
            <v-sheet :height="$vuetify.breakpoint.height * 0.8" max-height="400">
              <list
                  ref="list"
              ></list>
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
      <v-card-title>Tabellarische Darstellung</v-card-title>
      <v-card-text>
        Die Grafik zeigt, wieviele Fahrzeuge, wecher Art, die Zählstelle in einem Zeitintervall passiert haben.
      </v-card-text>
      <v-row>
        <v-col cols="12" md="9">
          <v-sheet :height="$vuetify.breakpoint.height * 0.8" max-height="250">
            <list
                ref="list"
            ></list>
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

    overlay:boolean = false;

    get nodes() {
      return ['Gesamt', 'Donnersberger Brücke (N)', 'Donnersberger Brücke (S)', 'Fehler', 'Ereignis']
    }
  }
</script>