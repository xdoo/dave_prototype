import BaseEntity from "@/types/BaseEntity";
import Quelle from "@/types/zaehlstelle/Quelle";
import Zaehldauer from "@/types/zaehlstelle/Zaehldauer";
import Wetter from "@/types/zaehlstelle/Wetter";
import Knotenarm from "@/types/zaehlstelle/Knotenarm";
import Fahrbeziehung from "@/types/zaehlstelle/Fahrbeziehung";

export default interface Zaehlung extends BaseEntity {
  zaehldatum: Date;
  projektnummer: string;
  projektname: string;
  wetter: Wetter;
  quelle: Quelle;
  kreisverkehr: boolean;
  zaehldauer: Zaehldauer;
  zaehlsituation: string;
  zaehlsituationErweitert: string;
  zaehlIntervall: number;
  kommentar: string;
  freigegeben: boolean;
  knotenarme: Knotenarm[];
  fahrbeziehungen: Fahrbeziehung[];
}