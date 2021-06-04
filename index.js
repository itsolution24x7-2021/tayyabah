/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';

messaging().getInitialNotification(async (remoteMessage) => {
  console.log('🚀 ~ file: index.js ~ line 14 ~ remoteMessage', remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);
