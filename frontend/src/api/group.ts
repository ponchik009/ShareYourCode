import {
  IGroup,
  IGroupItem,
  IInviteLink,
  IUserItem,
} from "../interfaces/entities";
import axios from "./instance";

const create = async (name: string, description: string, isOpen: boolean) => {
  try {
    const response = await axios.post("/group", {
      name,
      description,
      isOpen,
    });
    return response.data.id;
  } catch (err) {
    console.log(err);
  }
};

const getGroups = async (groupType: string) => {
  try {
    const response = await axios.get<IGroupItem[]>(`/group/${groupType}`);
    return response.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const getGroup = async (id: number) => {
  try {
    const response = await axios.get<IGroup>(`/group/${id}`);
    return response.data;
  } catch (err: any) {
    throw new Error(err.response.data.message);
  }
};

const enter = async (id: number) => {
  try {
    const response = await axios.patch<IGroup>(`/group/enter/${id}`);
    return response.data;
  } catch (err: any) {
    throw new Error(err.response.data.message);
  }
};

const invite = async (id: number, email: string) => {
  try {
    const response = await axios.patch<IGroup>(`/group/invite/${id}`, {
      email,
    });
    return response.data;
  } catch (err: any) {
    throw new Error(err.response.data.message);
  }
};

const generateLink = async (id: number) => {
  try {
    const response = await axios.patch<IInviteLink>(`/group/generate/${id}`);
    return response.data;
  } catch (err: any) {
    throw new Error(err.response.data.message);
  }
};

const enterFromLink = async (link: string) => {
  try {
    const response = await axios.patch<IGroup>(`/group/fromLink/${link}`);
    return response.data;
  } catch (err: any) {
    throw new Error(err.response.data.message);
  }
};

const leave = async (id: number) => {
  try {
    await axios.patch<void>(`/group/leave/${id}`);
  } catch (err: any) {
    console.log(err);

    throw new Error(err.response.data.message);
  }
};

const kickOut = async (id: number, user: IUserItem) => {
  try {
    const response = await axios.patch<IGroup>(`/group/kick/${id}`, user);
    return response.data;
  } catch (err: any) {
    throw new Error(err.response.data.message);
  }
};

const delegateAdmin = async (id: number, user: IUserItem) => {
  try {
    const response = await axios.patch<IGroup>(`/group/delegate/${id}`, user);
    return response.data;
  } catch (err: any) {
    throw new Error(err.response.data.message);
  }
};

export enum GroupTypes {
  PUBLIC = "public",
  MY = "my",
}

export interface IGroupApi {
  create: (
    name: string,
    description: string,
    isOpen: boolean
  ) => Promise<undefined | number>;
  getGroups: (groupType: string) => Promise<IGroupItem[]>;
  getGroup: (id: number) => Promise<IGroup>;
  enter: (id: number) => Promise<IGroup>;
  invite: (id: number, email: string) => Promise<IGroup>;
  generateLink: (id: number) => Promise<IInviteLink>;
  enterFromLink: (link: string) => Promise<IGroup>;
  leave: (id: number) => Promise<void>;
  kickOut: (id: number, user: IUserItem) => Promise<IGroup>;
  delegateAdmin: (id: number, user: IUserItem) => Promise<IGroup>;
}

export const group: IGroupApi = {
  create,
  getGroups,
  getGroup,
  enter,
  invite,
  generateLink,
  enterFromLink,
  leave,
  kickOut,
  delegateAdmin,
};
