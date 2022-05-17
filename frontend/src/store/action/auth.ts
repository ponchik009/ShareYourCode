import { createAsyncThunk } from "@reduxjs/toolkit";
import { Dispatch } from "react";
import { api } from "../../api";
import { AuthActions, AuthActionTypes, AuthState } from "../../interfaces/auth";

export const logIn = (email: string, password: string) => {
  return async (
    dispatch: Dispatch<AuthActions>
  ): Promise<string | undefined> => {
    try {
      const user = await api.auth.logIn(email, password);
      dispatch({
        type: AuthActionTypes.FETCH_USER,
        payload: user,
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: AuthActionTypes.LOG_OUT,
      });
      return "Ошибка авторизации, введены неверные данные";
    }
  };
};

export const getUser = () => {
  return async (dispatch: Dispatch<AuthActions>) => {
    try {
      const user = await api.auth.getUser();
      dispatch({
        type: AuthActionTypes.FETCH_USER,
        payload: user,
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: AuthActionTypes.LOG_OUT,
      });
    }
  };
};

export const logOut = () => {
  return async (dispatch: Dispatch<AuthActions>) => {
    try {
      await api.auth.logOut();
      dispatch({
        type: AuthActionTypes.LOG_OUT,
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: AuthActionTypes.LOG_OUT,
      });
    }
  };
};
