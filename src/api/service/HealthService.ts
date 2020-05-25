import {ApiError, Levels} from '@/api/error';
import HealthState from "@/types/HealthState";
import BaseUrlProvider from "@/api/util/BaseUrlProvider";

export default class HealthService {

  private static base: string = BaseUrlProvider.getBaseUrl();

  private static endpoint: string = "actuator/health";

  static checkHealth(): Promise<HealthState> {
    return fetch(`${this.base}/${this.endpoint}`).then(response => {
      if (!response.ok) {
        throw new ApiError(Levels.WARNING, "Beim Laden der Daten vom API-Gateway ist ein Fehler aufgetreten.");
      }
      return response.json();
    }).catch(error => {
      throw new ApiError(Levels.ERROR, "Verbindung zum API-Gateway konnte nicht aufgebaut werden.", error);
    })
  }
}