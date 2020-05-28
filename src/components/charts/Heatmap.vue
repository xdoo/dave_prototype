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
import { Component, Prop, Ref } from "vue-property-decorator"

// chart
import 'echarts/lib/chart/heatmap'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/grid'
import 'echarts/lib/component/visualMap'

@Component
export default class Heatmap extends Vue {

  @Prop() readonly data!: number [][]
  @Prop() readonly name!: string
  @Prop() readonly categories!: string []
  @Prop() readonly hours!: string []
  @Prop({default: 0}) readonly rangeMin!: number
  @Prop({default: 100}) readonly rangeMax!: number

  @Ref('chart') readonly chart!: any

  printImage() {
    return this.chart.getDataURL({type: "png", backgroundColor: '#fff'})
  }

  get color() {
    return this.rangeMin < 0 ? ['#4575b4', '#d88273', '#bf444c'] : ['#f6efa6', '#d88273', '#bf444c']
  }

  get options () {

    console.log(this.color)

    return {
        tooltip: {
            position: 'top'
        },
        animation: false,
        grid: {
            height: '25%',
            top: '5%'
        },
        xAxis: {
            type: 'category',
            data: this.hours,
            splitArea: {
                show: true
            }
        },
        yAxis: {
            type: 'category',
            data: this.categories,
            splitArea: {
                show: true
            }
        },
        visualMap: {
            min: this.rangeMin,
            max: this.rangeMax,
            calculable: true,
            orient: 'horizontal',
            left: 'center',
            bottom: '50%',
            inRange: {
              color: this.color
            }
        },
        series: [{
            name: this.name,
            type: 'heatmap',
            data: this.data,
            label: {
                show: false
            },
            markPoint: {
                label: {
                    show: false
                }
            },
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    }
  }
}
</script>