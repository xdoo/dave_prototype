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

    private readonly data:number[][] = [
      [4, 4, 4, 4, 3],
      [12500, 14000, 16300, 17000, 15500],
      [400, 450, 450, 450, 300],
      [500, 600, 650, 650, 500],
      [13400, 15050, 17400, 18100, 16300],
    ];

    get initOptions() {
      return {
        dom: this.container
      }
    }

    // HACK für Demo!!!
    get options() {
      let that = this;
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
          orient: 'vertical',
          feature: {
            myToolExportData: {
              show: true,
              title: 'Export Data',
              icon: 'path://M14,2L20,8V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V4A2,2 0 0,1 6,2H14M18,20V9H13V4H6V20H18M12,19L8,15H10.5V12H13.5V15H16L12,19Z',
              onclick: function () {
                that.downloadCsv();
              }
            },
            dataView: {show: true, readOnly: true, title: 'Datenansicht', lang: ['Datenansicht', 'zurück', 'refresh'],
              optionToContent: function(opt:any) {
                let axisData = opt.xAxis[0].data;
                let series = opt.series;
                let table = '<table style="width:100%;text-align:center"><tbody><tr>'
                    + '<td>Zähldatum</td>'
                    + '<td>' + series[0].name + '</td>'
                    + '<td>' + series[1].name + '</td>'
                    + '<td>' + series[2].name + '</td>'
                    + '<td>' + series[3].name + '</td>'
                    + '<td>' + series[4].name + '</td>'
                    + '</tr>';
                for (let i = 0, l = axisData.length; i < l; i++) {
                  table += '<tr>'
                      + '<td>' + axisData[i] + '</td>'
                      + '<td>' + series[0].data[i] + '%</td>'
                      + '<td>' + series[1].data[i] + '</td>'
                      + '<td>' + series[2].data[i] + '</td>'
                      + '<td>' + series[3].data[i] + '</td>'
                      + '<td>' + series[4].data[i] + '</td>'
                      + '</tr>';
                }
                table += '</tbody></table>';
                return table;
              }},
            magicType: {
              show: true, type: ['line', 'bar'], title: {
                line: 'Linie',
                bar: 'Balken',
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
          // data: [
          //   '01.01.1990',
          //   '23.04.2005',
          //   '25.06.2011',
          //   '11.08.2014',
          //   '29.06.2019',
          // ],
          data: this.xAxis,
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
            // data: [4, 4, 4, 4, 3],
            data: this.data[0]
          },
          {
            name: 'Kraftfahrzeugverkehr',
            type: 'bar',
            // data: [12500, 14000, 16300, 17000, 15500]
            data: this.data[1]
          },
          {
            name: 'Güterverkehr',
            type: 'bar',
            // data: [400, 450, 450, 450, 300]
            data: this.data[2]
          },
          {
            name: 'Schwerverkehr',
            type: 'bar',
            // data: [500, 600, 650, 650, 500]
            data: this.data[3]
          },
          {
            name: 'Gesamt',
            type: 'bar',
            data: this.data[4]
          },
        ]
      }
    }

    get xAxis() {
      return [
        '01.01.1990',
        '23.04.2005',
        '25.06.2011',
        '11.08.2014',
        '29.06.2019',
      ];
    }

    private downloadCsv() {
      const rows = [];
      let header = 'Zähldatum;Schwerverkehrsanteil;Kraftfahrzeugverkehr;Güterverkehr;Schwerverkehr;Gesamt';
      let row1 = '01.01.1990';
      let row2 = '23.04.2005';
      let row3 = '25.06.2011';
      let row4 = '11.08.2014';
      let row5 = '29.06.2019';
      for(let index = 0; index < this.data[0].length; index++) {
        row1 += `;${this.data[0][index]}`;
        row2 += `;${this.data[1][index]}`;
        row3 += `;${this.data[2][index]}`;
        row4 += `;${this.data[3][index]}`;
        row5 += `;${this.data[4][index]}`;
      }
      rows.push(header);
      rows.push(row1);
      rows.push(row2);
      rows.push(row3);
      rows.push(row4);
      rows.push(row5);
      let csvContent = "data:text/csv;charset=UTF-8,"
          + rows.join("\n");
      let encodedUri = encodeURI(csvContent);
      let link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `zeitreihe.csv`);
      document.body.appendChild(link); // Required for FF

      link.click(); // This will download the data file named "my_data.csv".
    }

  }
</script>