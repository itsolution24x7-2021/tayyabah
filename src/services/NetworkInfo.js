import NetInfo from '@react-native-community/netinfo';

class NetworkInfo {
  networkInfoListener(dispatch, networkInfoAction) {
    NetInfo.fetch().then(state => {
      dispatch(networkInfoAction(state.isConnected));
    });
    NetInfo.addEventListener(state => {
      dispatch(networkInfoAction(state.isConnected));
    });
  }
}

export default new NetworkInfo();
