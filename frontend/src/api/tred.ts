import { ITred, ITredCreate } from "../interfaces/entities";
import axios from "./instance";

const create = async (tred: ITredCreate) => {
  return axios
    .post<ITred>("/tred", tred)
    .then((response) => response.data)
    .then((tred) => tred);
};

const get = async (id: number) => {
  return axios
    .get<ITred>(`/tred/${id}`)
    .then((response) => response.data)
    .then((tred) => tred);
};

export interface ITredApi {
  create: (tred: ITredCreate) => Promise<ITred>;
  get: (id: number) => Promise<ITred>;
}

export const tred: ITredApi = {
  create,
  get,
};
