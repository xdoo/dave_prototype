<template>
  <div>
    <v-form ref="form" v-model="valid" v-if="!onlyInactiveItems">
      <v-row align="center" justify="center">
        <v-col cols="12" md="5">
          <v-text-field
              @keyup.enter.native="newSearch"
              v-model="searchString"
              label="Zählstellennumer, Platzname oder Projektnummer"
              hide-details
              clearable
              dense
              outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="5">
          <v-select
              @keyup.enter.native="newSearch"
              v-model="selectedZaehlart"
              :items="zaehlartenArten"
              label="Zählart"
              clearable
              dense
              outlined
              hide-details></v-select>
        </v-col>
        <v-col cols="12" md="2">
          <v-btn
              class="self-center"
              @click="newSearch"
              :loading="loading"
              color="primary">
            <v-icon left dark>mdi-magnify</v-icon>
            Suchen
          </v-btn>
        </v-col>
      </v-row>
    </v-form>

    <v-row>
      <v-col cols="12" md="10">
        <zaehlstelle-list :zaehlstellen="zaehlstellen" :loading="loading" :total-elements="totalZaehlstellen" :search-options="searchParams.searchOptions"
                            @input="pageChanged"/>
      </v-col>
    </v-row>

  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
  import ZaehlstellenService from "../../api/service/ZaehlstellenService";
  // eslint-disable-next-line no-unused-vars
  import ZaehlstelleSearchResult from "@/types/zaehlstelle/ZaehlstelleSearchResult";
  import Zaehlart, {ZaehlartToBeschreibung} from "@/types/zaehlstelle/Zaehlart";
  import ZaehlstelleSearchParams from "@/types/zaehlstelle/ZaehlstelleSearchParams";
  import ZaehlstelleList from "@/components/zaehlstelle/ZaehlstelleList.vue";
  import SearchOptions from "@/types/SearchOptions";
  // eslint-disable-next-line no-unused-vars
  import ZaehlstelleSearchObject from "@/types/zaehlstelle/ZaehlstelleSearchObject";

  @Component({
    components: {ZaehlstelleList}
  })
  export default class ZaehlstelleSearch extends Vue {

    @Prop()
    private onlyInactiveItems!: boolean;

    @Prop()
    private quickSearchQuery!: string;

    private valid: boolean = false;

    private searchString: string = "";
    private selectedZaehlart: Zaehlart = '' as Zaehlart;
    private zaehlartenArten: any = [];

    private loading: boolean = false;

    // Suchoptionen
    private defaultSearchOptions: SearchOptions = new SearchOptions(1,10,["zaehlstellennummer"],[false]);
    private searchParams: ZaehlstelleSearchParams = new ZaehlstelleSearchParams(this.defaultSearchOptions, "", this.onlyInactiveItems);
    private totalZaehlstellen: number = 0;

    // Ergebnis
    private zaehlstellen: ZaehlstelleSearchObject[] = [];

    mounted() {
      window.scrollTo(0, 0);
      this.zaehlartenArten = Object.values(Zaehlart).map(key => {
        return {
          text: ZaehlartToBeschreibung.get(key) as string,
          value: key
        };
      });
      if(this.quickSearchQuery !== '' && this.quickSearchQuery != null) {
        this.searchString = this.quickSearchQuery;
        this.newSearch();
      }
    }

    @Watch('quickSearchQuery')
    function(query: string) {
      if (query !== '' && query != null)
        this.searchString = query;
        this.newSearch();
    }

    @Watch("zaehlstellen", {deep: true})
    private zaehlstellenChanged() {
      (this as Vue).$emit("input", this.zaehlstellen);
    }

    private newSearch() {
      if (!this.loading && this.valid) {
        this.searchParams = new ZaehlstelleSearchParams(this.defaultSearchOptions, this.searchString === null ? '' : this.searchString, this.onlyInactiveItems, this.selectedZaehlart);
        this.search(this.searchParams);
      }
    }

    // Wird aufgerufen, wenn bei der Ergebnissliste die Seite gewechselt wird
    private pageChanged(newSearchOptions: SearchOptions) {
      if (this.searchParams.searchOptions !== newSearchOptions) {
        this.searchParams.searchOptions = newSearchOptions;
        this.search(this.searchParams)
      }
    }

    private search(searchParams: ZaehlstelleSearchParams | undefined) {
      if (searchParams === undefined) {
        return;
      }

      if (this.searchParams.searchOptions.page === 0) {
        this.zaehlstellen = []
      }

      this.loading = true;
      this.searchParams.searchOptions.sort = this.searchParams.searchOptions.sortBy && this.searchParams.searchOptions.sortBy[0] ? this.searchParams.searchOptions.sortBy[0] : "zaehlstellennummer";
      this.searchParams.searchOptions.reverse = this.searchParams.searchOptions.sortDesc && this.searchParams.searchOptions.sortDesc[0] ? this.searchParams.searchOptions.sortDesc[0] : false;
      ZaehlstellenService.searchZaehlstelle(searchParams)
          .then((response: ZaehlstelleSearchResult) => {
            this.zaehlstellen = response.zaehlstellen;
            this.totalZaehlstellen = response.totalElements;
          })
          .catch(error => {
            this.$store.dispatch('snackbar/showError', error);
          })
          .finally(() => {
            this.loading = false;
          });
    }
  }
</script>
