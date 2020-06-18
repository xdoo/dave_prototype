<template>
  <v-app>
    <v-overlay
        :absolute="true"
        :value="!hasRelevantRole"
        :light="true"
    >
      <v-spacer/>
      <h3 class="display-2 font-weight-bold mb-0 red--text text-center">
        Sie haben nicht die erforderliche Berechtigung zur Benutzung dieser Anwendung.
      </h3>
      <v-spacer/>
    </v-overlay>
    <TheSnackbar/>
    <v-app-bar app clipped-left dark color="primary">
      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon> -->

      <router-link to="/">
        <v-toolbar-title class="font-weight-bold">
          <span class="secondary--text" style="font-size: x-large">D</span>
          <span class="white--text" style="font-size: medium">atenbank und </span>
          <span class="secondary--text" style="font-size: x-large">A</span>
          <span class="white--text" style="font-size: medium">uswertungen von </span>
          <span class="secondary--text" style="font-size: x-large">Ve</span>
          <span class="white--text" style="font-size: medium">rkehrszählungen</span>
        </v-toolbar-title>

      </router-link>
      <v-spacer></v-spacer>
      <!--
              Erstmal ausgenommen, damit es nicht verwirrt welches Suchfeld gilt.
              Kann Später für die Schnellsuche verwendet werden.
            -->

      <v-autocomplete
          id="suchfeld"
          flat
          solo-inverted
          dense
          hide-details
          label="Schnellsuche"
          clearable
          v-model="searchQuery"
          prepend-inner-icon="mdi-magnify"
          @keyup.enter="quickSearch"
          color="black"
          :items="suggests"
          return-object
      >
        <template v-slot:no-data>
          <v-list class="pa-3">
            <v-list-item-title>
              Kein Suchergebnis...
            </v-list-item-title>
          </v-list>
        </template>
        <template v-slot:item="{ item }">
          <v-list-item-content>
            <v-list-item-title v-if="item.type === 'search'">
              <v-icon small>mdi-magnify</v-icon>
              {{item.text}}
            </v-list-item-title>
            <v-list-item-title v-if="item.type === 'count'" @click="showMe">
              <v-icon small>mdi-counter</v-icon>
              {{item.text}}
            </v-list-item-title>
            <v-list-item-title v-if="item.type === 'counter'" @click="showMe">
              <v-icon small >mdi-map-marker</v-icon>
              {{item.text}}
            </v-list-item-title>
          </v-list-item-content>
        </template>
      </v-autocomplete>

      <v-spacer></v-spacer>
      <span> {{ this.loggedInUser }} </span>
    </v-app-bar>
    <!--<v-navigation-drawer app clipped v-model="drawer">
      <v-list dense>
        <v-list-item :to="{path: '/zaehlstelleoverview'}">
          <v-list-item-action>
            <v-icon>mdi-map-marker-multiple-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Zählstellen</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item :to="{path: '/chartdemo'}">
          <v-list-item-action>
            <v-icon>mdi-google-downasaur</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Chart Demo</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-footer absolute>
        <v-col class="text-center">
          <div style="font-size: small">Backend - {{ backendVersion }}</div>
          <div style="font-size: small">Frontend - {{ frontendVersion }}</div>
        </v-col>
      </v-footer>
    </v-navigation-drawer>
    -->
    <v-content class="main">
      <v-container fluid fill-height class="pa-0">
        <v-fade-transition mode="out-in">
          <router-view></router-view>
        </v-fade-transition>
      </v-container>
    </v-content>
  </v-app>
</template>

<style>
  .main {
    background-color: white;
  }
</style>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import TheSnackbar from '@/components/TheSnackbar.vue';
  import SsoUserInfoService from "@/api/service/SsoUserInfoService";
  // eslint-disable-next-line no-unused-vars
  import SsoUserInfoResponse from "@/types/SsoUserInfoResponse";

  @Component({
    components: {TheSnackbar}
  })
  export default class App extends Vue {

    private hasRelevantRole: boolean = false;

    private loggedInUser: String = "Prototype";

    private relevantRole1: string = "ROLE_clientrole_anwender";
    private relevantRole2: string = "ROLE_clientrole_spezialanwender";
    private relevantRole3: string = "ROLE_clientrole_fachlicher_administrator";


    // Versionen
    private backendVersion: string = "";
    private frontendVersion: string = "";

    private searchQuery: any = {};
    private drawer: boolean = true;

    // mounted() {
    // this.query = this.$route.params.query;
    // }

    // Lifecycle hook
    created() {
      if (this.$store.getters["security/isNoSecurityActive"]) {
        this.hasRelevantRole = true;
      } else {
        this.hasUserRelevantRole().then((hasRelevantRole: boolean) => {
          this.hasRelevantRole = hasRelevantRole;
        })
      }
    }

    private async hasUserRelevantRole(): Promise<boolean> {
      return await SsoUserInfoService.getUserInfo()
          .then((ssoUserInfoResponse: SsoUserInfoResponse) => {
            this.loggedInUser = ssoUserInfoResponse.name;
            // TODO: Schoener machen :)
            return ssoUserInfoResponse.user_roles.includes(this.relevantRole1) || ssoUserInfoResponse.user_roles.includes(this.relevantRole2) || ssoUserInfoResponse.user_roles.includes(this.relevantRole3);
          }).catch(() => {
            return false;
          });
    }

    //Navigiert zur Seite mit den Suchergebnissen und sendet ein Event zum Auslösen weiterer Suchen.
    private quickSearch() {
      if (this.searchQuery !== '' && this.searchQuery != null) {
        if(this.searchQuery.type === "search") {
          this.$store.dispatch('search/dummyresult', this.searchQuery.ids)
        } else {
          this.showMe(this.searchQuery.counterId)
        }
      }
    }

    private showMe(id: string) {
      this.$router.push("/chartdemo/" + id);
    }

    get suggests() {
      return [
        {text: '1 Altstadt - Lehel', type: 'search', counterId: '', ids: []},
        {text: '10 Moosach', type: 'search', counterId: '', ids: [10, 11, 12, 15, 16, 17, 18]},
        {text: 'Moosach', type: 'search', counterId: '', ids: [10, 11, 12, 15, 16, 17, 18]},
        {text: 'Moosach Bahn', type: 'search', counterId: '', ids: [10, 19]},
        {text: '11 Milbertshofen - Am Hart', type: 'search', counterId: '', ids: []},
        {text: '12 Schwabing - Freimann', type: 'search', counterId: '', ids: []},
        {text: '13 Bogenhausen', type: 'search', counterId: '', ids: []},
        {text: 'Bogenhausen', type: 'search', counterId: '', ids: [1, 2, 3, 4, 5]},
        {text: 'Bogenhausen Isar', type: 'search', counterId: '', ids: [2, 3]},
        {text: 'Bogenhausen Denninger Str. / Vollmannstr.', type: 'counter', counterId: '1', ids: []},
        {text: 'Denniger Str. / Vollmannstr. ', type: 'counter', counterId: '1', ids: []},
        {text: 'Bogenhausen Truderinger Str. ', type: 'counter', counterId: '4', ids: []},
        {text: '8 Schwanthalerhöhe', type: 'search', counterId: '', ids: [6, 7, 8, 9]},
        {text: 'Schwanthalerhöhe', type: 'search', counterId: '', ids: [6, 7, 8, 9]},
        {text: 'Schwanthalerhöhe Donnersberger Brücke', type: 'counter', counterId: '6', ids: []},
        {text: 'Donnersberger Brücke', type: 'counter', counterId: '6', ids: []},
        {text: '24.12.2019 Donnersberger Brücke', type: 'count', counterId: '6', ids: []},
        {text: '16.04.2018 Donnerberger Brücke', type: 'count', counterId: '6', ids: []},
        {text: '12.08.2015 Donnersberger Brücke', type: 'count', counterId: '6', ids: []},
        {text: '16.04.2018 Denninger Str.', type: 'count', counterId: '6', ids: []},
        {text: 'AZ4711 16.04.2018 Donnersbergerbrücke ', type: 'count', counterId: '6', ids: []},
        {text: 'Dachauerstraße', type: 'search', counterId: '', ids: [10, 11, 12, 13, 14, 15, 16, 17, 18]},
        {text: 'Bahn', type: 'search', counterId: '', ids: [4, 6, 10, 19]},
        {text: 'Isar', type: 'search', counterId: '', ids: [2, 3]},
        {text: 'Dachauerstraße Ampelschaltung', type: 'search', counterId: '', ids: [11, 12, 15]},
        {text: 'Dachauerstraße Umbau Trambahn', type: 'search', counterId: '', ids: [13, 14, 17, 18]},
        {text: 'Bahn Brücke', type: 'search', counterId: '', ids: [6, 19]},
        {text: 'Bahn Unterführung', type: 'search', counterId: '', ids: [4, 10]},
        {text: 'Brücke', type: 'search', counterId: '', ids: [6, 19, 2, 3]},
        {text: 'Unterführung', type: 'search', counterId: '', ids: [4, 10]},
        {text: 'Dachauerstraße Radverkehr', type: 'search', counterId: '', ids: [20, 11, 12]},
        {text: 'Dachauerstraße Radverkehr Hugo-Troendle-Straße', type: 'count', counterId: '20', ids: []},
        {text: 'Dachauerstraße Radverkehr Pelkovenstraße', type: 'count', counterId: '11', ids: []},
        {text: 'Dachauerstraße Radverkehr Wintrichring', type: 'count', counterId: '12', ids: []},
        {text: 'Dachauerstraße Schwerverkehr', type: 'count', counterId: '10', ids: []},
        {text: 'Dachauerstraße Regen', type: 'search', counterId: '', ids: [11, 12, 15, 18]},
        {text: 'Effnerplatz Regen', type: 'count', counterId: '5', ids: []},
        {text: 'Dachauerstraße Regen 2018 ', type: 'count', counterId: '11', ids: []}
      ]
    }

  }
</script>
