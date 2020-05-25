import ZaehlstelleSearchObject from "@/types/zaehlstelle/ZaehlstelleSearchObject";

export default class SearchResult {
  // zaehlstellen: Zaehlstelle[];
  zaehlstellen: ZaehlstelleSearchObject[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;

  constructor(zaehlstellen: ZaehlstelleSearchObject[], pageNumber: number, pageSize: number, totalElements: number) {
    this.zaehlstellen = zaehlstellen;
    this.pageNumber = pageNumber;
    this.pageSize = pageSize;
    this.totalElements = totalElements;
  }
}