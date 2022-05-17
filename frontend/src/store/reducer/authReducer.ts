import { AuthActions, AuthActionTypes, AuthState } from "../../interfaces/auth";

const initialState: AuthState = {
  user: null,
  isAuth: null,
};

export const authReducer = (
  state = initialState,
  action: AuthActions
): AuthState => {
  switch (action.type) {
    case AuthActionTypes.FETCH_USER: {
      return {
        ...state,
        user: action.payload || null,
        isAuth: true,
      };
    }

    case AuthActionTypes.LOG_OUT: {
      return {
        ...state,
        user: null,
        isAuth: false,
      };
    }

    default: {
      return state;
    }
  }
};
