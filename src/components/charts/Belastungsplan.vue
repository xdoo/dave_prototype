<template>
  <v-chart :options="options"
           autoresize/>
</template>

<script lang="ts">

  import {Component, Prop, Vue} from "vue-property-decorator";
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
            symbolSize: 1,
            top: 'top',
            left: 'left',
            width: 300,
            height: 300,
            // roam: 'scale',
            label: {
              show: false
            },
            edgeSymbol: ['none', 'arrow'],
            edgeSymbolSize: 15,
            edgeLabel: {
              show: false
            },
            data: [
              // Source: 1
              {
                name: '1s4t',
                x: 470,
                y: 100
              },
              {
                name: '1s3t',
                x: 480,
                y: 100
              },
              {
                name: '1s2t',
                x: 490,
                y: 100
              },
              // Source: 2
              {
                name: '2s1t',
                x: 720,
                y: 200
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
                name: '3s4t',
                x: 600,
                y: 450
              },
              // Source: 4
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
              // Target: 1
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
              }
            ],
            edges: [
              // Source: 1
              {
                source: '1s4t',
                target: '4t1s',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[0][3]),
                  curveness: this.curveness,
                  color: this.color[0]
                }
              },
              {
                source: '1s3t',
                target: '3t1s',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[0][2]),
                  color: this.color[0]
                }
              },
              {
                source: '1s2t',
                target: '2t1s',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[0][1]),
                  curveness: -this.curveness,
                  color: this.color[0]
                }
              },
              // Source: 2
              {
                source: '2s4t',
                target: '4t2s',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[1][3]),
                  color: this.color[1]
                }
              },
              {
                source: '2s3t',
                target: '3t2s',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[1][2]),
                  curveness: -this.curveness,
                  color: this.color[1]
                }
              },
              {
                source: '2s1t',
                target: '1t2s',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[1][0]),
                  curveness: this.curveness,
                  color: this.color[1]
                }
              },
              // Source: 3
              {
                source: '3s1t',
                target: '1t3s',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[2][0]),
                  color: this.color[2]
                }
              },
              {
                source: '3s2t',
                target: '2t3s',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[2][1]),
                  curveness: this.curveness,
                  color: this.color[2]
                }
              },
              {
                source: '3s4t',
                target: '4t3s',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[2][3]),
                  curveness: -this.curveness,
                  color: this.color[2]
                }
              },
              // Source: 4
              {
                source: '4s2t',
                target: '2t4s',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[3][1]),
                  color: this.color[3]
                }
              },
              {
                source: '4s1t',
                target: '1t4s',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[3][0]),
                  curveness: -this.curveness,
                  color: this.color[3]
                }
              },
              {
                source: '4s3t',
                target: '3t4s',
                lineStyle: {
                  width: this.calculateLineWidth(this.data[3][2]),
                  curveness: this.curveness,
                  color: this.color[3]
                }
              },
            ],
            lineStyle: {
              opacity: 0.9,
              width: 2,
              curveness: 0
            }
          }
        ]
      }
    }

    private calculateLineWidth(cars:number):number {
      let maxWidth = 5;
      if(cars < 100) {
        return 1;
      }
      if(cars < 300) {
        return 1.5;
      }
      if(cars < 500) {
        return 2;
      }
      if(cars < 1000) {
        return 2.5
      }
      if(cars < 1500) {
        return 3;
      }
      if(cars < 2000) {
        return 3.5;
      }
      if(cars < 3000) {
        return 4
      }
      if(cars < 5000) {
        return 4.5;
      }
      return maxWidth;
    }

  }
</script>