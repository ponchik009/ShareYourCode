import { auth, IAuthApi } from "./auth";
import { IGroupApi, group } from "./group";
import { IPackageApi, pack } from "./pack";
import { ITredApi, tred } from "./tred";

export interface IApi {
  auth: IAuthApi;
  group: IGroupApi;
  tred: ITredApi;
  pack: IPackageApi;
}

export const api: IApi = {
  auth,
  group,
  tred,
  pack,
};
