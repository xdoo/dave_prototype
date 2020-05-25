import Zaehlart from "@/types/zaehlstelle/Zaehlart";
import BaseEntity from "@/types/BaseEntity";

export default interface Zaehlstelle extends BaseEntity {
  zaehlstellennummer: number;
  zaehlart: Zaehlart;
  stadtbezirksnummer: number;
  platzname: string;
  kommentar: string;
  xkoordinate: string;
  ykoordinate: string;
}