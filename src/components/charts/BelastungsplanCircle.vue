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

    private readonly curveness01: number = 0.1;
    private readonly curveness04: number = 0.4;

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
            width: 400,
            height: 400,
            symbol: 'none',
            edgeSymbolSize: 10,
            data: [
              {
                name: '1s',
                x: -25,
                y: -200
              },
              {
                name: '1t',
                x: 25,
                y: -200
              },
              {
                name: '2s',
                x: 200,
                y: -25
              },
              {
                name: '2t',
                x: 200,
                y: 25
              },
              {
                name: '3s',
                x: 25,
                y: 200
              },
              {
                name: '3t',
                x: -25,
                y: 200
              },
              {
                name: '4s',
                x: -200,
                y: 25
              },
              {
                name: '4t',
                x: -200,
                y: -25
              },
              // Kreis um center
              {
                name: 'K1',
                x: 50,
                y: -50
              },
              {
                name: 'K1t',
                x: 53,
                y: -53
              },
              {
                name: 'K1s',
                x: 56,
                y: -56
              },
              {
                name: 'K2',
                x: 50,
                y: 50
              },
              {
                name: 'K2t',
                x: 53,
                y: 53
              },
              {
                name: 'K2s',
                x: 56,
                y: 56
              },
              {
                name: 'K3',
                x: -50,
                y: 50
              },
              {
                name: 'K3t',
                x: -53,
                y: 53
              },
              {
                name: 'K3s',
                x: -56,
                y: 56
              },
              {
                name: 'K4',
                x: -50,
                y: -50
              },
              {
                name: 'K4t',
                x: -53,
                y: -53
              },
              {
                name: 'K4s',
                x: -56,
                y: -56
              },

            ],
            // links: [],
            edges: [
              // Einfahrt
              {
                source: '1s',
                target: 'K4t',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[0][0]),
                  curveness: this.curveness01,
                  color: 'black',
                },
                symbol: ['none','arrow'],
              },
              {
                source: '2s',
                target: 'K1t',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[1][0]),
                  curveness: this.curveness01,
                  color: 'black',
                },
                symbol: ['none','arrow'],
              },
              {
                source: '3s',
                target: 'K2t',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[2][0]),
                  curveness: this.curveness01,
                  color: 'black',
                }
              },
              {
                source: '4s',
                target: 'K3t',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[3][0]),
                  curveness: this.curveness01,
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
                  curveness: this.curveness01,
                  color: 'black',
                },
                symbol: ['none','arrow'],
              },
              {
                source: 'K2s',
                target: '2t',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[1][2]),
                  curveness: this.curveness01,
                  color: 'black',
                },
                symbol: ['none','arrow'],
              },
              {
                source: 'K3s',
                target: '3t',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[2][2]),
                  curveness: this.curveness01,
                  color: 'black',
                },
                symbol: ['none','arrow'],
              },
              {
                source: 'K4s',
                target: '4t',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[3][2]),
                  curveness: this.curveness01,
                  color: 'black',
                },
                symbol: ['none','arrow'],
              },
              // Kreis
              {
                source: 'K1',
                target: 'K4',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[0][1]),
                  curveness: -this.curveness04,
                  color: 'black',
                },
                symbol: ['none','arrow'],
              },
              {
                source: 'K4',
                target: 'K3',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[1][1]),
                  curveness: -this.curveness04,
                  color: 'black',
                },
                symbol: ['none','arrow'],
              },
              {
                source: 'K3',
                target: 'K2',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[2][1]),
                  curveness: -this.curveness04,
                  color: 'black',
                },
                symbol: ['none','arrow'],
              },
              {
                source: 'K2',
                target: 'K1',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[3][1]),
                  curveness: -this.curveness04,
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
                  align: 'center',
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
                  align: 'center',
                  color: 'black'
                },
              }
            },
            data: [
              {
                name: '1',
                x: 0,
                y: -200,
                symbol: 'circle',
                label: {
                  // formatter: this.formatLabel(0, true, false),
                  formatter: this.formatLabel2(0, true),
                  show: true,
                  rotate: 0,
                  position: [-50, -100]
                },
              },
              {
                name: '2',
                x: 200,
                y: 0,
                symbol: 'circle',
                label: {
                  // formatter: this.formatLabel(1, true, false),
                  formatter: this.formatLabel2(1, true),
                  show: true,
                  position: [40, -30]
                }
              },
              {
                name: '3',
                x: 0,
                y: 200,
                symbol: 'circle',
                label: {
                  // formatter: this.formatLabel(2, false, false),
                  formatter: this.formatLabel2(2, false),
                  show: true,
                  rotate: 0,
                  // position: [-30, 100]
                  position: [-50, 50]
                }
              },
              {
                name: '4',
                x: -200,
                y: 0,
                symbol: 'circle',
                label: {
                  // formatter: this.formatLabel(3, false, false),
                  formatter: this.formatLabel2(3, false),
                  show: true,
                  // position: [-80, -30]
                  position: [-130, -30]
                }
              },
              // {
              //   name: 'Stay1',
              //   x: 0,
              //   y: -200,
              //   symbol: 'circle',
              //   label: {
              //     formatter: this.formatLabel(0, true, true),
              //     show: true,
              //     rotate: 45,
              //     position: [120, 60]
              //   }
              // },
              // {
              //   name: 'Stay2',
              //   x: 200,
              //   y: 0,
              //   symbol: 'circle',
              //   label: {
              //     formatter: this.formatLabel(1, true, true),
              //     show: true,
              //     rotate: -45,
              //     position: [-40, 120]
              //   }
              // },
              // {
              //   name: 'Stay3',
              //   x: 0,
              //   y: 200,
              //   symbol: 'circle',
              //   label: {
              //     formatter: this.formatLabel(2, false, true),
              //     show: true,
              //     rotate: 45,
              //     position: [-180, -60]
              //   }
              // },
              // {
              //   name: 'Stay4',
              //   x: -200,
              //   y: 0,
              //   symbol: 'circle',
              //   label: {
              //     formatter: this.formatLabel(3, false, true),
              //     show: true,
              //     rotate: -45,
              //     position: [80, -180]
              //   }
              // },
            ],
          },
          // Node-Label Series
          {
            name: this.name,
            type: 'graph',
            layout: 'none',
            center: [0, 0],
            width: 400,
            height: 400,
            symbol: 'none',
            symbolSize: 20,
            data: [
              {
                name: '1',
                x: 0,
                y: -200,
                symbol: 'circle',
                label: {
                  show: true
                },
              },
              {
                name: '2',
                x: 200,
                y: 0,
                symbol: 'circle',
                label: {
                  show: true
                },
              },
              {
                name: '3',
                x: 0,
                y: 200,
                symbol: 'circle',
                label: {
                  show: true
                },
              },
              {
                name: '4',
                x: -200,
                y: 0,
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

    // private formatLabel (node:number, directionLeft:boolean, stay:boolean) {
    //   if(stay) {
    //     if(directionLeft) {
    //       return `{valueLeft| ${this.data[node][2]}}\n\n`
    //           + `{valueLeft| ${this.data[node][1]} }\n\n`
    //           + `{dividerLeft|--------}\n {valueLeft| ${this.data[node][1] + this.data[node][2]} }`
    //           ;
    //     } else {
    //       return `{valueRight|${this.data[node][1]} }\n\n`
    //           + `{valueRight|${this.data[node][2]} }\n\n`
    //           + `{dividerRight|--------}\n {valueRight|${this.data[node][1] + this.data[node][2]} }`
    //           ;
    //     }
    //   }
    //   else {
    //     if(directionLeft) {
    //       return `{valueLeft| ${this.data[node][0]}}\n\n`
    //           + `{nameLeft| ${this.streets[node]}} \n`
    //           + `{valueLeft| ${this.data[node][0] + this.data[node][2]} }\n\n`
    //           + `{valueLeft| ${this.data[node][2]} }`
    //           ;
    //     } else {
    //       return `{valueRight|${this.data[node][2]} }\n\n`
    //           + `{nameRight| ${this.streets[node]}} \n`
    //           + `{valueRight|${this.data[node][0] + this.data[node][2]} }\n\n`
    //           + `{valueRight|${this.data[node][0]} }`
    //           ;
    //     }
    //   }
    // }

    private formatLabel2 (node:number, directionLeft:boolean) {
        if(directionLeft) {
          return `{nameLeft| ${this.streets[node]}} \n\n`
              + `{valueLeft| Einfahrend: ${this.data[node][0]} }\n`
              + `{valueLeft| Verbleibend: ${this.data[node][1]} }\n`
              + `{valueLeft| Ausfahrend: ${this.data[node][2]} }\n`
              ;
        } else {
          return `{nameRight| ${this.streets[node]}} \n\n`
              + `{valueLeft| Einfahrend: ${this.data[node][0]} }\n`
              + `{valueLeft| Verbleibend: ${this.data[node][1]} }\n`
              + `{valueLeft| Ausfahrend: ${this.data[node][2]} }\n`
              ;
        }
    }
  }
</script>