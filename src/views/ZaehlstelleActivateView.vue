<template>
  <v-card flat>
    <v-container>
      <div class="headline"> Das ist nur ein Beispiel!</div>
      <zaehlstelle-search :only-inactive-items="true"/>

    </v-container>
  </v-card>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import ZaehlstelleSearch from "@/components/zaehlstelle/ZaehlstelleSearch.vue";

  @Component({
    components: {ZaehlstelleSearch}
  })
  export default class ZaehlstelleActivateView extends Vue {

    private speedDial: boolean = false;

    mounted() {
      window.scrollTo(0, 0);
    }

  }
</script>
