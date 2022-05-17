export interface IUser {
  id: number;
  name: string;
  isPublic: boolean;
}

export interface AuthState {
  user: IUser | null;
  isAuth: boolean | null;
}

export enum AuthActionTypes {
  FETCH_USER = "FETCH_USER",
  FETCH_USER_ERROR = "FETCH_USER_ERROR",
  LOG_OUT = "LOG_OUT",
}

interface FetchUserAction {
  type: AuthActionTypes.FETCH_USER;
  payload?: IUser | null;
}

interface FetchUserErrorAction {
  type: AuthActionTypes.FETCH_USER_ERROR;
}

interface LogOutAction {
  type: AuthActionTypes.LOG_OUT;
}

export type AuthActions = FetchUserAction | FetchUserErrorAction | LogOutAction;
