import BaseEntity from "@/types/BaseEntity";

export default interface Hochrechnungsfaktor extends BaseEntity {
  name: string;
  kraftfahrzeugverkehr: number;
  schwerverkehr: number;
  gueterverkehr: number;
}