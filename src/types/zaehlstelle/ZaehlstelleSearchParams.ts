import Zaehlart from "@/types/zaehlstelle/Zaehlart";
import SearchOptions from "@/types/SearchOptions";

export default class ZaehlstelleSearchParams {
  searchOptions: SearchOptions;
  searchstring: string;
  onlyinactive: boolean;
  zaehlart: Zaehlart | undefined;

  constructor(searchOptions: SearchOptions, searchstring: string, onlyinactive: boolean, zaehlart?: Zaehlart) {
    this.searchOptions = searchOptions;
    this.searchstring = searchstring;
    this.zaehlart = zaehlart;
    this.onlyinactive = onlyinactive;
  }
}