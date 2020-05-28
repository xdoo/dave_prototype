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
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

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

      <v-text-field
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
      ></v-text-field>

      <v-spacer></v-spacer>
      <span> {{ this.loggedInUser }} </span>
    </v-app-bar>
    <v-navigation-drawer app clipped v-model="drawer">
      <v-list dense>
        <v-list-item :to="{path: '/zaehlstelleoverview'}">
          <v-list-item-action>
            <v-icon>mdi-map-marker-multiple-outline</v-icon>
            <!--            <v-icon> mdi-magnify</v-icon>-->
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
  import VersionInfoService from "@/api/service/VersionInfoService";
  // eslint-disable-next-line no-unused-vars
  import SsoUserInfoResponse from "@/types/SsoUserInfoResponse";
  // eslint-disable-next-line no-unused-vars
  import VersionInfoResponse from "@/types/VersionInfoResponse";

  @Component({
    components: {TheSnackbar}
  })
  export default class App extends Vue {

    private hasRelevantRole: boolean = false;

    private loggedInUser: String = "no-security";

    private relevantRole1: string = "ROLE_clientrole_anwender";
    private relevantRole2: string = "ROLE_clientrole_spezialanwender";
    private relevantRole3: string = "ROLE_clientrole_fachlicher_administrator";


    // Versionen
    private backendVersion: string = "";
    private frontendVersion: string = "";

    private searchQuery: string = '';
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
      this.getFrontendVersion().then((version: string) => {
        this.frontendVersion = version;
      });

      this.getBackendVersion().then((version: string) => {
        this.backendVersion = version;
      });
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

    private async getFrontendVersion(): Promise<string> {
      return await VersionInfoService.getFrontendInfo()
          .then((frontendInfoResponse: VersionInfoResponse) => {
            return frontendInfoResponse.application.version;
          }).catch(() => {
            return "error";
          });
    }

    private async getBackendVersion(): Promise<string> {
      return await VersionInfoService.getBackendInfo()
          .then((backendInfoResponse: VersionInfoResponse) => {
            return backendInfoResponse.application.version;
          }).catch(() => {
            return "error";
          });
    }

    //Navigiert zur Seite mit den Suchergebnissen und sendet ein Event zum Auslösen weiterer Suchen.
    private quickSearch() {
      if (this.searchQuery !== '' && this.searchQuery != null) {
        this.$router.push(`/zaehlstelleoverview/${this.searchQuery}`);
      }
    }

  }
</script>
