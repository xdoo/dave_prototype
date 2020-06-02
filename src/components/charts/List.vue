<template>
  <v-sheet
      ref="container"
      width="100%"
      height="100%">
    <v-data-table
        :headers="headers"
        :items="zeitintervalle"
        dense
        fixed-header
        loading-text="Lade Daten....."
        :items-per-page="5"
    >
      <template v-slot:no-data>
        ⚠ Keine Ergebnisse gefunden.
      </template>
    </v-data-table>
  </v-sheet>
</template>
<style>
  .echarts {
    width: 100%;
    height: 100%;
  }
</style>
<script lang="ts">
  import Vue from 'vue';
  import {Component} from "vue-property-decorator";
  // eslint-disable-next-line no-unused-vars
  import ZeitintervallObject from "@/components/charts/ZeitintervallObject";

  @Component
  export default class List extends Vue {

    private headers = [
      {text: "Zeitintervall", value: "zeitintervall", width: "19%", divider: true, sortable: false},
      {text: "PKW", value: "pkw", width: "9%", divider: true, sortable: false},
      {text: "LKW", value: "lkw", width: "9%", divider: true, sortable: false},
      {text: "LZ", value: "lz", width: "9%", divider: true, sortable: false},
      {text: "BUS", value: "bus", width: "9%", divider: true, sortable: false},
      {text: "Krd", value: "krd", width: "9%", divider: true, sortable: false},
      {text: "Rad", value: "rad", width: "9%", divider: true, sortable: false},
      {text: "Fuß", value: "fus", width: "9%", divider: true, sortable: false},
      {text: "KFZ", value: "kfz", width: "9%", divider: true, sortable: false},
      {text: "SV", value: "sv", width: "9%", divider: true, sortable: false},
      {text: "GV", value: "gv", width: "9%", divider: true, sortable: false},
    ];

    get zeitintervalle() {

      let dataArray = [];
      for(let index:number = 0; index < 96; index++) {
        let data:ZeitintervallObject = {} as ZeitintervallObject;
        data.zeitintervall = this.getZeitintervall(index);
        data.pkw = this.getRndInteger(10, 100);
        data.lkw = this.getRndInteger(0, 15);
        data.lz = this.getRndInteger(0, 20);
        data.bus = this.getRndInteger(2, 30);
        data.krd = this.getRndInteger(0, 50);
        data.rad = this.getRndInteger(0, 40);
        data.fus = this.getRndInteger(0, 20);
        // Summen aus den oberen Teilen
        data.gv = data.pkw + data.krd + data.lkw + data.lz;
        data.sv = data.gv + data.bus;
        data.kfz = data.sv + data.rad + data.fus;
        dataArray.push(data);

        // Stundensatz anlegen
        if(index%4 === 3) {
          let dataHour:ZeitintervallObject = {} as ZeitintervallObject;
          let element0 = dataArray[dataArray.length - 4];
          let element1 = dataArray[dataArray.length - 3];
          let element2 = dataArray[dataArray.length - 2];
          let element3 = dataArray[dataArray.length - 1];
          dataHour.zeitintervall = `${element0.zeitintervall.split('-')[0]}-${element3.zeitintervall.split('-')[1]} STD`;
          dataHour.pkw = element0.pkw + element1.pkw + element2.pkw + element3.pkw;
          dataHour.lkw = element0.lkw + element1.lkw + element2.lkw + element3.lkw;
          dataHour.lz = element0.lz + element1.lz + element2.lz + element3.lz;
          dataHour.bus = element0.bus + element1.bus + element2.bus + element3.bus;
          dataHour.krd = element0.krd + element1.krd + element2.krd + element3.krd;
          dataHour.rad = element0.rad + element1.rad + element2.rad + element3.rad;
          dataHour.fus = element0.fus + element1.fus + element2.fus + element3.fus;
          dataHour.gv = element0.gv + element1.gv + element2.gv + element3.gv;
          dataHour.sv = element0.sv + element1.sv + element2.sv + element3.sv;
          dataHour.kfz = element0.kfz + element1.kfz + element2.kfz + element3.kfz;
          dataArray.push(dataHour);
        }
      }
      return dataArray;
    }

    private getRndInteger(min:number, max:number) {
      return Math.floor(Math.random() * (max - min) ) + min;
    }

    private getZeitintervall(index:number) {
      // let hourAsString = `${Math.floor(index/4)}`
      // if(hourAsString.length < 2) {
      //   hourAsString = `0${hourAsString}`;
      // }
      // let nextHourAsString = `${Math.floor((index+1)/4)}`
      // if(nextHourAsString.length < 2) {
      //   nextHourAsString = `0${nextHourAsString}`;
      // }
      return `${this.getHours(index)}:${this.getMinutes(index)} - ${this.getHours(index+1)}:${this.getMinutes(index+1)}`
    }

    private getHours(index:number) {
      let hourAsString = `${Math.floor(index/4)}`
      return hourAsString.length < 2 ? `0${hourAsString}` : hourAsString;
    }

    private getMinutes(index:number) {
      let minuteAsString = `${(index%4)*15}`;
      return minuteAsString.length < 2 ? `0${minuteAsString}` : minuteAsString;
    }



  }
</script>