<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="8" md="2">
        <v-card
            class="pa-2"
            outlined
            tile
        >
          0/0
        </v-card>
      </v-col>
      <v-col cols="8" md="4">
        <v-card
            class="pa-2"
            outlined
            tile
        >
         0/1
        </v-card>
      </v-col>
      <v-col cols="8" md="2">
        <v-card
            class="pa-2"
            outlined
            tile
        >
          0/2
        </v-card>
      </v-col>
    </v-row>
    <v-row style="height: 310px" justify="center" align="center">
      <v-col cols="8" md="2">
        <v-card
            class="pa-2"
            outlined
            tile
        >
          1/2
        </v-card>
      </v-col>
      <v-col cols="8" md="4">
        <v-card
            class="pa-2"
            outlined
            tile
            height="300px"
        >
        <v-chart
            ref="chart"
            :options="options"
             autoresize/>
        </v-card>
      </v-col>
      <v-col cols="8" md="2">
        <v-card
            class="pa-2"
            outlined
            tile
        >
          1/2
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col cols="8" md="2">
        <v-card
            class="pa-2"
            outlined
            tile
        >
          2/0
        </v-card>
      </v-col>
      <v-col cols="8" md="4">
        <v-card
            class="pa-2"
            outlined
            tile
        >
          2/1
        </v-card>
      </v-col>
      <v-col cols="8" md="2">
        <v-card
            class="pa-2"
            outlined
            tile
        >
          2/2
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">

  import {Component, Prop, Ref, Vue} from "vue-property-decorator";
  import 'echarts/lib/chart/graph';

  @Component
  export default class Belastungsplan extends Vue {

    @Prop()
    private readonly color!: string[];
    @Prop()
    private readonly data!: number [][];

    @Prop()
    private readonly name!: string

    private readonly curveness: number = 0.45;
    private readonly maxCurveness: number = 1;

    @Ref('chart') readonly chart!: any
    @Ref('plan') readonly plan!: any

    printImage() {
      return this.chart.getDataURL({type: "png", backgroundColor: '#fff'})
    }

    get options() {
      return {
        title: {
          text: 'Belastungsplan'
        },
        series: [
          {
            name: this.name,
            type: 'graph',
            layout: 'none',
            zoom: 0.8,
            symbol: 'none',
            top: 'top',
            left: 'left',
            width: 300,
            height: 300,
            // Default SymbolSize
            edgeSymbolSize: 10,
            // roam: 'scale',
            data: [
              // Source: 1
              {
                name: '1',
                x: 545,
                y: 110,
                symbol: 'circle',
                symbolSize: 25,
                label: {
                  show: true
                }
              },
              {
                name: '1s1t',
                x: 500,
                y: 100
              },
              {
                name: '1s2t',
                x: 490,
                y: 100
              },
              {
                name: '1s3t',
                x: 480,
                y: 100
              },
              {
                name: '1s4t',
                x: 470,
                y: 100
              },
              // Source: 2
              {
                name: '2',
                x: 710,
                y: 275,
                symbol: 'circle',
                symbolSize: 25,
                label: {
                  show: true
                }
              },
              {
                name: '2s1t',
                x: 720,
                y: 200
              },
              {
                name: '2s2t',
                x: 720,
                y: 230
              },
              {
                name: '2s3t',
                x: 720,
                y: 220
              },
              {
                name: '2s4t',
                x: 720,
                y: 210
              },
              // Source: 3
              {
                name: '3',
                x: 545,
                y: 440,
                symbol: 'circle',
                symbolSize: 25,
                label: {
                  show: true
                }
              },
              {
                name: '3s1t',
                x: 610,
                y: 450
              },
              {
                name: '3s2t',
                x: 620,
                y: 450
              },
              {
                name: '3s3t',
                x: 590,
                y: 450
              },
              {
                name: '3s4t',
                x: 600,
                y: 450
              },
              // Source: 4
              {
                name: '4',
                x: 380,
                y: 275,
                symbol: 'circle',
                symbolSize: 25,
                label: {
                  show: true
                }
              },
              {
                name: '4s1t',
                x: 370,
                y: 330
              },
              {
                name: '4s2t',
                x: 370,
                y: 340
              },
              {
                name: '4s3t',
                x: 370,
                y: 350
              },
              {
                name: '4s4t',
                x: 370,
                y: 320
              },
              // Target: 1
              {
                name: '1t1s',
                x: 590,
                y: 100
              },
              {
                name: '1t2s',
                x: 620,
                y: 100
              },
              {
                name: '1t3s',
                x: 610,
                y: 100
              },
              {
                name: '1t4s',
                x: 600,
                y: 100
              },
              // Target: 2
              {
                name: '2t1s',
                x: 720,
                y: 330
              },
              {
                name: '2t2s',
                x: 720,
                y: 320
              },
              {
                name: '2t3s',
                x: 720,
                y: 350
              },
              {
                name: '2t4s',
                x: 720,
                y: 340
              },
              // Target: 3
              {
                name: '3t1s',
                x: 480,
                y: 450
              },
              {
                name: '3t2s',
                x: 490,
                y: 450
              },
              {
                name: '3t3s',
                x: 500,
                y: 450
              },
              {
                name: '3t4s',
                x: 470,
                y: 450
              },
              // Target: 4
              {
                name: '4t1s',
                x: 370,
                y: 200
              },
              {
                name: '4t2s',
                x: 370,
                y: 210
              },
              {
                name: '4t3s',
                x: 370,
                y: 220
              },
              {
                name: '4t4s',
                x: 370,
                y: 230
              }
            ],
            edges: [
              // Source: 1
              {
                source: '1s1t',
                target: '1t1s',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[0][0]),
                  curveness: -this.maxCurveness,
                  color: this.color[0]
                },
                symbol: ['none', (this.data[0][0] === 0 ? 'none' : 'arrow')]
              },
              {
                source: '1s2t',
                target: '2t1s',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[0][1]),
                  curveness: -this.curveness,
                  color: this.color[0]
                },
                symbol: ['none', (this.data[0][1] === 0 ? 'none' : 'arrow')]
              },
              {
                source: '1s3t',
                target: '3t1s',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[0][2]),
                  color: this.color[0]
                },
                symbol: ['none', (this.data[0][2] === 0 ? 'none' : 'arrow')]
              },
              {
                source: '1s4t',
                target: '4t1s',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[0][3]),
                  curveness: this.curveness,
                  color: this.color[0]
                },
                symbol: ['none', (this.data[0][3] === 0 ? 'none' : 'arrow')]
              },
              // Source: 2
              {
                source: '2s1t',
                target: '1t2s',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[1][0]),
                  curveness: this.curveness,
                  color: this.color[1]
                },
                symbol: ['none', (this.data[1][0] === 0 ? 'none' : 'arrow')]
              },
              {
                source: '2s2t',
                target: '2t2s',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[1][1]),
                  curveness: -this.maxCurveness,
                  color: this.color[1]
                },
                symbol: ['none', (this.data[1][1] === 0 ? 'none' : 'arrow')]
              },
              {
                source: '2s3t',
                target: '3t2s',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[1][2]),
                  curveness: -this.curveness,
                  color: this.color[1]
                },
                symbol: ['none', (this.data[1][2] === 0 ? 'none' : 'arrow')]
              },
              {
                source: '2s4t',
                target: '4t2s',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[1][3]),
                  color: this.color[1]
                },
                symbol: ['none', (this.data[1][3] === 0 ? 'none' : 'arrow')]
              },
              // Source: 3
              {
                source: '3s1t',
                target: '1t3s',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[2][0]),
                  color: this.color[2]
                },
                symbol: ['none', (this.data[2][0] === 0 ? 'none' : 'arrow')]
              },
              {
                source: '3s2t',
                target: '2t3s',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[2][1]),
                  curveness: this.curveness,
                  color: this.color[2]
                },
                symbol: ['none', (this.data[2][1] === 0 ? 'none' : 'arrow')]
              },
              {
                source: '3s3t',
                target: '3t3s',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[2][2]),
                  curveness: -this.maxCurveness,
                  color: this.color[2]
                },
                symbol: ['none', (this.data[2][2] === 0 ? 'none' : 'arrow')]
              },
              {
                source: '3s4t',
                target: '4t3s',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[2][3]),
                  curveness: -this.curveness,
                  color: this.color[2]
                },
                symbol: ['none', (this.data[2][3] === 0 ? 'none' : 'arrow')]
              },
              // Source: 4
              {
                source: '4s1t',
                target: '1t4s',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[3][0]),
                  curveness: -this.curveness,
                  color: this.color[3]
                },
                symbol: ['none', (this.data[3][0] === 0 ? 'none' : 'arrow')]
              },
              {
                source: '4s2t',
                target: '2t4s',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[3][1]),
                  color: this.color[3]
                },
                symbol: ['none', (this.data[3][1] === 0 ? 'none' : 'arrow')]
              },
              {
                source: '4s3t',
                target: '3t4s',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[3][2]),
                  curveness: this.curveness,
                  color: this.color[3]
                },
                symbol: ['none', (this.data[3][2] === 0 ? 'none' : 'arrow')]
              },
              {
                source: '4s4t',
                target: '4t4s',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[3][3]),
                  curveness: -this.maxCurveness,
                  color: this.color[3]
                },
                symbol: ['none', (this.data[3][3] === 0 ? 'none' : 'arrow')]
              },
            ],
            lineStyle: {
              opacity: 0.9,
            }
          }
        ]
      }
    }

    private calculateLineWidth(cars: number): number {
      let maxWidth = 5;
      if (cars === 0) {
        return 0;
      }
      if (cars < 100) {
        return 1;
      }
      if (cars < 300) {
        return 1.5;
      }
      if (cars < 500) {
        return 2;
      }
      if (cars < 1000) {
        return 2.5
      }
      if (cars < 1500) {
        return 3;
      }
      if (cars < 2000) {
        return 3.5;
      }
      if (cars < 3000) {
        return 4
      }
      if (cars < 5000) {
        return 4.5;
      }
      return maxWidth;
    }

  }
</script>