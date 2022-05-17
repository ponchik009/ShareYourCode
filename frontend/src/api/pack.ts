import {
  IExecuteOutput,
  ILanguage,
  IPackage,
  IPackageCreate,
} from "../interfaces/entities";
import axios from "./instance";

const create = async (pack: IPackageCreate) => {
  return axios
    .post<IPackage>("/package", pack)
    .then((response) => response.data)
    .then((pack) => pack);
};

const get = async (id: number) => {
  return axios
    .get<IPackage>(`/package/${id}`)
    .then((response) => response.data)
    .then((pack) => pack);
};

const review = async (id: number, review: string) => {
  return axios
    .patch<IPackage>(`/package/review`, { id, review })
    .then((response) => response.data)
    .then((pack) => pack);
};

const execute = async (
  code: string,
  input: string = "",
  cmd_input: string = "",
  language: ILanguage
) => {
  return axios
    .post<IExecuteOutput>(`/package/execute`, {
      code,
      input,
      cmd_input,
      language,
    })
    .then((response) => response.data)
    .then((info) => info);
};

const getLanguages = async () => {
  return axios
    .get<ILanguage[]>(`/package/language`)
    .then((response) => response.data)
    .then((languages) => languages);
};

export interface IPackageApi {
  create: (pack: IPackageCreate) => Promise<IPackage>;
  get: (id: number) => Promise<IPackage>;
  review: (id: number, review: string) => Promise<IPackage>;
  execute: (
    code: string,
    input: string,
    cmd_input: string,
    language: ILanguage
  ) => Promise<IExecuteOutput>;
  getLanguages: () => Promise<ILanguage[]>;
}

export const pack: IPackageApi = {
  create,
  get,
  review,
  execute,
  getLanguages,
};
