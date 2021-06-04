// @flow
import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  Image,
  ImageBackground,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import messaging from '@react-native-firebase/messaging';
// import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
import BackgroundFetch from "react-native-background-fetch";
import firestore from '@react-native-firebase/firestore';
import momentHijri from 'moment-hijri';
import { useSelector } from 'react-redux';

import styles from './styles';
import Card from '../../components/Card';
import { Images, Metrics } from '../../theme';
import { Header } from '../../components';
import { Firebase_Server_Key } from '../../config/constants';
import { getResourceById } from '../../config/firebaseMethods';

const dataCard = [
  {
    image: Images.Photos,
    name: 'Photos',
    navigate: 'PhotosCategory',
  },
  {
    image: Images.about,
    name: 'About Us',
    navigate: 'AboutUs',
  },
  {
    image: Images.calender,
    name: 'Calendar',
    navigate: 'Calendar',
  },
  {
    image: Images.quotes,
    name: 'Quotes',
    navigate: 'QuotesCategory',
  },
  {
    image: Images.fonts,
    name: 'Fonts/ Resources',
    navigate: 'FontsResources',
  },
  {
    image: Images.poh,
    name: 'Peace of Heart',
    navigate: 'PeaceOfHeartCategory',
  },
];

const Home = (props) => {
  const loginResponse = useSelector((state) => state.login);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const main = async () => {
      try {
        await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
      } catch (error) { console.log(error) }
    };
    const unsubscribe = props.navigation.addListener('focus', () => {
      main();
      getUserData();
      foregroundNotificationListner();
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (user?.fcmToken) {
      initBackgroundFetch();
    }
  }, [user])

  const getUserData = async () => {
    try {
      const { id } = loginResponse.data;
      const _user = await getResourceById('user', id);
      setUser(_user._data);
    } catch (error) { console.log(error) }
  }

  const foregroundNotificationListner = () => {
    messaging().onMessage(async (remoteMessage) => {
      // if (Platform.OS === 'android') {
      PushNotification.localNotification({
        channelId: 'fcm_fallback_notification_channel',
        autoCancel: true,
        bigText: remoteMessage?.notification?.body,
        // subText: 'Local Notification Demo',
        title: remoteMessage?.notification?.title,
        message: remoteMessage?.notification?.body,
        vibrate: true,
        vibration: 300,
        playSound: true,
        soundName: 'default',
        invokeApp: true,
      });
      // } else {
      //   PushNotificationIOS.scheduleLocalNotification(remoteMessage);
      // }
    });
  };

  const initBackgroundFetch = async () => {
    const onEvent = (taskId) => {
      console.log('[BackgroundFetch] task: ', taskId);
      addEvent();
      BackgroundFetch.finish(taskId);
    }

    const onTimeout = async (taskId) => {
      console.warn('[BackgroundFetch] TIMEOUT task: ', taskId);
      BackgroundFetch.finish(taskId);
    }

    let status = await BackgroundFetch.configure({ minimumFetchInterval: 15 }, onEvent, onTimeout);

    console.log('[BackgroundFetch] configure status: ', status);
  }

  const getEvents = () => {
    const startDate = momentHijri().format('iYYYY/iM/iD');
    const endDate = momentHijri(startDate, "iYYYY/iM/iD").add(3, 'days').format('iYYYY/iM/iD');
    return new Promise((resolve, reject) => {
      firestore()
        .collection('islamicEvents')
        .where('eventDate', '>=', `${startDate}`)
        .where('eventDate', '<=', `${endDate}`)
        .get()
        .then(events => {
          return resolve(events)
        })
        .catch(error => {
          console.log(error, 'error');
          reject(error)
        });
    })
  }

  const addEvent = async () => {
    let events = await getEvents()
    if (user?.notification?.date !== momentHijri().format('YYYY/M/D') && loginResponse?.data?.id) {
      if (events?._docs?.length) {
        sendNotification()
      }
    }
  }

  const sendNotification = () => {
    const notification = {
      title: 'Upcoming Events',
      body: 'You have upcoming events.',
      icon: "https://tayyibah-4296c.web.app/static/media/logo_background_white.bbb42034.svg",
    };

    const data = {
      title: 'Upcoming Events',
      description: 'You have new upcoming events.',
    };

    if (user?.fcmToken) {
      fetch("https://fcm.googleapis.com/fcm/send", {
        method: "POST",
        headers: {
          Authorization: "key=" + Firebase_Server_Key,
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          to: user.fcmToken,
          notification: notification,
          data: data,
          priority: "high",
          time_to_live: 5,
          content_available: true,
        }),
      })
        .then((response) => {
          if (response.status === 200 && response.ok) {
            updateUserData();
            return;
          }
        })
        .catch((error) => { console.log(error, 'error') });
    }
  }

  const updateUserData = () => {
    const payload = {
      ...user,
      notification: {
        date: momentHijri().format('YYYY/M/D'),
        seen: true,
      },
    }

    firestore().collection("user").doc(user?.uid).update(payload)
      .then(result => {
        getUserData();
      })
      .catch(error => { console.log(error, 'error') })
  }

  return (
    <ImageBackground
      style={styles.backgroundImg}
      source={Images.MainBackground}>
      <Header
        leftIcon={Images.Drawer}
        rightIcon={Images.Notifications}
        isLeftIconImg={true}
        isRightIconImg={true}
        leftBtnPress={() => props.navigation.navigate('MyProfile')}
        rightBtnPress={() => props.navigation.navigate('Notification')}
        headerText={''}
        headerTextStyle={styles.headerTextStyle}
      />
      <View style={styles.MainViewStyle}>
        <Image style={styles.MainLogoImg} source={Images.mainLogo} />
      </View>
      <ScrollView>
        <View style={styles.cardMainView}>
          {dataCard.map((item, index) => {
            let cardWidth =
              dataCard.length - 1 === index && dataCard.length % 2 !== 0
                ? Platform.OS === 'ios' ? Metrics.screenWidth * 0.926 : Metrics.screenWidth * 0.94
                : Platform.OS === 'ios' ? Metrics.screenWidth * 0.435 : Metrics.screenWidth * 0.444;
            return (
              <Card
                text={item.name}
                image={item.image}
                onPress={() => props.navigation.navigate(item.navigate)}
                mainCardStyle={{ width: cardWidth }}
              />
            );
          })}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Home;
