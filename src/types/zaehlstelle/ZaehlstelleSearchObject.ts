import Zaehlstelle from "@/types/zaehlstelle/Zaehlstelle";
import Zaehlung from "@/types/zaehlstelle/Zaehlung";

export default interface ZaehlstelleSearchObject extends Zaehlstelle {
  zaehlungen: Zaehlung[];
}