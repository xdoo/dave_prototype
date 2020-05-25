import Zaehlart from "@/types/zaehlstelle/Zaehlart";
import Zaehlart from "@/types/zaehlstelle/Zaehlart";
<template>
  <v-container style="width: 70em; max-width: 100%">
    <div class="headline"> {{ this.headline }}</div>
    <v-form ref="form" v-model="valid">

      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
              label="Zählstellennummer*"
              outlined
              dense
              v-model="zaehlstelle.zaehlstellennummer"
              :disabled="editMode"
              counter="6"
              maxlength="6"
              :rules="this.$lhmGetRule('ZAEHLSTELLENNUMMER')"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-autocomplete
              outlined
              :items="zaehlarten"
              dense
              label="Zählart"
              v-model="zaehlstelle.zaehlart"
              :disabled="editMode"
              :rules="this.$lhmGetRule('REQUIRED')"
          ></v-autocomplete>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-autocomplete
              outlined
              :items="stadtbezirke"
              dense
              label="Stadtbezirksnummer"
              v-model="zaehlstelle.stadtbezirksnummer"
              :disabled="disabled"
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
              label="Platzname"
              outlined
              dense
              counter="255"
              maxlength="255"
              v-model="zaehlstelle.platzname"
              :disabled="disabled"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
              label="X-Koordinate*"
              outlined
              dense
              v-model="zaehlstelle.xkoordinate"
              :disabled="disabled"
              :rules="this.$lhmGetRule('KOORDINATE')"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
              label="Y-Koordinate*"
              outlined
              dense
              v-model="zaehlstelle.ykoordinate"
              :disabled="disabled"
              :rules="this.$lhmGetRule('KOORDINATE')"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="12">
          <v-textarea
              label="Kommentar"
              outlined
              dense
              counter="1000"
              maxlength="1000"
              v-model="zaehlstelle.kommentar"
              :disabled="disabled"
          ></v-textarea>
        </v-col>
      </v-row>

      <v-btn color="secondary"
             @click="cancel()"
             class="ml-5 mr-5">
        Abbrechen
      </v-btn>

      <v-btn v-if="!disabled"
             color="primary"
             @click="saveOrUpdate()"
             :disabled="disableButton"
             class="ml-5 mr-5">
        Speichern
      </v-btn>

      <v-btn v-else
             color="primary"
             @click="resetDisabled"
             class="ml-5 mr-5">
        Bearbeiten
      </v-btn>

    </v-form>
  </v-container>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import ZaehlstellenService from "../api/service/ZaehlstellenService";
  // eslint-disable-next-line no-unused-vars
  import Zaehlstelle from "@/types/zaehlstelle/Zaehlstelle";
  import {Levels} from "@/api/error";
  // eslint-disable-next-line no-unused-vars
  import KeyVal from "@/types/KeyVal";
  import Zaehlart, {ZaehlartToBeschreibung} from "@/types/zaehlstelle/Zaehlart";
  import {StadtbezirkToBeschreibung} from "@/types/zaehlstelle/Stadtbezirk";

  interface KeyValStadtbezirk {
    text: string;
    value: number
  }

  @Component
  export default class ZaehlstelleView extends Vue {

    private disabled: boolean = false;

    private valid = false;

    private zaehlarten: KeyVal[] = [];

    private stadtbezirke: KeyValStadtbezirk[] = [];

    private zaehlstelle: Zaehlstelle = this.emptyZaehlstelle();


    // Computed Properties
    get headline(): string {
      return this.editMode ? "Zählstelle bearbeiten" : "Zählstelle anlegen";
    }

    get editMode(): boolean {
      return (this.$route.params.id !== undefined && this.$route.params.id !== null);
    }

    get disableButton(): boolean {
      return !this.valid || this.areRequiredFieldsEmtpy;
    }

    get areRequiredFieldsEmtpy(): boolean {
      // check for null and undefined
      return this.zaehlstelle.zaehlstellennummer == null
          || this.zaehlstelle.xkoordinate == null
          || this.zaehlstelle.ykoordinate == null;
    }


    mounted() {
      window.scrollTo(0, 0);

      // Zaehlarten laden
      this.zaehlarten = Object.values(Zaehlart).map(key => {
        return {
          text: ZaehlartToBeschreibung.get(key) as string,
          value: key
        };
      });

      // Stadtbezirke laden
      StadtbezirkToBeschreibung.forEach((value: string, key: number) => {
        this.stadtbezirke.push({
          text: value,
          value: key
        })
      });

      // Wenn ID vorhanden, dann Daten laden
      if (this.editMode) {
        this.disabled = true;
        ZaehlstellenService.getZaehlstelleById(this.$route.params.id).then(zaehlstelle => {
          this.zaehlstelle = zaehlstelle;
        });
      } else {
        this.zaehlstelle = this.emptyZaehlstelle();
      }
    }

    private cancel() {
      this.zaehlstelle = this.emptyZaehlstelle();
      this.$router.back();
    }

    private saveOrUpdate() {
      if (this.valid) {
        if (this.editMode) {
          this.update();
        } else {
          this.save();
        }
      } else {
        this.$store.dispatch('snackbar/showToast', {
          snackbarTextPart1: "Ungültige Eingabe! Bitte die Eingabefelder kontrollieren.",
          level: Levels.WARNING
        });
        window.scrollTo(0, 0);
      }
    }

    private save() {
      ZaehlstellenService.saveZaehlstelle(this.zaehlstelle).then(zaehlstelle => {
        this.zaehlstelle = zaehlstelle;
        this.$store.dispatch('snackbar/showToast', {
          snackbarTextPart1: `Die Zählstelle wurde erfolgreich gespeichert.`,
          level: Levels.SUCCESS
        });
        this.$router.back();
      }).catch(error => {
        this.$store.dispatch('snackbar/showError', error);
      }).finally(() => {
        window.scrollTo(0, 0);
      });
    }

    private update() {
      ZaehlstellenService.updateZaehlstelle(this.zaehlstelle).then(zaehlstelle => {
        this.zaehlstelle = zaehlstelle;
        this.$store.dispatch('snackbar/showToast', {
          snackbarTextPart1: `Die Zählstelle wurde erfolgreich aktualisiert.`,
          level: Levels.SUCCESS
        });
        this.$router.back();
      }).catch(error => {
        this.$store.dispatch('snackbar/showError', error);
      }).finally(() => {
        window.scrollTo(0, 0);
      });
    }

    private emptyZaehlstelle(): Zaehlstelle {
      return {
        zaehlart: Zaehlart.KLASSISCH
      } as Zaehlstelle;
    }

    private resetDisabled() {
      this.disabled = false;
    }

  }

</script>
