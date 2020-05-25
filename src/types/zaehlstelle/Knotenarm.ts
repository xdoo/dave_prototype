import BaseEntity from "@/types/BaseEntity";

export default interface Knotenarm extends BaseEntity {
  knotenarmnummer: string;
  strassenname: string;
  winkel: number;
}