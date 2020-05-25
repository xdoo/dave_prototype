<template>
  <v-container>
    <v-layout
        text-center
        wrap
    >
<!--      <v-flex xs12>-->
<!--        <v-img-->
<!--            :src="require('../assets/logo_dave.png')"-->
<!--            class="my-3"-->
<!--            contain-->
<!--            height="200"-->
<!--        />-->
<!--      </v-flex>-->

<!--      <v-flex mb-4>-->
<!--        <h1 class="display-2 font-weight-bold mb-3">-->
<!--          Willkommen bei DAVe-->
<!--        </h1>-->
<!--        <h2>-->
<!--          Datenbank und Auswertungen von Verkehrszählungen-->
<!--        </h2>-->
<!--        <p>Das API-Gateway ist: <span :class="status">{{status}}</span></p>-->
<!--      </v-flex>-->
<!--    <my-map/>-->
    </v-layout>
  </v-container>
</template>

<style scoped>
  .UP {
    color: limegreen;
  }

  .DOWN {
    color: lightcoral;
  }
</style>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import HealthService from "@/api/service/HealthService";
  import MyMap from "@/components/map/MyMap.vue";

  @Component({
    components: {MyMap}
  })
  export default class App extends Vue {

    private status: string = "DOWN";

    mounted() {
      window.scrollTo(0, 0);
      HealthService.checkHealth()
          .then((content: any) => this.status = content.status)
          .catch(error => {
            this.$store.dispatch('snackbar/showError', error);
          })
    }

  }
</script>