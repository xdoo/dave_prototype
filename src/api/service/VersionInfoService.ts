import BaseUrlProvider from "@/api/util/BaseUrlProvider";
import VersionInfoResponse from "@/types/VersionInfoResponse";
import {ApiError, Levels} from "@/api/error";
import FetchUtils from "@/api/util/FetchUtils";

export default class VersionInfoService {

  private static base: string = BaseUrlProvider.getBaseUrl();

  private static endpointFrontend: string = "actuator/info";
  private static endpointBackend: string = "api/dave-backend-service/actuator/info";

  static getFrontendInfo(): Promise<VersionInfoResponse> {
    return VersionInfoService.getInfo(this.endpointFrontend, "Frontend");
  }

  static getBackendInfo(): Promise<VersionInfoResponse> {
    return VersionInfoService.getInfo(this.endpointBackend, "Backend");
  }

  private static getInfo(endpoint: string, type: string): Promise<VersionInfoResponse> {
    return fetch(`${this.base}/${endpoint}`, FetchUtils.getGETConfig())
        .then(response => {
          if (!response.ok) {
            return new VersionInfoResponse({name: type, version: "unknown"});
          }
          return response.json();
        }).catch(error => {
          throw new ApiError(Levels.ERROR, `Verbindung zum ${type} konnte nicht aufgebaut werden.`, error);
        });
  }
}
