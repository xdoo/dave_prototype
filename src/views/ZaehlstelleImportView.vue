<template>
  <v-container style="width: 70em; max-width: 100%">
    <div class="headline"> Das ist nur ein Beispiel!!!</div>
    <v-form ref="form" v-model="valid">
      <v-row>
        <v-col cols="12" md="6">
          <span class="title" style="margin-bottom: 0;">Datei auswählen</span>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn
                  x-small
                  dark
                  fab
                  id="import-zaehlstelle-btn"
                  class="mb-1 ml-4"
                  v-on="on"
                  color="primary"
                  @click="openFileChooser"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
            <span>Datei importieren</span>
          </v-tooltip>
        </v-col>
      </v-row>

      <input id="fileInputHidden" ref="fileInput" type="file" accept=".csv" @change="onFileSelect" hidden/>

    </v-form>
  </v-container>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {Levels} from "@/api/error";
  import ImportService from "@/api/service/ImportService";
  // eslint-disable-next-line no-unused-vars
  import ImportObject from "@/types/ImportObject";

  @Component
  export default class ZaehlstelleImportView extends Vue {
    private valid = false;

    mounted() {
      window.scrollTo(0, 0);
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
  }
</script>
