// @flow
const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';
const CANCEL = 'CANCEL';

function createRequestTypes(base) {
  const res = {};
  [REQUEST, SUCCESS, FAILURE, CANCEL].forEach((type) => {
    res[type] = `${base}_${type}`;
  });
  return res;
}

export const LOGIN = createRequestTypes('LOGIN');
export const REGISTER = createRequestTypes('REGISTER');
export const LOGOUT = 'LOGOUT';

// network related action type
export const NETWORK_INFO = "NETWORK_INFO";
