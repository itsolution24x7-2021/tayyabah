// @flow
import * as types from "./ActionTypes";

export function networkInfoListener(isConnected: boolean = false) {
  return {
    type: types.NETWORK_INFO,
    isConnected
  };
}
