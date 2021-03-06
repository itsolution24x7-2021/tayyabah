// @flow
import { REGISTER, LOGOUT } from "./ActionTypes";

export function request(payload) {
  return {
    payload,
    type: REGISTER.REQUEST
  };
}

export function success(data: Object) {
  return {
    data,
    type: REGISTER.SUCCESS
  };
}

export function failure(errorMessage: Object) {
  return {
    errorMessage,
    type: REGISTER.FAILURE
  };
}

export function logout() {
  return {
    type: LOGOUT
  };
}
