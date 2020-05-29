<template>
  <v-chart
      ref="chart"
      :options="options"
      autoresize
  />
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
  import 'echarts/lib/component/grid'
  import 'echarts/lib/component/toolbox'

  @Component
  export default class LineBar extends Vue {

    @Ref('chart') readonly chart!: any

    printImage() {
      return this.chart.getDataURL({type: "png", backgroundColor: '#fff'})
    }

    // HACK für Demo!!!
    get options() {
      return {
        tooltip: {
          trigger: 'axis',
          // axisPointer: {
          //     type: 'cross',
          //     crossStyle: {
          //         color: '#999'
          //     }
          // }
        },
        toolbox: {
          feature: {
            dataView: {show: true, readOnly: false},
            magicType: {show: true, type: ['line', 'bar']},
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        legend: {
          data: ['Güterverkehr', 'Schwerverkehr', 'Kraftfahrzeugverkehr', 'Schwerverkehrsanteil'],
        },
        // grid: {
        //   left: '7%',
        //   right: '5%',
        //   bottom: '300',
        //   containLabel: false
        // },
        xAxis: {
          type: 'category',
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
            // axisLabel: {
            //   formatter: '{value} ml'
            // }
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
            name: 'Güterverkehr',
            type: 'bar',
            data: [400, 450, 450 , 450, 300]
          },
          {
            name: 'Schwerverkehr',
            type: 'bar',
            data: [500, 600, 650, 650, 500]
          },
          {
            name: 'Kraftfahrzeugverkehr',
            type: 'bar',
            data: [12500, 14000, 16300, 17000, 15500]
          },
          {
            name: 'Schwerverkehrsanteil',
            type: 'line',
            yAxisIndex: 1,
            data: [4, 4, 4, 4, 3]
          }
        ]
      }
    }

  }
</script>