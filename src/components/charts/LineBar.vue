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
  import Vue from 'vue'
  import {Component, Ref} from "vue-property-decorator"
  // chart
  import 'echarts/lib/chart/line'
  import 'echarts/lib/chart/bar'
  import 'echarts/lib/component/tooltip'
  import 'echarts/lib/component/legend'
  import 'echarts/lib/component/toolbox'

  @Component
  export default class LineBar extends Vue {

    @Ref('chart') readonly chart!: any
    @Ref('container') readonly container!: HTMLDivElement

    get initOptions() {
      return {
        dom: this.container
      }
    }

    // HACK für Demo!!!
    get options() {
      return {
        tooltip: {
          trigger: 'axis',
          formatter: function (params: any) {
            const param0 = params[0];
            const param1 = params[1];
            const param2 = params[2];
            const param3 = params[3];
            const param4 = params[4];
            let text= '';
            if(param0) {
              text += `${param0.name} <br/>`;
              text += `<span style="color:${param0.color}">\u25CF</span> ${param0.seriesName}: ${param0.data}%<br/>`;
            }
            if(param1) {
              text += `<span style="color:${param1.color}">\u25CF</span> ${param1.seriesName}: ${param1.data}<br/>`;
            }
            if(param2) {
              text += `<span style="color:${param2.color}">\u25CF</span> ${param2.seriesName}: ${param2.data}<br/>`;
            }
            if(param3) {
              text += `<span style="color:${param3.color}">\u25CF</span> ${param3.seriesName}: ${param3.data}<br/>`;
            }
            if(param4) {
              text += `<span style="color:${param4.color}">\u25CF</span> ${param4.seriesName}: ${param4.data}<br/>`;
            }
            return text;
          },
          // axisPointer: {
          //     type: 'cross',
          //     crossStyle: {
          //         color: '#999'
          //     }
          // }
        },
        toolbox: {
          showTitle: false,
          right: '2%',
          feature: {
            dataView: {show: true, readOnly: true, title: 'Datenansicht', lang: ['Datenansicht', 'zurück', 'refresh']},
            magicType: {
              show: true, type: ['line', 'bar'], title: {
                // line: 'Linie',
                // bar: 'Balken',
                // stack: 'Gestapelt'
              }
            },
            restore: {show: true, title: 'Standard'},
            saveAsImage: {show: true, title: 'Download', name: 'Zähldatenvergleich'}
          },
          tooltip: {
            show: true,
            position: 'top',
          },
        },
        legend: {
          data: ['Kraftfahrzeugverkehr', 'Güterverkehr', 'Schwerverkehr',  'Gesamt', 'Schwerverkehrsanteil'],
        },
        xAxis: {
          type: 'category',
          // axisLabel: {
          //   rotate: 90
          // },
          data: [
            '01.01.1990',
            '23.04.2005',
            '25.06.2011',
            '11.08.2014',
            '29.06.2019',
          ],
          splitArea: {
            show: true
          },

        },
        yAxis: [
          {
            type: 'value',
            name: 'Fahrzeuge',
            min: 0,
            max: 20000,
            interval: 2000,
          },
          {
            type: 'value',
            name: 'in Prozent',
            min: 0,
            max: 100,
            interval: 10,
            axisLabel: {
              formatter: '{value} %'
            }
          }
        ],
        series: [
          {
            name: 'Schwerverkehrsanteil',
            type: 'line',
            yAxisIndex: 1,
            data: [4, 4, 4, 4, 3],
          },
          {
            name: 'Kraftfahrzeugverkehr',
            type: 'bar',
            data: [12500, 14000, 16300, 17000, 15500]
          },
          {
            name: 'Güterverkehr',
            type: 'bar',
            data: [400, 450, 450, 450, 300]
          },
          {
            name: 'Schwerverkehr',
            type: 'bar',
            data: [500, 600, 650, 650, 500]
          },
          {
            name: 'Gesamt',
            type: 'bar',
            data: [13400, 15050, 17400, 18100, 16300],
          },
        ]
      }
    }

  }
</script>