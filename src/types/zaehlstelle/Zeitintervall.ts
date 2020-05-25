import BaseEntity from "@/types/BaseEntity";

export default interface Zeitintervall extends BaseEntity {
  startUhrzeit: string;
  endeUhrzeit: string;
  pkw: number;
  lkw: number;
  lastzuege: number;
  busse: number;
  kraftraeder: number;
  fahrradfahrer: number;
  fussgaenger: number;
}