<template>
  <v-sheet 
    ref="container"
    width="100%"
    height="100%">
    <v-chart
        ref="chart"
        :initOptions="initOptions"
        :options="options"
        autoresize/>
  </v-sheet>
</template>
<style>
.echarts {
  width: 100%;
  height: 100%;
}
</style>
<script lang="ts">

  import {Component, Prop, Ref, Vue} from "vue-property-decorator";
  import 'echarts/lib/chart/graph';
  import 'echarts/lib/component/toolbox'
  import 'echarts/lib/component/tooltip'


  @Component
  export default class Belastungsplan extends Vue {

    @Prop()
    private readonly color!: string[];
    @Prop()
    private readonly data!: number [][];
    @Prop()
    private readonly visibleNodes!:boolean[];
    @Prop()
    private readonly streets!: string[];
    @Prop()
    private readonly name!: string;

    private readonly curveness02: number = 0.2;
    private readonly curveness022: number = 0.22;
    private readonly curveness045: number = 0.45;
    private readonly curveness039: number = 0.39;
    private readonly curveness05: number = 0.5;
    private readonly curveness06: number = 0.6;
    private readonly maxCurveness: number = 1;

    @Ref('chart') readonly chart!: any
    @Ref('container') readonly container!: HTMLDivElement

    get initOptions() {
      return {
        dom: this.container
      }
    }

    get options() {
      return {
        tooltip: {
          trigger: 'item',
          show: false
        },
        toolbox: {
          showTitle: false,
          right: '2%',
          feature: {
            saveAsImage: {show: true, title: 'Download', name: 'Belastungsplan'},
            // dataView: {show: true, readOnly: true, title: 'Datenansicht', lang: ['Datenansicht', 'zurück', 'refresh']},
          },
          tooltip: {
            show: true,
            position: 'top',
          },
        },
        series: [
            // Data Series
          {
            name: this.name,
            type: 'graph',
            layout: 'none',
            width: 400,
            height: 400,
            symbol: 'none',
            // Default SymbolSize
            edgeSymbolSize: 10,
            data: [
              // Sources
              // 1 Source
              {
                name: '1s1t',
                x: -50,
                y: -455
              },
              {
                name: '1s5t',
                x: -55,
                y: -455
              },
              {
                name: '1s2t',
                x: -60,
                y: -455
              },
              {
                name: '1s6t',
                x: -65,
                y: -455
              },
              {
                name: '1s3t',
                x: -70,
                y: -455
              },
              {
                name: '1s7t',
                x: -75,
                y: -455
              },
              {
                name: '1s4t',
                x: -80,
                y: -455
              },
              {
                name: '1s8t',
                x: -85,
                y: -455
              },
              // 2 Source
              {
                name: '2s5t',
                x: 455,
                y: -85
              },
              {
                name: '2s1t',
                x: 455,
                y: -80
              },
              {
                name: '2s8t',
                x: 455,
                y: -75
              },
              {
                name: '2s4t',
                x: 455,
                y: -70
              },
              {
                name: '2s7t',
                x: 455,
                y: -65
              },
              {
                name: '2s3t',
                x: 455,
                y: -60
              },
              {
                name: '2s6t',
                x: 455,
                y: -55
              },
              {
                name: '2s2t',
                x: 455,
                y: -50
              },
              // 3 Source
              {
                name: '3s3t',
                x: 50,
                y: 455
              },
              {
                name: '3s7t',
                x: 55,
                y: 455
              },
              {
                name: '3s4t',
                x: 60,
                y: 455
              },
              {
                name: '3s8t',
                x: 65,
                y: 455
              },
              {
                name: '3s1t',
                x: 70,
                y: 455
              },
              {
                name: '3s5t',
                x: 75,
                y: 455
              },
              {
                name: '3s2t',
                x: 80,
                y: 455
              },
              {
                name: '3s6t',
                x: 85,
                y: 455
              },
              // 4 Source
              {
                name: '4s4t',
                x: -455,
                y: 50
              },
              {
                name: '4s8t',
                x: -455,
                y: 55
              },
              {
                name: '4s1t',
                x: -455,
                y: 60
              },
              {
                name: '4s5t',
                x: -455,
                y: 65
              },
              {
                name: '4s2t',
                x: -455,
                y: 70
              },
              {
                name: '4s6t',
                x: -455,
                y: 75
              },
              {
                name: '4s3t',
                x: -455,
                y: 80
              },
              {
                name: '4s7t',
                x: -455,
                y: 85
              },
              // 5 Source
              {
                name: '5s1t',
                x: 185,
                y: -355
              },
              {
                name: '5s8t',
                x: 190,
                y: -350
              },
              {
                name: '5s4t',
                x: 195,
                y: -345
              },
              {
                name: '5s7t',
                x: 200,
                y: -340
              },
              {
                name: '5s3t',
                x: 205,
                y: -335
              },
              {
                name: '5s6t',
                x: 210,
                y: -330
              },
              {
                name: '5s2t',
                x: 215,
                y: -325
              },
              {
                name: '5s5t',
                x: 220,
                y: -320
              },
              // 6 Source
              {
                name: '6s6t',
                x: 320,
                y: 220
              },
              {
                name: '6s3t',
                x: 325,
                y: 215
              },
              {
                name: '6s7t',
                x: 330,
                y: 210
              },
              {
                name: '6s4t',
                x: 335,
                y: 205
              },
              {
                name: '6s8t',
                x: 340,
                y: 200
              },
              {
                name: '6s1t',
                x: 345,
                y: 195
              },
              {
                name: '6s5t',
                x: 350,
                y: 190
              },
              {
                name: '6s2t',
                x: 355,
                y: 185
              },
              // 7 Source
              {
                name: '7s3t',
                x: -185,
                y: 355
              },
              {
                name: '7s6t',
                x: -190,
                y: 350
              },
              {
                name: '7s2t',
                x: -195,
                y: 345
              },
              {
                name: '7s5t',
                x: -200,
                y: 340
              },
              {
                name: '7s1t',
                x: -205,
                y: 335
              },
              {
                name: '7s8t',
                x: -210,
                y: 330
              },
              {
                name: '7s4t',
                x: -215,
                y: 325
              },
              {
                name: '7s7t',
                x: -220,
                y: 320
              },
              // 8 Source
              {
                name: '8s8t',
                x: -320,
                y: -220
              },
              {
                name: '8s1t',
                x: -325,
                y: -215
              },
              {
                name: '8s5t',
                x: -330,
                y: -210
              },
              {
                name: '8s2t',
                x: -335,
                y: -205
              },
              {
                name: '8s6t',
                x: -340,
                y: -200
              },
              {
                name: '8s3t',
                x: -345,
                y: -195
              },
              {
                name: '8s7t',
                x: -350,
                y: -190
              },
              {
                name: '8s4t',
                x: -355,
                y: -185
              },
              // Targets
              // 1 Target
              {
                name: '1t1s',
                x: 50,
                y: -455
              },
              {
                name: '1t8s',
                x: 55,
                y: -455
              },
              {
                name: '1t4s',
                x: 60,
                y: -455
              },
              {
                name: '1t7s',
                x: 65,
                y: -455
              },
              {
                name: '1t3s',
                x: 70,
                y: -455
              },
              {
                name: '1t6s',
                x: 75,
                y: -455
              },
              {
                name: '1t2s',
                x: 80,
                y: -455
              },
              {
                name: '1t5s',
                x: 85,
                y: -455
              },
              // 2 Target
              {
                name: '2t2s',
                x: 455,
                y: 50
              },
              {
                name: '2t5s',
                x: 455,
                y: 55
              },
              {
                name: '2t1s',
                x: 455,
                y: 60
              },
              {
                name: '2t8s',
                x: 455,
                y: 65
              },
              {
                name: '2t4s',
                x: 455,
                y: 70
              },
              {
                name: '2t7s',
                x: 455,
                y: 75
              },
              {
                name: '2t3s',
                x: 455,
                y: 80
              },
              {
                name: '2t6s',
                x: 455,
                y: 85
              },
              // 3 Target
              {
                name: '3t3s',
                x: -50,
                y: 455
              },
              {
                name: '3t6s',
                x: -55,
                y: 455
              },
              {
                name: '3t2s',
                x: -60,
                y: 455
              },
              {
                name: '3t5s',
                x: -65,
                y: 455
              },
              {
                name: '3t1s',
                x: -70,
                y: 455
              },
              {
                name: '3t8s',
                x: -75,
                y: 455
              },
              {
                name: '3t4s',
                x: -80,
                y: 455
              },
              {
                name: '3t7s',
                x: -85,
                y: 455
              },
              // 4 Target
              {
                name: '4t8s',
                x: -455,
                y: -85
              },
              {
                name: '4t1s',
                x: -455,
                y: -80
              },
              {
                name: '4t5s',
                x: -455,
                y: -75
              },
              {
                name: '4t2s',
                x: -455,
                y: -70
              },
              {
                name: '4t6s',
                x: -455,
                y: -65
              },
              {
                name: '4t3s',
                x: -455,
                y: -60
              },
              {
                name: '4t7s',
                x: -455,
                y: -55
              },
              {
                name: '4t4s',
                x: -455,
                y: -50
              },
              // 5 Target
              {
                name: '5t5s',
                x: 320,
                y: -220
              },
              {
                name: '5t1s',
                x: 325,
                y: -215
              },
              {
                name: '5t8s',
                x: 330,
                y: -210
              },
              {
                name: '5t4s',
                x: 335,
                y: -205
              },
              {
                name: '5t7s',
                x: 340,
                y: -200
              },
              {
                name: '5t3s',
                x: 345,
                y: -195
              },
              {
                name: '5t6s',
                x: 350,
                y: -190
              },
              {
                name: '5t2s',
                x: 355,
                y: -185
              },
              // 6 Target
              {
                name: '6t3s',
                x: 185,
                y: 355
              },
              {
                name: '6t7s',
                x: 190,
                y: 350
              },
              {
                name: '6t4s',
                x: 195,
                y: 345
              },
              {
                name: '6t8s',
                x: 200,
                y: 340
              },
              {
                name: '6t1s',
                x: 205,
                y: 335
              },
              {
                name: '6t5s',
                x: 210,
                y: 330
              },
              {
                name: '6t2s',
                x: 215,
                y: 325
              },
              {
                name: '6t6s',
                x: 220,
                y: 320
              },
              // 7 Target
              {
                name: '7t7s',
                x: -320,
                y: 220
              },
              {
                name: '7t3s',
                x: -325,
                y: 215
              },
              {
                name: '7t6s',
                x: -330,
                y: 210
              },
              {
                name: '7t2s',
                x: -335,
                y: 205
              },
              {
                name: '7t5s',
                x: -340,
                y: 200
              },
              {
                name: '7t1s',
                x: -345,
                y: 195
              },
              {
                name: '7t8s',
                x: -350,
                y: 190
              },
              {
                name: '7t4s',
                x: -355,
                y: 185
              },
              // 8 Target
              {
                name: '8t1s',
                x: -185,
                y: -355
              },
              {
                name: '8t5s',
                x: -190,
                y: -350
              },
              {
                name: '8t2s',
                x: -195,
                y: -345
              },
              {
                name: '8t6s',
                x: -200,
                y: -340
              },
              {
                name: '8t3s',
                x: -205,
                y: -335
              },
              {
                name: '8t7s',
                x: -210,
                y: -330
              },
              {
                name: '8t4s',
                x: -215,
                y: -325
              },
              {
                name: '8t8s',
                x: -220,
                y: -320
              },

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
                  curveness: -this.curveness045,
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
                  curveness: this.curveness045,
                  color: this.color[0]
                },
                symbol: ['none', (this.data[0][3] === 0 ? 'none' : 'arrow')]
              },
              {
                source: '1s5t',
                target: '5t1s',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[0][4]),
                  curveness: -this.curveness039,
                  color: this.color[0],
                },
                symbol: ['none', (this.data[0][4] === 0 ? 'none' : 'arrow')]
              },
              {
                source: '1s6t',
                target: '6t1s',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[0][5]),
                  curveness: -this.curveness02,
                  color: this.color[0],
                },
                symbol: ['none', (this.data[0][5] === 0 ? 'none' : 'arrow')]
              },
              {
                source: '1s7t',
                target: '7t1s',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[0][6]),
                  curveness: this.curveness022,
                  color: this.color[0],
                },
                symbol: ['none', (this.data[0][6] === 0 ? 'none' : 'arrow')]
              },
              {
                source: '1s8t',
                target: '8t1s',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[0][7]),
                  curveness: this.curveness05,
                  color: this.color[0],
                },
                symbol: ['none', (this.data[0][7] === 0 ? 'none' : 'arrow')]
              },
              // Source: 2
              {
                source: '2s1t',
                target: '1t2s',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[1][0]),
                  curveness: this.curveness045,
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
                  curveness: -this.curveness045,
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
              {
                source: '2s5t',
                target: '5t2s',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[1][4]),
                  curveness: this.curveness05,
                  color: this.color[1]
                },
                symbol: ['none', (this.data[1][4] === 0 ? 'none' : 'arrow')]
              },
              {
                source: '2s6t',
                target: '6t2s',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[1][5]),
                  curveness: -this.curveness039,
                  color: this.color[1]
                },
                symbol: ['none', (this.data[1][5] === 0 ? 'none' : 'arrow')]
              },
              {
                source: '2s7t',
                target: '7t2s',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[1][6]),
                  curveness: -this.curveness02,
                  color: this.color[1]
                },
                symbol: ['none', (this.data[1][6] === 0 ? 'none' : 'arrow')]
              },
              {
                source: '2s8t',
                target: '8t2s',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[1][7]),
                  curveness: this.curveness022,
                  color: this.color[1]
                },
                symbol: ['none', (this.data[1][7] === 0 ? 'none' : 'arrow')]
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
                  curveness: this.curveness045,
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
                  curveness: -this.curveness045,
                  color: this.color[2],
                },
                symbol: ['none', (this.data[2][3] === 0 ? 'none' : 'arrow')]
              },
              {
                source: '3s5t',
                target: '5t3s',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[2][4]),
                  curveness: this.curveness022,
                  color: this.color[2],
                },
                symbol: ['none', (this.data[2][4] === 0 ? 'none' : 'arrow')]
              },
              {
                source: '3s6t',
                target: '6t3s',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[2][5]),
                  curveness: this.curveness05,
                  color: this.color[2],
                },
                symbol: ['none', (this.data[2][5] === 0 ? 'none' : 'arrow')]
              },
              {
                source: '3s7t',
                target: '7t3s',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[2][6]),
                  curveness: -this.curveness039,
                  color: this.color[2],
                },
                symbol: ['none', (this.data[2][6] === 0 ? 'none' : 'arrow')]
              },
              {
                source: '3s8t',
                target: '8t3s',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[2][7]),
                  curveness: -this.curveness02,
                  color: this.color[2],
                },
                symbol: ['none', (this.data[2][7] === 0 ? 'none' : 'arrow')]
              },
              // Source: 4
              {
                source: '4s1t',
                target: '1t4s',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[3][0]),
                  curveness: -this.curveness045,
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
                  curveness: this.curveness045,
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
              {
                source: '4s5t',
                target: '5t4s',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[3][4]),
                  curveness: -this.curveness02,
                  color: this.color[3]
                },
                symbol: ['none', (this.data[3][4] === 0 ? 'none' : 'arrow')]
              },
              {
                source: '4s6t',
                target: '6t4s',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[3][5]),
                  curveness: this.curveness022,
                  color: this.color[3]
                },
                symbol: ['none', (this.data[3][5] === 0 ? 'none' : 'arrow')]
              },
              {
                source: '4s7t',
                target: '7t4s',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[3][6]),
                  curveness: this.curveness05,
                  color: this.color[3]
                },
                symbol: ['none', (this.data[3][6] === 0 ? 'none' : 'arrow')]
              },
              {
                source: '4s8t',
                target: '8t4s',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[3][7]),
                  curveness: -this.curveness039,
                  color: this.color[3]
                },
                symbol: ['none', (this.data[3][7] === 0 ? 'none' : 'arrow')]
              },
                // 5 Source
              {
                source: '5s1t',
                target: '1t5s',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[4][0]),
                  curveness: this.curveness05,
                  color: this.color[4]
                },
                symbol: ['none', (this.data[4][0] === 0 ? 'none' : 'arrow')]
              },
              {
                source: '5s2t',
                target: '2t5s',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[4][1]),
                  curveness: -this.curveness06,
                  color: this.color[4]
                },
                symbol: ['none', (this.data[4][1] === 0 ? 'none' : 'arrow')]
              },
              {
                source: '5s3t',
                target: '3t5s',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[4][2]),
                  curveness: -this.curveness02,
                  color: this.color[4]
                },
                symbol: ['none', (this.data[4][2] === 0 ? 'none' : 'arrow')]
              },
              {
                source: '5s4t',
                target: '4t5s',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[4][3]),
                  curveness: this.curveness02,
                  color: this.color[4]
                },
                symbol: ['none', (this.data[4][3] === 0 ? 'none' : 'arrow')]
              },
              {
                source: '5s5t',
                target: '5t5s',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[4][4]),
                  curveness: -this.curveness06,
                  color: this.color[4]
                },
                symbol: ['none', (this.data[4][4] === 0 ? 'none' : 'arrow')]
              },
              {
                source: '5s6t',
                target: '6t5s',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[4][5]),
                  curveness: -this.curveness039,
                  color: this.color[4]
                },
                symbol: ['none', (this.data[4][5] === 0 ? 'none' : 'arrow')]
              },
              {
                source: '5s7t',
                target: '7t5s',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[4][6]),
                  color: this.color[4]
                },
                symbol: ['none', (this.data[4][6] === 0 ? 'none' : 'arrow')]
              },
              {
                source: '5s8t',
                target: '8t5s',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[4][7]),
                  curveness: this.curveness05,
                  color: this.color[4]
                },
                symbol: ['none', (this.data[4][7] === 0 ? 'none' : 'arrow')]
              },
              // 6 Source
              {
                source: '6s1t',
                target: '1t6s',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[5][0]),
                  curveness: this.curveness02,
                  color: this.color[5],
                },
                symbol: ['none', (this.data[5][0] === 0 ? 'none' : 'arrow')]
              },
              {
                source: '6s2t',
                target: '2t6s',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[5][1]),
                  curveness: this.curveness05,
                  color: this.color[5],
                },
                symbol: ['none', (this.data[5][1] === 0 ? 'none' : 'arrow')]
              },
              {
                source: '6s3t',
                target: '3t6s',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[5][2]),
                  curveness: -this.curveness06,
                  color: this.color[5],
                },
                symbol: ['none', (this.data[5][2] === 0 ? 'none' : 'arrow')]
              },
              {
                source: '6s4t',
                target: '4t6s',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[5][3]),
                  curveness: -this.curveness02,
                  color: this.color[5],
                },
                symbol: ['none', (this.data[5][3] === 0 ? 'none' : 'arrow')]
              },
              {
                source: '6s5t',
                target: '5t6s',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[5][4]),
                  curveness: this.curveness05,
                  color: this.color[5],
                },
                symbol: ['none', (this.data[5][4] === 0 ? 'none' : 'arrow')]
              },
              {
                source: '6s6t',
                target: '6t6s',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[5][5]),
                  curveness: -this.curveness06,
                  color: this.color[5]
                },
                symbol: ['none', (this.data[5][5] === 0 ? 'none' : 'arrow')]
              },
              {
                source: '6s7t',
                target: '7t6s',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[5][6]),
                  curveness: -this.curveness039,
                  color: this.color[5],
                },
                symbol: ['none', (this.data[5][6] === 0 ? 'none' : 'arrow')]
              },
              {
                source: '6s8t',
                target: '8t6s',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[5][7]),
                  curveness: 0,
                  color: this.color[5],
                },
                symbol: ['none', (this.data[5][7] === 0 ? 'none' : 'arrow')]
              },
              // 7 Source
              {
                source: '7s1t',
                target: '1t7s',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[6][0]),
                  curveness: -this.curveness02,
                  color: this.color[6],
                },
                symbol: ['none', (this.data[6][0] === 0 ? 'none' : 'arrow')]
              },
              {
                source: '7s2t',
                target: '2t7s',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[6][1]),
                  curveness: this.curveness02,
                  color: this.color[6],
                },
                symbol: ['none', (this.data[6][1] === 0 ? 'none' : 'arrow')]
              },
              {
                source: '7s3t',
                target: '3t7s',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[6][2]),
                  curveness: this.curveness05,
                  color: this.color[6],
                },
                symbol: ['none', (this.data[6][2] === 0 ? 'none' : 'arrow')]
              },
              {
                source: '7s4t',
                target: '4t6s',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[6][3]),
                  curveness: -this.curveness06,
                  color: this.color[6],
                },
                symbol: ['none', (this.data[6][3] === 0 ? 'none' : 'arrow')]
              },
              {
                source: '7s5t',
                target: '5t7s',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[6][4]),
                  curveness: 0,
                  color: this.color[6],
                },
                symbol: ['none', (this.data[6][4] === 0 ? 'none' : 'arrow')]
              },
              {
                source: '7s6t',
                target: '6t7s',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[6][5]),
                  curveness: this.curveness05,
                  color: this.color[6],
                },
                symbol: ['none', (this.data[6][5] === 0 ? 'none' : 'arrow')]
              },
              {
                source: '7s7t',
                target: '7t7s',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[6][6]),
                  curveness: -this.curveness06,
                  color: this.color[6]
                },
                symbol: ['none', (this.data[6][6] === 0 ? 'none' : 'arrow')]
              },
              {
                source: '7s8t',
                target: '8t7s',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[6][7]),
                  curveness: -this.curveness039,
                  color: this.color[6],
                },
                symbol: ['none', (this.data[6][7] === 0 ? 'none' : 'arrow')]
              },
              // 8 Source
              {
                source: '8s1t',
                target: '1t8s',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[7][0]),
                  curveness: -this.curveness06,
                  color: this.color[7],
                },
                symbol: ['none', (this.data[7][0] === 0 ? 'none' : 'arrow')]
              },
              {
                source: '8s2t',
                target: '2t8s',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[7][1]),
                  curveness: -this.curveness02,
                  color: this.color[7],
                },
                symbol: ['none', (this.data[7][1] === 0 ? 'none' : 'arrow')]
              },
              {
                source: '8s3t',
                target: '3t8s',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[7][2]),
                  curveness: this.curveness02,
                  color: this.color[7],
                },
                symbol: ['none', (this.data[7][2] === 0 ? 'none' : 'arrow')]
              },
              {
                source: '8s4t',
                target: '4t8s',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[7][3]),
                  curveness: this.curveness05,
                  color: this.color[7],
                },
                symbol: ['none', (this.data[7][3] === 0 ? 'none' : 'arrow')]
              },
              {
                source: '8s5t',
                target: '5t8s',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[7][4]),
                  curveness: -this.curveness039,
                  color: this.color[7],
                },
                symbol: ['none', (this.data[7][4] === 0 ? 'none' : 'arrow')]
              },
              {
                source: '8s6t',
                target: '6t8s',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[7][5]),
                  curveness: 0,
                  color: this.color[7],
                },
                symbol: ['none', (this.data[7][5] === 0 ? 'none' : 'arrow')]
              },
              {
                source: '8s7t',
                target: '7t8s',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[7][6]),
                  curveness: this.curveness05,
                  color: this.color[7],
                },
                symbol: ['none', (this.data[7][6] === 0 ? 'none' : 'arrow')]
              },
              {
                source: '8s8t',
                target: '8t8s',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[7][7]),
                  curveness: -this.curveness06,
                  color: this.color[7],
                },
                symbol: ['none', (this.data[7][7] === 0 ? 'none' : 'arrow')]
              },
            ],
            lineStyle: {
              opacity: 0.9,
            }
          },
            // Info-Label Series
          {
            name: this.name,
            type: 'graph',
            layout: 'none',
            center: [0,0],
            width: 400,
            height: 400,
            symbol: 'none',
            symbolSize: 20,
            label: {
              backgroundColor: '#eee',
              borderColor: '#aaa',
              borderWidth: 1,
              borderRadius: 4,
              rich: {
                valueLeft: {
                  color: '#999',
                  lineHeight: 13,
                  align: 'left'
                },
                dividerLeft: {
                  color: '#999',
                  lineHeight: 5,
                  align: 'left'
                },
                nameLeft: {
                  fontSize: 16,
                  lineHeight: 22,
                  align: 'left',
                  color: 'black'
                },
                valueRight: {
                  color: '#999',
                  lineHeight: 13,
                  align: 'right'
                },
                dividerRight: {
                  color: '#999',
                  lineHeight: 5,
                  align: 'right'
                },
                nameRight: {
                  fontSize: 16,
                  lineHeight: 22,
                  align: 'right',
                  color: 'black'
                },
              }
            },
            data: [
              // Sources
              // 1 Source
              {
                name: '1',
                x: 0,
                y: -440,
                symbol: (this.visibleNodes[0] ? 'circle' : 'none'),
                label: {
                  formatter: this.formatLabel(0, true),
                  show: this.visibleNodes[0],
                  rotate: 90,
                  position: [-60, -10]
                }
              },
              // 2 Source
              {
                name: '2',
                x: 440,
                y: 0,
                symbol: (this.visibleNodes[1] ? 'circle' : 'none'),
                label: {
                  formatter: this.formatLabel(1, true),
                  show: this.visibleNodes[1],
                  position: [40, -60]
                }
              },
              // 3 Source
              {
                name: '3',
                x: 0,
                y: 440,
                symbol: (this.visibleNodes[2] ? 'circle' : 'none'),
                label: {
                  formatter: this.formatLabel(2, false),
                  show: this.visibleNodes[2],
                  rotate: 90,
                  position: [-50, 100]
                }
              },
              // 4 Source
              {
                name: '4',
                x: -440,
                y: 0,
                symbol: (this.visibleNodes[3] ? 'circle' : 'none'),
                label: {
                  formatter: this.formatLabel(3, false),
                  show: this.visibleNodes[3],
                  position: [-80, -60]
                }
              },
              // 5 Source
              {
                name: '5',
                x: 270,
                y: -270,
                symbol: (this.visibleNodes[4] ? 'circle' : 'none'),
                label: {
                  formatter: this.formatLabel(4, true),
                  show: this.visibleNodes[4],
                  rotate: 45,
                  position: [-15, -55]
                }
              },
              // 6 Source
              {
                name: '6',
                x: 270,
                y: 270,
                symbol: (this.visibleNodes[5] ? 'circle' : 'none'),
                label: {
                  formatter: this.formatLabel(5, true),
                  show: this.visibleNodes[5],
                  rotate: -45,
                  position: [80, -15]
                }
              },
              // 7 Source
              {
                name: '7',
                x: -270,
                y: 270,
                symbol: (this.visibleNodes[6] ? 'circle' : 'none'),
                label: {
                  formatter: this.formatLabel(6, false),
                  show: this.visibleNodes[6],
                  rotate: 45,
                  position: [-100, 30]
                }
              },
              // 8 Source
              {
                name: '8',
                x: -270,
                y: -270,
                symbol: (this.visibleNodes[7] ? 'circle' : 'none'),
                label: {
                  formatter: this.formatLabel(7, false),
                  show: this.visibleNodes[7],
                  rotate: -45,
                  position: [-5, -100]
                }
              },
            ],
          },
            // Node-Label Series
          {
            name: this.name,
            type: 'graph',
            layout: 'none',
            center: [0,0],
            width: 400,
            height: 400,
            symbol: 'none',
            symbolSize: 20,
            // Sources
            data: [
              // 1 Source
              {
                name: '1',
                x: 0,
                y: -440,
                symbol: (this.visibleNodes[0] ? 'circle' : 'none'),
                label: {
                  show: this.visibleNodes[0],
                }
              },
              // 2 Source
              {
                name: '2',
                x: 440,
                y: 0,
                symbol: (this.visibleNodes[1] ? 'circle' : 'none'),
                label: {
                  show: this.visibleNodes[1],
                }
              },
              // 3 Source
              {
                name: '3',
                x: 0,
                y: 440,
                symbol: (this.visibleNodes[2] ? 'circle' : 'none'),
                label: {
                  show: this.visibleNodes[2],
                }
              },
              // 4 Source
              {
                name: '4',
                x: -440,
                y: 0,
                symbol: (this.visibleNodes[3] ? 'circle' : 'none'),
                label: {
                  show: this.visibleNodes[3],
                }
              },
              // 5 Source
              {
                name: '5',
                x: 270,
                y: -270,
                symbol: (this.visibleNodes[4] ? 'circle' : 'none'),
                label: {
                  show: this.visibleNodes[4],
                }
              },
              // 6 Source
              {
                name: '6',
                x: 270,
                y: 270,
                symbol: (this.visibleNodes[5] ? 'circle' : 'none'),
                label: {
                  show: this.visibleNodes[5],
                }
              },
              // 7 Source
              {
                name: '7',
                x: -270,
                y: 270,
                symbol: (this.visibleNodes[6] ? 'circle' : 'none'),
                label: {
                  show: this.visibleNodes[6],
                }
              },
              // 8 Source
              {
                name: '8',
                x: -270,
                y: -270,
                symbol: (this.visibleNodes[7] ? 'circle' : 'none'),
                label: {
                  show: this.visibleNodes[7],
                }
              },
            ],
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

    private formatLabel (node:number, directionLeft:boolean) {
      let outgoing:number = 0;
      let incoming:number = 0;
      let textRight = '';
      let textLeft = '';


      for(let index = 0; index < 8; index++) {
        outgoing += this.data[node][index];
        incoming += this.data[index][node];
        (this.visibleNodes[index] && this.data[node][index] !== 0) ? textLeft += ` ${this.data[node][index]}\n` : '';
        (this.visibleNodes[index] && this.data[node][index] !== 0) ? textRight += `${this.data[node][index]} \n` : '';
      }



      if(directionLeft) {
        return `{valueLeft|${textLeft}}`
            + `{dividerLeft|--------}\n {valueLeft|${outgoing} }\n`
            + `{nameLeft| ${this.streets[node]}} \n`
            + `{valueLeft| ${outgoing + incoming} }\n\n\n`
            + `{valueLeft| ${incoming} }`
            ;
      } else {
        return `{valueRight| ${incoming} }\n\n\n`
            + `{nameRight| ${this.streets[node]}} \n`
            + `{valueRight| ${outgoing + incoming} }\n\n`
            + `{valueRight|${textRight}}`
            + `{dividerRight|--------}\n {valueRight|${outgoing} }`
            ;
      }

    }
  }
</script>