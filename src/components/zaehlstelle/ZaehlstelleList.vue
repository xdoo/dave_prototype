<template>
  <div>
    <v-data-table
        :headers="headers"
        :items="zaehlstellen"
        :footer-props="{
                    'items-per-page-options': [5, 10, 15, 20]
                }"
        :options.sync="listOptions"
        :server-items-length="totalElements"
        :loading="loading"
        loading-text="Lade Daten....."
        @click:row="navigate"
    >
      <template v-slot:no-data>
        ⚠ Keine Ergebnisse gefunden.
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue, Watch} from "vue-property-decorator";
  // eslint-disable-next-line no-unused-vars
  import Zaehlstelle from "@/types/zaehlstelle/Zaehlstelle";
  // eslint-disable-next-line no-unused-vars
  import SearchOptions from "@/types/SearchOptions";
  // eslint-disable-next-line no-unused-vars
  import ZaehlstelleSearchObject from "@/types/zaehlstelle/ZaehlstelleSearchObject";

  @Component
  export default class ZaehlstellenListe extends Vue {

    @Prop()
    private zaehlstellen!: ZaehlstelleSearchObject[];
    @Prop()
    private searchOptions!: SearchOptions;
    @Prop()
    private totalElements!: number;
    @Prop()
    private loading!: boolean;

    // searchOptions sind die Default-Optionen für die Suche (Seite 1, 10 Items pro Seite,...)
    // Da das ein übergabeparameter ist, darf ich den aber in der Liste nicht verändern, daher gibt es noch die listOptions.
    // Die Watch-Methode schaut, ob sich der wert der listOptions ändert, wenn ja wird ein Input-Event an die die Suche geworfen.
    private listOptions: SearchOptions = {} as SearchOptions;

    private headers = [
      {text: "Zählstellennummer", value: "zaehlstellennummer", width: "20%"},
      {text: "Zählart", value: "zaehlart", width: "11%"},
      {text: "Zähldatum", value: "zaehlungen[0].zaehldatum", width: "14%", sortable: false},
      {text: "Straßenname 1", value: "zaehlungen[0].knotenarme[0].strassenname", width: "16%"},
      {text: "Straßenname 2", value: "zaehlungen[0].knotenarme[1].strassenname", width: "16%"},
      {text: "Platzname", value: "platzname", width: "16%", divider: true},
    ];

    mounted() {
      this.listOptions = this.searchOptions;
    }

    private sort(zaehlstelle: ZaehlstelleSearchObject):void {
      zaehlstelle.zaehlungen = zaehlstelle.zaehlungen.sort((a, b) => {
        return Number.parseInt(a.zaehldatum.toString().replace(/-/g, '')) - Number.parseInt(b.zaehldatum.toString().replace(/-/g, ''));
      });
      zaehlstelle.zaehlungen.forEach(value => {
        value.knotenarme = value.knotenarme.sort((a, b) => {
          return Number.parseInt(a.knotenarmnummer) - Number.parseInt(b.knotenarmnummer);
        } )
      })
    }

    @Watch("zaehlstellen")
    private zaehlstellenChanged() {
      this.zaehlstellen.forEach(zaehlstelle =>  {
        this.sort(zaehlstelle);
      });
    }

    @Watch("listOptions", {deep: true})
    private optionsChanged() {
      (this as Vue).$emit("input", this.listOptions);
    }

    private navigate(zaehlstelle: ZaehlstelleSearchObject) {
      this.$router.push(`/zaehlstelle/${zaehlstelle.id}`);
    }
  }
</script>

