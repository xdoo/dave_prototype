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
  export default class BelastungsplanCircle extends Vue {

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
          orient: 'vertical',
          feature: {
            saveAsImage: {show: true, title: 'Download', name: 'BelastungsplanKreisverkehr'},
            // dataView: {show: true, readOnly: true, title: 'Datenansicht', lang: ['Datenansicht', 'zurück', 'refresh']},
          },
          tooltip: {
            show: true,
            position: 'top',
          },
        },
        series: [
            // Data series
          {
            name: this.name,
            type: 'graph',
            layout: 'none',
            center: [0, 0],
            width: 249,
            height: 249,
            symbol: 'none',
            edgeSymbolSize: 15,
            data: [
              {
                name: '1s',
                x: -25,
                y: -440
              },
              {
                name: '1t',
                x: 25,
                y: -440
              },
              {
                name: '2s',
                x: 440,
                y: -25
              },
              {
                name: '2t',
                x: 440,
                y: 25
              },
              {
                name: '3s',
                x: 25,
                y: 440
              },
              {
                name: '3t',
                x: -25,
                y: 440
              },
              {
                name: '4s',
                x: -440,
                y: 25
              },
              {
                name: '4t',
                x: -440,
                y: -25
              },
              {
                name: '5s',
                x: 270,
                y: -300
              },
              {
                name: '5t',
                x: 300,
                y: -270
              },
              {
                name: '6s',
                x: 300,
                y: 270
              },
              {
                name: '6t',
                x: 270,
                y: 300
              },
              {
                name: '7s',
                x: -270,
                y: 300
              },
              {
                name: '7t',
                x: -300,
                y: 270
              },
              {
                name: '8s',
                x: -300,
                y: -270
              },
              {
                name: '8t',
                x: -270,
                y: -300
              },
              // Kreis um center
              {
                name: 'K1',
                x: 90,
                y: -210
              },
              {
                name: 'K1t',
                x: 93,
                y: -213
              },
              {
                name: 'K1s',
                x: 96,
                y: -216
              },
              {
                name: 'K5',
                x: 210,
                y: -90
              },
              {
                name: 'K5t',
                x: 213,
                y: -93
              },
              {
                name: 'K5s',
                x: 216,
                y: -96
              },
              {
                name: 'K2',
                x: 210,
                y: 90
              },
              {
                name: 'K2t',
                x: 213,
                y: 93
              },
              {
                name: 'K2s',
                x: 216,
                y: 96
              },
              {
                name: 'K6',
                x: 90,
                y: 210
              },
              {
                name: 'K6t',
                x: 93,
                y: 213
              },
              {
                name: 'K6s',
                x: 96,
                y: 216
              },
              {
                name: 'K3',
                x: -110,
                y: 210
              },
              {
                name: 'K3t',
                x: -113,
                y: 213
              },
              {
                name: 'K3s',
                x: -116,
                y: 216
              },
              {
                name: 'K7',
                x: -210,
                y: 90
              },
              {
                name: 'K7t',
                x: -213,
                y: 93
              },
              {
                name: 'K7s',
                x: -216,
                y: 96
              },
              {
                name: 'K4',
                x: -210,
                y: -90
              },
              {
                name: 'K4t',
                x: -213,
                y: -93
              },
              {
                name: 'K4s',
                x: -216,
                y: -96
              },
              {
                name: 'K8',
                x: -90,
                y: -210
              },
              {
                name: 'K8t',
                x: -93,
                y: -213
              },
              {
                name: 'K8s',
                x: -96,
                y: -216
              },
            ],
            // links: [],
            edges: [
              // Einfahrt
              {
                source: '1s',
                target: 'K8t',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[0][0]),
                  curveness: this.curveness02,
                  color: 'black',
                },
                symbol: ['none','arrow'],
              },

              {
                source: '2s',
                target: 'K5t',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[1][0]),
                  curveness: this.curveness02,
                  color: 'black',
                },
                symbol: ['none','arrow'],
              },
              {
                source: '3s',
                target: 'K6t',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[2][0]),
                  curveness: this.curveness02,
                  color: 'black',
                }
              },
              {
                source: '4s',
                target: 'K7t',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[3][0]),
                  curveness: this.curveness02,
                  color: 'black',
                },
                symbol: ['none','arrow'],
              },
              {
                source: '5s',
                target: 'K1t',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[4][0]),
                  curveness: this.curveness02,
                  color: 'black',
                },
                symbol: ['none','arrow'],
              },
              {
                source: '6s',
                target: 'K2t',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[5][0]),
                  curveness: this.curveness02,
                  color: 'black',
                },
                symbol: ['none','arrow'],
              },
              {
                source: '7s',
                target: 'K3t',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[6][0]),
                  curveness: this.curveness02,
                  color: 'black',
                },
                symbol: ['none','arrow'],
              },
              {
                source: '8s',
                target: 'K4t',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[7][0]),
                  curveness: this.curveness02,
                  color: 'black',
                },
                symbol: ['none','arrow'],
              },
              // Ausfahrt
              {
                source: 'K1s',
                target: '1t',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[0][2]),
                  curveness: this.curveness02,
                  color: 'black',
                },
                symbol: ['none','arrow'],
              },
              {
                source: 'K2s',
                target: '2t',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[1][2]),
                  curveness: this.curveness02,
                  color: 'black',
                },
                symbol: ['none','arrow'],
              },
              {
                source: 'K3s',
                target: '3t',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[2][2]),
                  curveness: this.curveness02,
                  color: 'black',
                },
                symbol: ['none','arrow'],
              },
              {
                source: 'K4s',
                target: '4t',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[3][2]),
                  curveness: this.curveness02,
                  color: 'black',
                },
                symbol: ['none','arrow'],
              },
              {
                source: 'K5s',
                target: '5t',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[4][2]),
                  curveness: this.curveness02,
                  color: 'black',
                },
                symbol: ['none','arrow'],
              },
              {
                source: 'K6s',
                target: '6t',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[5][2]),
                  curveness: this.curveness02,
                  color: 'black',
                },
                symbol: ['none','arrow'],
              },
              {
                source: 'K7s',
                target: '7t',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[6][2]),
                  curveness: this.curveness02,
                  color: 'black',
                },
                symbol: ['none','arrow'],
              },
              {
                source: 'K8s',
                target: '8t',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[7][2]),
                  curveness: this.curveness02,
                  color: 'black',
                },
                symbol: ['none','arrow'],
              },
              // Kreis
              {
                source: 'K1',
                target: 'K8',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[0][1]),
                  curveness: -this.curveness02,
                  color: 'black',
                },
                symbol: ['none','arrow'],
              },
              {
                source: 'K8',
                target: 'K4',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[7][1]),
                  curveness: -this.curveness02,
                  color: 'black',
                },
                symbol: ['none','arrow'],
              },
              {
                source: 'K4',
                target: 'K7',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[3][1]),
                  curveness: -this.curveness02,
                  color: 'black',
                },
                symbol: ['none','arrow'],
              },
              {
                source: 'K7',
                target: 'K3',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[6][1]),
                  curveness: -this.curveness02,
                  color: 'black',
                },
                symbol: ['none','arrow'],
              },
              {
                source: 'K3',
                target: 'K6',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[2][1]),
                  curveness: -this.curveness02,
                  color: 'black',
                },
                symbol: ['none','arrow'],
              },
              {
                source: 'K6',
                target: 'K2',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[5][1]),
                  curveness: -this.curveness02,
                  color: 'black',
                },
                symbol: ['none','arrow'],
              },
              {
                source: 'K2',
                target: 'K5',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[1][1]),
                  curveness: -this.curveness02,
                  color: 'black',
                },
                symbol: ['none','arrow'],
              },
              {
                source: 'K5',
                target: 'K1',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[4][1]),
                  curveness: -this.curveness02,
                  color: 'black',
                },
                symbol: ['none','arrow'],
              },
            ],
            lineStyle: {
              opacity: 0.9
            }
          },
          // Info-Label Series
          {
            name: this.name,
            type: 'graph',
            layout: 'none',
            center: [0, 0],
            width: 249,
            height: 249,
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
                  align: 'center',
                  color: 'black'
                },
              }
            },
            data: [
              {
                name: '1',
                x: 0,
                y: -530,
                symbol: 'circle',
                label: {
                  formatter: this.formatLabel2(0),
                  show: true,
                  rotate: 0,
                  position: [-40, -100]
                },
              },
              {
                name: '2',
                x: 530,
                y: 0,
                symbol: 'circle',
                label: {
                  formatter: this.formatLabel2(1),
                  show: true,
                  position: [40, -30]
                }
              },
              {
                name: '3',
                x: 0,
                y: 530,
                symbol: 'circle',
                label: {
                  formatter: this.formatLabel2(2),
                  show: true,
                  rotate: 0,
                  // position: [-30, 100]
                  position: [-40, 50]
                }
              },
              {
                name: '4',
                x: -530,
                y: 0,
                symbol: 'circle',
                label: {
                  formatter: this.formatLabel2(3),
                  show: true,
                  // position: [-80, -30]
                  position: [-130, -30]
                }
              },
              {
                name: '5',
                x: 350,
                y: -350,
                symbol: 'circle',
                label: {
                  formatter: this.formatLabel2(4),
                  show: true,
                  rotate: 0,
                  position: [40, -100]
                },
              },
              {
                name: '6',
                x: 350,
                y: 350,
                symbol: 'circle',
                label: {
                  formatter: this.formatLabel2(5),
                  show: true,
                  position: [40, 30]
                }
              },
              {
                name: '7',
                x: -350,
                y: 350,
                symbol: 'circle',
                label: {
                  formatter: this.formatLabel2(6),
                  show: true,
                  rotate: 0,
                  // position: [-30, 100]
                  position: [-130, 30]
                }
              },
              {
                name: '8',
                x: -350,
                y: -350,
                symbol: 'circle',
                label: {
                  formatter: this.formatLabel2(7),
                  show: true,
                  // position: [-80, -30]
                  position: [-130, -100]
                }
              },
            ],
          },
          // Node-Label Series
          {
            name: this.name,
            type: 'graph',
            layout: 'none',
            center: [0, 0],
            width: 249,
            height: 249,
            symbol: 'none',
            symbolSize: 20,
            data: [
              {
                name: '1',
                x: 0,
                y: -530,
                symbol: 'circle',
                label: {
                  show: true
                },
              },
              {
                name: '2',
                x: 530,
                y: 0,
                symbol: 'circle',
                label: {
                  show: true
                },
              },
              {
                name: '3',
                x: 0,
                y: 530,
                symbol: 'circle',
                label: {
                  show: true
                },
              },
              {
                name: '4',
                x: -530,
                y: 0,
                symbol: 'circle',
                label: {
                  show: true
                },
              },
              {
                name: '5',
                x: 350,
                y: -350,
                symbol: 'circle',
                label: {
                  show: true
                },
              },
              {
                name: '6',
                x: 350,
                y: 350,
                symbol: 'circle',
                label: {
                  show: true
                },
              },
              {
                name: '7',
                x: -350,
                y: 350,
                symbol: 'circle',
                label: {
                  show: true
                },
              },
              {
                name: '8',
                x: -350,
                y: -350,
                symbol: 'circle',
                label: {
                  show: true
                },
              },
            ],
          },
        ]
      }
    }

    private calculateLineWidth(cars: number): number {
      let maxWidth = 10;
      if (cars === 0) {
        return 0;
      }
      if (cars < 100) {
        return 1;
      }
      if (cars < 300) {
        return 2;
      }
      if (cars < 500) {
        return 3;
      }
      if (cars < 1000) {
        return 4
      }
      if (cars < 1500) {
        return 5;
      }
      if (cars < 2000) {
        return 6;
      }
      if (cars < 3000) {
        return 7
      }
      if (cars < 5000) {
        return 8;
      }
      return maxWidth;
    }

    private formatLabel2 (node:number) {
          return `{nameLeft| ${this.streets[node]}} \n\n`
              + `{valueLeft| Einfahrend: ${this.data[node][0]} }\n`
              + `{valueLeft| Verbleibend: ${this.data[node][1]} }\n`
              + `{valueLeft| Ausfahrend: ${this.data[node][2]} }\n`
              ;
    }
  }
</script>