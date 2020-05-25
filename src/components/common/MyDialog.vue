<template>
  <v-dialog
      v-model="value"
      persistent
      width="800"
  >
    <v-card>
      <v-card-title>
        Mein Dialog
      </v-card-title>
      <v-card-text>
        {{ zaehlstelle.zaehlstellennummer }}
        {{ zaehlstelle.zaehlart }}
        {{ zaehlstelle.xkoordinate }}
        {{ zaehlstelle.ykoordinate }}
        {{ zaehlstelle.platzname }}
        {{ zaehlstelle.kommentar }}
        {{ zaehlstelle.zaehlungen[0].zaehldatum }}
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn
            id="mydialog-btn-closeDialog"
            color="primary"
            @click="closeDialog"
        >
          Schließen
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">

  import {Component, Prop, Vue} from "vue-property-decorator";
  // eslint-disable-next-line no-unused-vars
  import ZaehlstelleSearchObject from "@/types/zaehlstelle/ZaehlstelleSearchObject";

  /**
   * Der YesNo-Dialog ist ein generischer Dialog zur binären Abfrage beim Nutzer.
   * So kann z.B. die Bestätigung für das Löschen einer Entität damit realisiert werden.
   *
   * Da das Bestätigen einer Aktion in der Regel mit einem Button zusammenhängt, bietet der
   * YesNoDialog diesen gleich mit an. Über `buttontext` und `icontext` kann dieser konfiguriert werden.
   *
   * Wenn sowohl kein `buttontext` als auch `icontext` nicht gesetzt sind, kann der YesNoDialog auch
   * als reiner Dialog verwendet werden. Hierzu wird das Value vom Dialog durchgereicht.
   *
   * Die Bestätigung des Dialogs wird über ein `yes` Event signalisiert. Analog erfolgt die
   * Signalisierung der Abweisung durch ein `no` Event.
   *
   * Beispiel:
   * <yes-no-dialog
   *    v-model="deleteDialog"
   *    buttontext="Löschen"
   *    dialogtitle="Löschen?"
   *    dialogtext="Wollen Sie die Entität wirklich löschen?"
   *    @no="deleteDialog = false"
   *    @yes="deleteSome"></yes-no-dialog>
   */

  @Component
  export default class MyDialog extends Vue {
    /**
     * Steuerflag für den Dialog
     */
    @Prop()
    value!: boolean;

    @Prop()
    zaehlstelle!:ZaehlstelleSearchObject;


    closeDialog(): void {
      // this.value = false;
      this.$emit('closeDialog');
    }
  }
</script>