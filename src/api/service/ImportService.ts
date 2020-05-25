import FetchService from "@/api/service/FetchService";
import ImportObject from "@/types/ImportObject";

export default class ImportService {

  private static endpoint: string = "api/dave-backend-service/zaehlstelles/import";

  static sendData(data: ImportObject): Promise<string> {
    return FetchService.postData(data, this.endpoint, "Beim Importieren der Daten ist ein Fehler aufgetreten. Bitte Daten kontrollieren.");
  }
}
