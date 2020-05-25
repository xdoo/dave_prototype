<template>
  <v-card flat>
    <v-container>
      <zaehlstelle-search :quick-search-query="quickSearchQuery" :only-inactive-items="false" @input="zaehlstellenChanged"/>

      <my-map :zaehlstellen="zaehlstellen" @dialogInput="openDialog"/>

      <my-dialog :value="dialog" :zaehlstelle="dialogInput" v-if="dialog" @closeDialog="closeDialog"/>

      <!--Button: Hinzufügen-->
      <!-- TODO: absichern -->
      <v-tooltip left>
        <template v-slot:activator="{ on }">
          <v-speed-dial
              v-model="speedDial"
              direction="top"
              bottom
              right
              fixed
          >
            <v-btn
                id="create"
                slot="activator"
                dark
                fab
                color="primary"
                v-model="speedDial"
                v-on="on"
            >
              <v-icon v-if="speedDial">mdi-close</v-icon>
              <v-icon v-else>mdi-plus</v-icon>

            </v-btn>
            <v-tooltip left>
              <template #activator="{ on }">
                <v-btn
                    fab
                    dark
                    small
                    color="blue"
                    v-on="on"
                    @click="openFileChooser"
                >
                  <v-icon>mdi-map-marker-up</v-icon>
                </v-btn>
              </template>
              <span>Zählstelle importieren</span>
            </v-tooltip>
            <v-tooltip left>
              <template #activator="{ on }">
                <v-btn
                    fab
                    dark
                    small
                    color="blue"
                    v-on="on"
                    to="/zaehlstelle"
                >
                  <v-icon>mdi-map-marker-plus-outline</v-icon>
                </v-btn>
              </template>
              <span>Zählstelle anlegen</span>
            </v-tooltip>
          </v-speed-dial>
        </template>
        <span>Zählstelle hinzufügen</span>
      </v-tooltip>

      <input id="fileInputHidden" ref="fileInput" type="file" accept=".csv" @change="onFileSelect" hidden/>

    </v-container>
  </v-card>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import ZaehlstelleSearch from "@/components/zaehlstelle/ZaehlstelleSearch.vue";
  // eslint-disable-next-line no-unused-vars
  import ImportObject from "@/types/ImportObject";
  import ImportService from "@/api/service/ImportService";
  import {Levels} from "@/api/error";
  import MyMap from "@/components/map/MyMap.vue";
  import MyDialog from "@/components/common/MyDialog.vue";
  // eslint-disable-next-line no-unused-vars
  import ZaehlstelleSearchObject from "@/types/zaehlstelle/ZaehlstelleSearchObject";

  @Component({
    components: {ZaehlstelleSearch, MyMap, MyDialog}
  })
  export default class ZaehlstelleOverview extends Vue {

    private speedDial: boolean = false;

    private zaehlstellen: ZaehlstelleSearchObject[] = [];

    private dialog:boolean = false;
    private dialogInput:ZaehlstelleSearchObject = {} as ZaehlstelleSearchObject;

    mounted() {
      window.scrollTo(0, 0);
    }

    get quickSearchQuery() {
      return this.$route.params.quickSearch;
    }

    private openFileChooser() {
      const element = document.getElementById("fileInputHidden");
      if (element) {
        element.click();
      }
    }

    private onFileSelect(event: any) {
      let importObject: ImportObject = {} as ImportObject;
      const selectedFile = event.target.files[0];
      importObject.fileName = selectedFile.name;

      let that = this;

      const fileReader = new FileReader();

      // Eventlistener für das 'load'-Event
      fileReader.addEventListener("load", function () {
        importObject.data = (fileReader.result as string).split(/\r\n|\n/);
        ImportService.sendData(importObject).then(res => {
          that.$store.dispatch('snackbar/showToast', {
            level: Levels.INFO,
            snackbarTextPart1: res
          });
        })
      }, false);

      if (selectedFile) {
        if (this.wrongFileType(selectedFile)) {
          that.$store.dispatch('snackbar/showToast', {
            level: Levels.WARNING,
            snackbarTextPart1: `Ungültiges Dateiformat.`,
            snackbarTextPart2: `Es werden nur CSV-Dateien unterstützt und keine ${selectedFile.name.split('.').pop().toUpperCase()}-Dateien.`
          });
        } else {
          // Das 'load'-Event wird ausgelöst, sobald der FileReader das Laden beendet hat.
          fileReader.readAsText(selectedFile);
        }
      }
    }

    private wrongFileType(file: File) {
      // return !(file.type === 'application/pdf' || file.type.startsWith('image/'));
      return !(file.name.endsWith('.csv'));
    }

    // Wird aufgerufen, wenn sich die Suchergebnisse ändern
    private zaehlstellenChanged(zaehlstellen: ZaehlstelleSearchObject[]) {
      this.zaehlstellen = zaehlstellen;
    }

    private openDialog(zaehlstelle:ZaehlstelleSearchObject) {
      this.dialog = true;
      this.dialogInput = zaehlstelle;
    }

    private closeDialog() {
      this.dialog = false;
      this.dialogInput = {} as ZaehlstelleSearchObject;
    }

  }
</script>
