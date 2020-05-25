import {ApiError, Levels} from '@/api/error';
import BaseUrlProvider from "@/api/util/BaseUrlProvider";
import SsoUserInfoResponse from "@/types/SsoUserInfoResponse";
import FetchUtils from "@/api/util/FetchUtils";

export default class SsoUserInfoService {

  private static base: string = BaseUrlProvider.getBaseUrl();

  private static endpoint: string = "api/sso/userinfo";

  static getUserInfo(): Promise<SsoUserInfoResponse> {
    return fetch(`${this.base}/${this.endpoint}`, FetchUtils.getGETConfig())
        .then(response => {
          if (!response.ok) {
            return new SsoUserInfoResponse("no_authority", "no_authority", [], []);
          }
          return response.json();
        }).catch(error => {
          throw new ApiError(Levels.ERROR, "Verbindung zum API-Gateway oder SSO-Dienst konnte nicht aufgebaut werden.", error);
        });
  }
}
