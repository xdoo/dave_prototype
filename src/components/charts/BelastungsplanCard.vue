<template>
  <div>
    <v-overlay :value="overlay" light :dark="false">
      <v-card
          :height="$vuetify.breakpoint.height * 0.98"
          :width="$vuetify.breakpoint.width * 0.98"
          outlined
      >
      <v-system-bar>
        Belastung nach Knotenarmen
        <v-spacer/>
        <v-btn icon @click="overlay = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-system-bar>
      <v-row>
        <v-col cols="12" md="9">
          <v-sheet :height="$vuetify.breakpoint.height * 0.8" max-height="500">
            <belastungsplan
                ref="belastungsplan"
                name="Zählung 05.04.2016"
                :data="data"
                :streets="streets"
                :visibleNodes="visibleNodes"
                :color="color">
            </belastungsplan>
          </v-sheet>
        </v-col>
        <v-col cols="12" md="3">
          <v-row>
          <v-card-actions>
            <v-select
                class="px-2"
                v-model="nodes"
                :items="defaultNodes"
                multiple
                dense
                small-chips
                :deletable-chips="nodes.length > 2"
                v-on:change="switchNumberOfNodes()"
                label="Knotenarme"
            ></v-select>
          </v-card-actions>
          </v-row>
<!--          <v-row>-->
<!--            <v-card-actions>-->
<!--                    <v-select-->
<!--                        class="px-2"-->
<!--                        v-model="colorNode"-->
<!--                        :items="colorNodes"-->
<!--                        v-on:change="switchColor()"-->
<!--                        label="Knotenarme"-->
<!--                        dense-->
<!--                    ></v-select>-->
<!--            </v-card-actions>-->
<!--          </v-row>-->
          <v-row>
            <v-card-actions>
              <v-select
                  class="px-2"
                  v-model="fahrzeugklasse"
                  :items="fahrzeugklassen"
                  v-on:change="switchFahrzeugklasse()"
                  label="Fahrzeugklassen"
                  dense
              ></v-select>
            </v-card-actions>
          </v-row>
        </v-col>
      </v-row>
      </v-card>
    </v-overlay>
    <v-card
        :height="height"
        :width="width"
        outlined
    >
      <v-system-bar>
        <v-spacer/>
        <v-btn icon @click="overlay = true">
          <v-icon>mdi-window-maximize</v-icon>
        </v-btn>
      </v-system-bar>
      <v-card-title>Belastung nach Knotenarmen</v-card-title>
      <v-card-text>
        Die Grafik zeigt, wie viele Fahrzeuge der gewählten Kategorien in welche Richtung gefahren sind.
      </v-card-text>
      <v-row>
        <v-col cols="12" md="9">
          <v-sheet :height="$vuetify.breakpoint.height * 0.8" max-height="500">
            <belastungsplan
                ref="belastungsplan"
                name="Zählung 05.04.2016"
                :data="data"
                :streets="streets"
                :visibleNodes="visibleNodes"
                :color="color">
            </belastungsplan>
          </v-sheet>
        </v-col>
        <v-col cols="12" md="3">
          <v-row>
            <v-card-actions>
              <v-select
                  class="px-2"
                  v-model="nodes"
                  :items="defaultNodes"
                  multiple
                  dense
                  small-chips
                  :deletable-chips="nodes.length > 2"
                  v-on:change="switchNumberOfNodes()"
                  label="Knotenarme"
              ></v-select>
            </v-card-actions>
          </v-row>
          <!--          <v-row>-->
          <!--            <v-card-actions>-->
          <!--                    <v-select-->
          <!--                        class="px-2"-->
          <!--                        v-model="colorNode"-->
          <!--                        :items="colorNodes"-->
          <!--                        v-on:change="switchColor()"-->
          <!--                        label="Knotenarme"-->
          <!--                        dense-->
          <!--                    ></v-select>-->
          <!--            </v-card-actions>-->
          <!--          </v-row>-->
          <v-row>
            <v-card-actions>
              <v-select
                  class="px-2"
                  v-model="fahrzeugklasse"
                  :items="fahrzeugklassen"
                  v-on:change="switchFahrzeugklasse()"
                  label="Fahrzeugklassen"
                  dense
              ></v-select>
            </v-card-actions>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue'
  import {Component, Prop, Ref} from "vue-property-decorator"

  import Belastungsplan from "@/components/charts/Belastungsplan.vue";

  import {cloneDeep} from 'lodash';

  // import {base64ToBlob} from "base64-blob"

  @Component({
    components: {
      Belastungsplan
    }
  })
  export default class BelastungsplanCard extends Vue {

    colorNode: string = this.colorNodes[0];
    nodes: string[] = ['Knotenarm1', 'Knotenarm2', 'Knotenarm3', 'Knotenarm4', 'Knotenarm7']
    fahrzeugklasse: string = this.fahrzeugklassen[0];
    data: number [][] = cloneDeep(this.dataKraftfahrzeugverkehr);
    color:string[] = this.colorBelastungsplan;
    visibleNodes:boolean[] = [true,true,true,true,false,false,false,false,];

    @Prop({default: "100%"}) readonly height!: string
    @Prop({default: "100%"}) readonly width!: string

    @Ref('belastungsplan') readonly belastungsplan!: Belastungsplan

    overlay:boolean = false;
    height2: string = "600"
    width2: string = "1000"

    mounted() {
      this.switchNumberOfNodes();
    }

    switchColor() {
      // HACK !!!
      // Alle Knotenarme
      if (this.colorNode === this.colorNodes[0]) {
        this.color = this.colorBelastungsplan;
      }
      // Nur Knotenarm1
      if (this.colorNode === this.colorNodes[1]) {
        this.color = ['black', 'grey', 'grey', 'grey', 'grey', 'grey', 'grey', 'grey'];
      }
      // Nur Knotenarm2
      if (this.colorNode === this.colorNodes[2]) {
        this.color = ['grey', 'red', 'grey', 'grey', 'grey', 'grey', 'grey', 'grey'];
      }
      // Nur Knotenarm3
      if (this.colorNode === this.colorNodes[3]) {
        this.color = ['grey', 'grey', 'green', 'grey', 'grey', 'grey', 'grey', 'grey'];
      }
      // Nur Knotenarm4
      if (this.colorNode === this.colorNodes[4]) {
        this.color = ['grey', 'grey', 'grey', 'blue', 'grey', 'grey', 'grey', 'grey'];
      }
      // Nur Knotenarm5
      if (this.colorNode === this.colorNodes[5]) {
        this.color = ['grey', 'grey', 'grey', 'grey', 'lime', 'grey', 'grey', 'grey'];
      }
      // Nur Knotenarm6
      if (this.colorNode === this.colorNodes[6]) {
        this.color = ['grey', 'grey', 'grey', 'grey', 'grey', 'purple', 'grey', 'grey'];
      }
      // Nur Knotenarm7
      if (this.colorNode === this.colorNodes[7]) {
        this.color = ['grey', 'grey', 'grey', 'grey', 'grey', 'grey', 'orange', 'grey'];
      }
      // Nur Knotenarm8
      if (this.colorNode === this.colorNodes[8]) {
        this.color = ['grey', 'grey', 'grey', 'grey', 'grey', 'grey', 'grey', 'brown'];
      }
    }

    switchNumberOfNodes() {

      this.resetData();

      let missingNodes:string[] = cloneDeep(this.defaultNodes);
      for(let node of this.nodes) {
          // Wenn vorhanden, dann aus missingNodes entfernen
          missingNodes = missingNodes.filter(el => el !== node);
      }
      let newData:any[] = cloneDeep(this.data);
      let matrix: number[][] = [[1,1,1,1,1,1,1,1], [1,1,1,1,1,1,1,1], [1,1,1,1,1,1,1,1], [1,1,1,1,1,1,1,1], [1,1,1,1,1,1,1,1], [1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1], [1,1,1,1,1,1,1,1]];
      this.visibleNodes = [true,true,true,true,true,true,true,true];
      for(let node of missingNodes) {
        if(node === this.defaultNodes[0]) {
          this.visibleNodes[0] = false;
          matrix[0] = [0,0,0,0,0,0,0,0];
          matrix[1][0] = 0;
          matrix[2][0] = 0;
          matrix[3][0] = 0;
          matrix[4][0] = 0;
          matrix[5][0] = 0;
          matrix[6][0] = 0;
          matrix[7][0] = 0;
        }
        if(node === this.defaultNodes[1]) {
          this.visibleNodes[1] = false;
          matrix[0][1] = 0;
          matrix[1] = [0,0,0,0,0,0,0,0];
          matrix[2][1] = 0;
          matrix[3][1] = 0;
          matrix[4][1] = 0;
          matrix[5][1] = 0;
          matrix[6][1] = 0;
          matrix[7][1] = 0;
        }
        if(node === this.defaultNodes[2]) {
          this.visibleNodes[2] = false;
          matrix[0][2] = 0;
          matrix[1][2] = 0;
          matrix[2] = [0,0,0,0,0,0,0,0];
          matrix[3][2] = 0;
          matrix[4][2] = 0;
          matrix[5][2] = 0;
          matrix[6][2] = 0;
          matrix[7][2] = 0;
        }
        if(node === this.defaultNodes[3]) {
          this.visibleNodes[3] = false;
          matrix[0][3] = 0;
          matrix[1][3] = 0;
          matrix[2][3] = 0;
          matrix[3] = [0,0,0,0,0,0,0,0];
          matrix[4][3] = 0;
          matrix[5][3] = 0;
          matrix[6][3] = 0;
          matrix[7][3] = 0;
        }
        if(node === this.defaultNodes[4]) {
          this.visibleNodes[4] = false;
          matrix[0][4] = 0;
          matrix[1][4] = 0;
          matrix[2][4] = 0;
          matrix[3][4] = 0;
          matrix[4] = [0,0,0,0,0,0,0,0];
          matrix[5][4] = 0;
          matrix[6][4] = 0;
          matrix[7][4] = 0;
        }
        if(node === this.defaultNodes[5]) {
          this.visibleNodes[5] = false;
          matrix[0][5] = 0;
          matrix[1][5] = 0;
          matrix[2][5] = 0;
          matrix[3][5] = 0;
          matrix[4][5] = 0;
          matrix[5] = [0,0,0,0,0,0,0,0];
          matrix[6][5] = 0;
          matrix[7][5] = 0;
        }
        if(node === this.defaultNodes[6]) {
          this.visibleNodes[6] = false;
          matrix[0][6] = 0;
          matrix[1][6] = 0;
          matrix[2][6] = 0;
          matrix[3][6] = 0;
          matrix[4][6] = 0;
          matrix[5][6] = 0;
          matrix[6] = [0,0,0,0,0,0,0,0];
          matrix[7][6] = 0;
        }
        if(node === this.defaultNodes[7]) {
          this.visibleNodes[7] = false;
          matrix[0][7] = 0;
          matrix[1][7] = 0;
          matrix[2][7] = 0;
          matrix[3][7] = 0;
          matrix[4][7] = 0;
          matrix[5][7] = 0;
          matrix[6][7] = 0;
          matrix[7] = [0,0,0,0,0,0,0,0];
        }
      }
      for(let index1=0; index1 < 8; index1++) {
        for(let index2=0; index2 < 8; index2++) {
          this.data[index1].splice(index2, 1, newData[index1][index2]*matrix[index1][index2]);
        }
      }
    }

    switchFahrzeugklasse() {
      // HACK !!!
      if (this.fahrzeugklasse === this.fahrzeugklassen[0]) {
        this.data = cloneDeep(this.dataKraftfahrzeugverkehr);
      }

      if (this.fahrzeugklasse === this.fahrzeugklassen[1]) {
        this.data = cloneDeep(this.dataSchwerverkehr);
      }

      if (this.fahrzeugklasse === this.fahrzeugklassen[2]) {
        this.data = cloneDeep(this.dataGueterverkehr);
      }

      this.switchNumberOfNodes();
    }

    resetData() {
      // HACK !!!
      if (this.fahrzeugklasse === this.fahrzeugklassen[0]) {
        this.data = cloneDeep(this.dataKraftfahrzeugverkehr);
      }

      if (this.fahrzeugklasse === this.fahrzeugklassen[1]) {
        this.data = cloneDeep(this.dataSchwerverkehr);
      }

      if (this.fahrzeugklasse === this.fahrzeugklassen[2]) {
        this.data = cloneDeep(this.dataGueterverkehr);
      }
    }

    get streets() {
      return ['Straße 1', 'Straße 2', 'Straße 3', 'Straße 4', 'Straße 5', 'Straße 6', 'Straße 7', 'Straße 8'];
    }

    get colorNodes() {
      return ['Gesamt','Knotenarm1', 'Knotenarm2', 'Knotenarm3', 'Knotenarm4','Knotenarm5', 'Knotenarm6', 'Knotenarm7', 'Knotenarm8']
    }

    get defaultNodes() {
      return ['Knotenarm1', 'Knotenarm2', 'Knotenarm3', 'Knotenarm4', 'Knotenarm5', 'Knotenarm6', 'Knotenarm7', 'Knotenarm8']
    }

    get fahrzeugklassen() {
      return ['Kraftfahrzeugverkehr', 'Schwerverkehr', 'Güterverkehr']
    }

    get colorBelastungsplan() {
      return ['black', 'red', 'green', 'blue', 'lime', 'purple', 'orange', 'brown'];
    }

    get dataKraftfahrzeugverkehr() {
      return [
        [202, 6099, 2077, 1324, 202, 6099, 2077, 1324],
        [5036, 0, 3282, 11179, 5036, 0, 3282, 11179],
        [983, 1680, 1682, 7085, 983, 1680, 1682, 7085],
        [80, 10349, 5028, 0, 80, 10349, 5028, 0],
        [202, 6099, 2077, 1324, 202, 6099, 2077, 1324],
        [5036, 0, 3282, 11179, 5036, 0, 3282, 11179],
        [983, 1680, 1682, 7085, 983, 1680, 1682, 7085],
        [80, 10349, 5028, 0, 80, 10349, 5028, 0],
      ];
    }

    get dataSchwerverkehr() {
      return [
        [0, 584, 165, 756, 0, 584, 165, 756],
        [43, 0, 187, 1965, 43, 0, 187, 1965],
        [456, 751, 0, 964, 456, 751, 0, 964],
        [23, 2489, 753, 0, 23, 2489, 753, 0],
        [0, 584, 165, 756, 0, 584, 165, 756],
        [43, 0, 187, 1965, 43, 0, 187, 1965],
        [456, 751, 0, 964, 456, 751, 0, 964],
        [23, 2489, 753, 0, 23, 2489, 753, 0],
      ];
    }

    get dataGueterverkehr() {
      return [
        [0, 2452, 343, 232, 0, 2452, 343, 232],
        [745, 1, 365, 785, 745, 1, 365, 785],
        [761, 683, 0, 347,761, 683, 0, 347],
        [42, 1936, 765, 3, 42, 1936, 765, 3],
        [0, 2452, 343, 232, 0, 2452, 343, 232],
        [745, 1, 365, 785, 745, 1, 365, 785],
        [761, 683, 0, 347,761, 683, 0, 347],
        [42, 1936, 765, 3, 42, 1936, 765, 3],
      ];
    }



  }
</script>