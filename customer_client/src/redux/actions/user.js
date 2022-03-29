import * as api from "../../api/user";
import { STRING } from "../../constants";

//ACTION creators
export const login =
  (user, performSuccess, performFailure) => async (dispatch) => {
    try {
      const { data } = await api.login(user);
      dispatch({ type: STRING.LOG_IN, payload: data });
      performSuccess();
    } catch (error) {
      performFailure(error.response.data);
    }
  };

export const signup =
  (user, performSuccess, performFailure) => async (dispatch) => {
    try {
      const { data } = await api.signup(user);
      dispatch({ type: STRING.SIGN_UP, payload: data });
      performSuccess();
    } catch (error) {
      performFailure(error.response.data);
    }
  };

export const logout =
  (user, performSuccess, performFailure) => async (dispatch) => {
    try {
      const { data } = await api.logout(user);
      dispatch({ type: STRING.LOG_OUT, payload: data });
      performSuccess();
    } catch (error) {
      performFailure(error.response.data);
    }
  };