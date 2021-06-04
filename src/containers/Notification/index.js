// @flow
import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  SectionList,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { useSelector } from 'react-redux';
import moment from 'moment';
import styles from './styles';
import { Images } from '../../theme';
import { Header, NotificationCard, OverlayLoader } from '../../components';
import { getResource, updateData } from '../../config/firebaseMethods';
import util from '../../util';

const Notification = (props) => {
  const loginResponse = useSelector((state) => state.login);
  const [notificationHistory, setNotificationHistory] = useState([]);
  const [isLoading, setIsLoading] = useState('');
  const [userID, setUserID] = useState('');

  useEffect(() => {
    const main = async () => {
      setIsLoading(true);
      try {
        const { id } = loginResponse.data;
        setUserID(id);
        getNotifications();
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    main();
  }, []);

  const getNotifications = async () => {
    const notificationHistory = await getResource('notificationHistory');
    const filteredNotification = util.notificationDataFormatter(
      notificationHistory.reverse(),
    );
    setNotificationHistory(filteredNotification);
  };

  const handlePress = async (docId) => {
    const payload = {
      seen: [userID],
    };
    setIsLoading(true);
    updateData({ collectionName: 'notificationHistory', id: docId.id, payload })
      .then((res) => {
        getNotifications();
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        util.showAlertWithDelay('Error', error.message, 1000);
      });
  };

  return (
    <View style={styles.notificationView}>
      <Header
        {...props}
        leftIcon={Images.BackArrow}
        isLeftIconImg={true}
        leftBtnPress={() => props.navigation.goBack()}
        headerText={'Notification'}
        headerTextStyle={styles.headerTextStyle}
      />
      <OverlayLoader isLoading={isLoading} />
      <ScrollView style={{ flex: 1 }}>
        <SectionList
          sections={notificationHistory}
          renderSectionHeader={({ section }) => {
            return <Text style={styles.dayText}>{section.title}</Text>;
          }}
          renderItem={({ item }) => {
            const { title, timeStamp, seen } = item._data;
            let dateString = moment(timeStamp).format('LT');
            return (
              <NotificationCard
                showOnlineStatus={seen == userID ? false : true}
                notification={title}
                time={dateString}
                handlePress={() => handlePress(item)}
              />
            );
          }}
          keyExtractor={(item, index) => index}
        />
      </ScrollView>
    </View>
  );
};

export default Notification;
