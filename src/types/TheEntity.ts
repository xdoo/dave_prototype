export default class TheEntity {
  id: string | undefined;
  textAttribute: string;

  constructor(textAttribute: string, id?: string) {
    this.textAttribute = textAttribute;
    this.id = id;
  }
}