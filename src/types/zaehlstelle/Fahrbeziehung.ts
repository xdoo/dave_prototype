import BaseEntity from "@/types/BaseEntity";
import Zeitintervall from "@/types/zaehlstelle/Zeitintervall";
import Hochrechnungsfaktor from "@/types/zaehlstelle/Hochrechnungsfaktor";

export default interface Fahrbeziehung extends BaseEntity {
  vonKnotenarm: string;
  nachKnotenarm: string;
  strassenname: string;
  winkel: number;
  vonknotvonstrnr: string;
  nachknotvonstrnr: string;
  von_strnr: string;
  vonknotnachstrnr: string;
  nachknotnachstrnr: string;
  nach_strnr: string;
  zeitintervalle: Zeitintervall[];
  hochrechnungsfaktor: Hochrechnungsfaktor;
}