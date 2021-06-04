// @flow
import React, { useState, useEffect } from 'react';
import { View, ScrollView, Image, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import firestore from '@react-native-firebase/firestore';

import styles from './styles';
import { Images } from '../../theme';
import { Header, OverlayLoader } from '../../components';
import { logout } from '../../redux/actions/Login';
import { getResourceById } from '../../config/firebaseMethods';

const MyProfile = (props) => {
  const dispatch = useDispatch();
  const loginResponse = useSelector((state) => state.login);

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const main = async () => {
      try {
        const { id } = loginResponse.data;
        const user = await getResourceById('user', id);
        setUser(user._data);
        setIsLoading(false);
      } catch (e) { }
    };

    const unsubscribe = props.navigation.addListener('focus', () => {
      // do something
      main();
    });
    main();
    return unsubscribe;
  }, [props.navigation]);

  const handleLogout = async () => {
    const payload = { ...user };
    payload.fcmToken = null
    setIsLoading(true)
    firestore().collection("user").doc(user?.uid).update(payload)
      .then(async result => {
        try {
          await AsyncStorage.removeItem('user');
          await AsyncStorage.removeItem('rememberMe');
          setIsLoading(false);
          await dispatch(logout());
        } catch (error) {
          setIsLoading(false);
          console.log(error, 'error');
        }
      })
      .catch(error => { console.log(error, 'error') })
  };

  return (
    <View style={styles.profileView}>
      <OverlayLoader isLoading={isLoading} />
      <Image
        style={styles.backgroundImg}
        resizeMode="cover"
        source={user?.profileImage ? { uri: user?.profileImage } : Images.user}
      />
      <Header
        {...props}
        leftIcon={Images.BackArrow}
        isLeftIconImg={true}
        leftBtnPress={() => props.navigation.goBack()}
        headerText={'My Profile'}
        headerTextStyle={styles.headerTextStyle}
      />
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.profileImageContainer}>
          <Image
            style={styles.image}
            resizeMode="cover"
            source={
              user?.profileImage ? { uri: user?.profileImage } : Images.user
            }
          />
        </View>
        <View style={styles.nameView}>
          <Text
            style={styles.name}>{`${user?.firstName} ${user?.lastName}`}</Text>
        </View>
        <View style={styles.emailView}>
          <Text style={styles.email}>Email Address</Text>
          <Text style={styles.address}>{`${user?.email}`}</Text>
        </View>
        <View style={styles.emailView}>
          <Text style={styles.email}>Date of Birth</Text>
          <Text style={styles.address}>{`${moment(user?.dateOfBirth).format(
            'LL',
          )}`}</Text>
        </View>
      </ScrollView>
      <TouchableOpacity onPress={handleLogout} style={styles.logoutView}>
        <Image
          resizeMode="contain"
          style={styles.imageLogout}
          source={Images.Logout}
        />
        <Text style={styles.logout}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MyProfile;
