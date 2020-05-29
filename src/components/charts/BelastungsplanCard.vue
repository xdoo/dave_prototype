<template>
  <v-card
      :height="height"
      :width="width"
      outlined
  >
    <v-card-title>Belastung nach Knotenarmen</v-card-title>
    <v-card-text>
      Die Grafik zeigt, wie viele Fahrzeuge der gewählten Kategorien in welche Richtung gefahren sind.
    </v-card-text>
    <v-card-actions>
      <v-select
          class="px-2"
          v-model="node"
          :items="nodes"
          v-on:change="switchColor()"
          label="Knotenarme"
      ></v-select>
      <v-select
          class="px-2"
          v-model="fahrzeugklasse"
          :items="fahrzeugklassen"
          v-on:change="switchFahrzeugklasse()"
          label="Fahrzeugklassen"
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
    <v-sheet height="72%">
      <belastungsplan
          ref="belastungsplan"
          name="Zählung 05.04.2016"
          :data="data"
          :color="color">
      </belastungsplan>
    </v-sheet>
  </v-card>
</template>
<script lang="ts">
  import Vue from 'vue'
  import {Component, Prop, Ref} from "vue-property-decorator"

  import Belastungsplan from "@/components/charts/Belastungsplan.vue";

  import {base64ToBlob} from "base64-blob"

  @Component({
    components: {
      Belastungsplan
    }
  })
  export default class BelastungsplanCard extends Vue {

    // node: string[] = this.nodes;
    node: string = this.nodes[0];
    fahrzeugklasse: string = this.fahrzeugklassen[0];
    data: number [][] = this.dataKraftfahrzeugverkehr;
    color:string[] = this.colorBelastungsplan;

    @Prop({default: "100%"}) readonly height!: string
    @Prop({default: "100%"}) readonly width!: string

    @Ref('belastungsplan') readonly belastungsplan!: Belastungsplan

    takePicture() {

      const b64 = this.belastungsplan.printImage()

      base64ToBlob(b64)
          .then((b) => {
            const name = "belastungsplan_" + this.node.toLowerCase() + ".png"
            const url = URL.createObjectURL(b)
            const link = document.createElement('a')
            link.href = url
            link.download
            link.setAttribute('download', name)
            document.body.appendChild(link)
            link.click()
          })
    }


    switchColor() {
      // HACK !!!
      // Alle Knotenarme
      if (this.node === this.nodes[0]) {
        this.color = this.colorBelastungsplan;
      }
      // Nur Knotenarm1
      if (this.node === this.nodes[1]) {
        this.color = ['black', 'grey', 'grey', 'grey', 'grey', 'grey', 'grey', 'grey'];
      }
      // Nur Knotenarm2
      if (this.node === this.nodes[2]) {
        this.color = ['grey', 'red', 'grey', 'grey', 'grey', 'grey', 'grey', 'grey'];
      }
      // Nur Knotenarm3
      if (this.node === this.nodes[3]) {
        this.color = ['grey', 'grey', 'green', 'grey', 'grey', 'grey', 'grey', 'grey'];
      }
      // Nur Knotenarm4
      if (this.node === this.nodes[4]) {
        this.color = ['grey', 'grey', 'grey', 'blue', 'grey', 'grey', 'grey', 'grey'];
      }
    }

    switchFahrzeugklasse() {
      // HACK !!!
      if (this.fahrzeugklasse === this.fahrzeugklassen[0]) {
        this.data = this.dataKraftfahrzeugverkehr;
      }

      if (this.fahrzeugklasse === this.fahrzeugklassen[1]) {
        this.data = this.dataSchwerverkehr
      }

      if (this.fahrzeugklasse === this.fahrzeugklassen[2]) {
        this.data = this.dataGueterverkehr
      }
    }

    get nodes() {
      return ['Gesamt','Knotenarm1', 'Knotenarm2', 'Knotenarm3', 'Knotenarm4']
    }

    get fahrzeugklassen() {
      return ['Kraftfahrzeugverkehr', 'Schwerverkehr', 'Güterverkehr']
    }

    get colorBelastungsplan() {
      return ['black', 'red', 'green', 'blue', 'yellow', 'purple', 'lime', 'grey'];
    }

    get dataKraftfahrzeugverkehr() {
      return [
        [202, 6099, 2077, 1324],
        [5036, 0, 3282, 11179],
        [983, 1680, 1682, 7085],
        [80, 10349, 5028, 0],
      ];
    }

    get dataSchwerverkehr() {
      return [
        [0, 584, 165, 756],
        [43, 0, 187, 1965],
        [456, 751, 0, 964],
        [23, 2489, 753, 0],
      ];
    }

    get dataGueterverkehr() {
      return [
        [0, 2452, 343, 232],
        [745, 1, 365, 785],
        [761, 683, 0, 347],
        [42, 1936, 765, 3],
      ];
    }



  }
</script>