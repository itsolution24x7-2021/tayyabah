import 'react-native-gesture-handler';
import React, { Component } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import messaging from '@react-native-firebase/messaging';

import configureStore from './src/redux/store';
import Navigation from './src/navigation';
import { DataHelper } from './src/helpers';
import NetworkInfo from './src/services/NetworkInfo';
import { networkInfoListener } from './src/redux/actions/NetworkInfo';
import { success as login_success } from './src/redux/actions/Login';
import { logout } from './src/redux/actions/Login';


const reducers = require('./src/redux/reducers').default;

export default class App extends Component {
  state = {
    isLoading: true,
    store: configureStore(reducers, (newState) => {
      this.setState({ isLoading: false }, () => {
        DataHelper.setStore(this.state.store);
      });
    }),
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const main = async () => {
      try {
        const _user = await AsyncStorage.getItem('user');
        const _rememberMe = await AsyncStorage.getItem('rememberMe');
        const user = JSON.parse(_user);
        const rememberMe = JSON.parse(_rememberMe);
        if (rememberMe?.rememberMe) {
          prevState.store.dispatch(login_success(user));
        } else {
          prevState.store.dispatch(logout());
        }
      } catch (error) {
        console.log(error);
      }
    };
    main();
  }

  componentDidMount() {
    console.disableYellowBox = true;
    NetworkInfo.networkInfoListener(
      this.state.store.dispatch,
      networkInfoListener,
    );
    this.requestUserPermission();

    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        console.log('on-open');
        console.log('remoteMessage', remoteMessage);
      });

    // FUTURE USE
    // messaging().onNotificationDisplayed((notification) => {
    //   console.log(
    //     '🚀 ~ file: App.js ~ line 65 ~ App ~ componentDidMount ~ notification',
    //     notification,
    //   );
    // });

    // FUTURE USE
    // messaging().onMessage(function (payload) {
    //   console.log('Message received. ', payload);
    // });
  }

  async getToken() {
    let fcmToken;
    if (!false) {
      fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log(fcmToken, 'fcmToken')
        // user has a device token
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
  }

  async requestPermission() {
    try {
      let granted = await messaging().requestPermission({
        alert: true,
        announcement: true,
        badge: true,
        carPlay: true,
        provisional: false,
        sound: true,
      });
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
    }
  }

  requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  };

  render() {
    SplashScreen.hide();
    const { store } = this.state;
    return (
      <Provider store={store}>
        <StatusBar translucent backgroundColor={'transparent'} barStyle="dark-content" />
        <Navigation />
      </Provider>
    );
  }
}
