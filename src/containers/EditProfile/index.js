// @flow
import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, Image, Text, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { launchImageLibrary } from 'react-native-image-picker';
import { useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth';

import {
  nameRegex,
  validate,
} from '../../services/validation';
import styles from './styles';
import { Images, Metrics, Fonts } from '../../theme';
import { Header, CustomTextInput, OverlayLoader } from '../../components';
import { getResourceById } from '../../config/firebaseMethods';
import util from '../../util';

let errors = {};

const EditProfile = (props) => {
  const createRef = {
    firstNameInputRef: useRef(null),
    lastNameInputRef: useRef(null),
    dateOfBirthInputRef: useRef(null),
    currentPasswordInputRef: useRef(null),
    newPasswordInputRef: useRef(null),
    confirmPasswordInputRef: useRef(null),
  };
  const loginResponse = useSelector((state) => state.login);
  const networkInfoResponse = useSelector((state) => state.networkInfo);

  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [placeholderImage, setPlaceholderImage] = useState({});
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [currentPasswordError, setCurrentPasswordError] = useState('');
  const [passwordError, setpasswordError] = useState('');
  const [confirmpasswordError, setConfirmpasswordError] = useState('');

  useEffect(() => {
    const main = async () => {
      try {
        const { id } = loginResponse.data;
        const user = await getResourceById('user', id);
        setUser(user._data);
        setPlaceholderImage({ uri: user._data.profileImage });
        setDateOfBirth(user._data.dateOfBirth);
        setFirstName(user._data.firstName);
        setLastName(user._data.lastName);
        setIsLoading(false);
      } catch (e) { }
    };
    main();
  }, []);

  const handleValidation = async () => {
    const { isConnected } = networkInfoResponse.data;

    if (!firstName) {
      setFirstNameError('First name is required.');
    } else if (!lastName) {
      setLastNameError('Last name is required.');
    } else if (!dateOfBirth) {
      setDateOfBirthError('Date of birth is required.');
    } else if (currentPassword && !newPassword) {
      setpasswordError('New Password is required');
      setTimeout(() => {
        setpasswordError('');
      }, 3000);
    } else if (!currentPassword && newPassword) {
      setCurrentPasswordError('Current Password is required');
      setTimeout(() => {
        setCurrentPasswordError('');
      }, 3000);
    } else if (currentPassword && newPassword && !confirmpassword) {
      setConfirmpasswordError('Confirm Password is required');
      setTimeout(() => {
        setConfirmpasswordError('');
      }, 3000);
    } else if (newPassword != confirmpassword) {
      setConfirmpasswordError('Confirm Password is not matched');
      setTimeout(() => {
        setConfirmpasswordError('');
      }, 3000);
    } else if (
      placeholderImage.uri &&
      firstName &&
      lastName &&
      dateOfBirth &&
      !firstNameError &&
      !lastNameError
    ) {
      if (isConnected) {
        updatedProfile();
      } else {
        util.showAlertWithDelay(
          'No internet connection',
          'Please check your internet connection and try again.',
          1000,
        );
      }
    }
  };

  const changePassword = async () => {
    const { isConnected } = networkInfoResponse.data;
    if (newPassword && confirmpassword && newPassword == confirmpassword) {
      if (isConnected) {
        try {
          let user = await auth().currentUser;

          await auth().signInWithEmailAndPassword(user.email, currentPassword);
          await user.updatePassword(newPassword);

          setIsLoading(false);
          setCurrentPassword('');
          setNewPassword('');
          setConfirmPassword('');
          util.showAlertWithDelay(
            'Success',
            'Your profile and password has been updated successfully..',
            1000,
          );
        } catch (error) {
          setIsLoading(false);
          console.log(error, 'error 121');
        }
      } else {
        util.showAlertWithDelay(
          'No internet connection',
          'Please check your internet connection and try again.',
          1000,
        );
      }
    } else {
      setIsLoading(false);
      util.showAlertWithDelay(
        'Success',
        'Your profile has been updated successfully..',
        1000,
      );
    }
  };

  const updatedProfile = async () => {
    const { id } = loginResponse.data;

    setIsLoading(true);

    if (placeholderImage.uri !== user.profileImage) {
      try {
        const profileImageBlob = await uriToBlob(placeholderImage.uri);
        await storage().ref(`/images/${id}`).put(profileImageBlob);
        const downloadProfileImage = await storage()
          .ref(`/images/${id}`)
          .getDownloadURL();

        user.profileImage = downloadProfileImage;
      } catch (error) {
        console.log(error);
      }
    }

    try {
      user.firstName = firstName;
      user.lastName = lastName;
      user.dateOfBirth = dateOfBirth;

      await firestore().collection('user').doc(id).set(user);

      let getUserData = await firestore().collection('user').doc(id).get();

      const userData = { id: getUserData._ref.id, data: getUserData._data };

      await AsyncStorage.setItem('user', JSON.stringify(userData));

      changePassword();
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const uriToBlob = (uri) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };

      xhr.onerror = function () {
        reject(new TypeError('Network request failed'));
      };

      xhr.responseType = 'blob';

      xhr.open('GET', uri, true);

      xhr.send(null);
    });
  };

  const pickImage = () => {
    let options = {};
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
        alert(response.customButton);
      } else {
        setPlaceholderImage({
          uri: response.uri,
          type: response.type,
          name: response.fileName,
        });
      }
    });
  };

  const onChangeInput = async (
    value,
    state,
    errorState,
    regex,
    errorMessage,
  ) => {
    let error = validate(value, regex, errorMessage);
    state(value);
    errorState(error);
  };

  const onSubmit = (value) => {
    if (value === 'onDone') {
      handleValidation();
    } else {
      value.current.focus();
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? "padding" : null} style={{ flex: 1 }}>
      <View style={styles.profileView}>
        <OverlayLoader isLoading={isLoading} />

        <Image
          style={styles.backgroundImg}
          resizeMode="cover"
          source={placeholderImage ? placeholderImage : Images.user}
        />

        <Header
          {...props}
          leftIcon={Images.BackArrow}
          isLeftIconImg={true}
          leftBtnPress={() => props.navigation.goBack()}
          headerText={'Edit Profile'}
          headerTextStyle={styles.headerTextStyle}
        />
        <ScrollView>
          <View style={styles.ImageUserView}>
            <Image
              style={styles.image}
              resizeMode={'cover'}
              source={placeholderImage ? placeholderImage : Images.user}
            />
          </View>
          <View style={styles.UploadView}>
            <TouchableOpacity style={styles.editView} onPress={() => pickImage()}>
              <Image
                resizeMode="contain"
                style={styles.imageEdit}
                source={Images.UploadWhite}
              />
              <Text style={styles.Edit}>Upload</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.InputView}>
            <CustomTextInput
              returnKeyType="next"
              topLabelText="First Name"
              TextInputPaddingStyle={styles.TextInputPaddingStyle}
              enablesReturnKeyAutomaticallly={true}
              placeholder=""
              editable={true}
              refrence={createRef.firstNameInputRef}
              value={firstName}
              onChangeInput={(value) =>
                onChangeInput(
                  value,
                  setFirstName,
                  setFirstNameError,
                  nameRegex,
                  firstNameError,
                )
              }
              onSubmitRef={createRef.lastNameInputRef}
              onSubmit={(onSubmitRef) => {
                onSubmit(onSubmitRef);
              }}
              emailError={firstNameError}
            />
          </View>
          <View style={styles.InputView}>
            <CustomTextInput
              returnKeyType="next"
              topLabelText="Last Name"
              TextInputPaddingStyle={styles.TextInputPaddingStyle}
              enablesReturnKeyAutomaticallly={true}
              placeholder=""
              editable={true}
              refrence={createRef.lastNameInputRef}
              value={lastName}
              onChangeInput={(value) =>
                onChangeInput(
                  value,
                  setLastName,
                  setLastNameError,
                  nameRegex,
                  errors.lastNameError,
                )
              }
              onSubmitRef={createRef.currentPasswordInputRef}
              onSubmit={(onSubmitRef) => {
                onSubmit(onSubmitRef);
              }}
              emailError={lastNameError}
            />
          </View>
          <View style={styles.InputView}>
            <Text style={styles.labelTopText}>Date of Birth</Text>
            <DatePicker
              confirmBtnText={'Confirm'}
              cancelBtnText={'Cancel'}
              date={dateOfBirth}
              format={'YYYY-MM-DD'}
              ref={createRef.dateOfBirthInputRef}
              maxDate={new Date()}
              iconComponent={
                <Image style={styles.customDateIcon} source={Images.dob} />
              }
              onDateChange={(date) => setDateOfBirth(date)}
              style={{
                width: null,
                borderColor: '#F5F5F5',
                borderWidth: 0.5,
                borderRadius: Metrics.ratio(30),
                paddingHorizontal: Metrics.ratio(5),
                marginTop: Metrics.ratio(5),
                marginBottom: Metrics.ratio(15),
                height: Metrics.ratio(50),
                backgroundColor: '#fff',
              }}
              placeholder=""
              customStyles={{
                dateIcon: {
                  top: 4,
                  left: 0,
                  position: 'absolute',
                },
                placeholderText: {
                  color: '#BBBBBB',
                  fontFamily: Fonts.type.MontserratItalic,
                  marginLeft: Metrics.ratio(20),
                },
                dateInput: {
                  borderWidth: 0,
                  top: 4,
                  left: -94,
                },
              }}
              onSubmitRef={createRef.currentPasswordInputRef}
              onSubmit={(onSubmitRef) => {
                onSubmit(onSubmitRef);
              }}
            />
          </View>
          <View style={styles.InputView}>
            <CustomTextInput
              inputRightIcon={Images.eyeShowPass}
              inputRightHideIcon={Images.eyeHidePass}
              secureTextEntry={true}
              TextInputPaddingStyle={styles.TextInputPaddingStyle}
              returnKeyType="next"
              topLabelText="Current Password"
              refrence={createRef.currentPasswordInputRef}
              enablesReturnKeyAutomaticallly={true}
              placeholder={''}
              editable={true}
              value={currentPassword}
              onChangeInput={(value) => setCurrentPassword(value)}
              onSubmitRef={createRef.newPasswordInputRef}
              onSubmit={(onSubmitRef) => {
                onSubmit(onSubmitRef);
              }}
              emailError={currentPasswordError}
            />
          </View>
          <View style={styles.InputView}>
            <CustomTextInput
              inputRightIcon={Images.eyeShowPass}
              inputRightHideIcon={Images.eyeHidePass}
              secureTextEntry={true}
              TextInputPaddingStyle={styles.TextInputPaddingStyle}
              returnKeyType="next"
              topLabelText="New Password"
              refrence={createRef.newPasswordInputRef}
              enablesReturnKeyAutomaticallly={true}
              placeholder={''}
              editable={true}
              value={newPassword}
              onChangeInput={(value) => setNewPassword(value)}
              onSubmitRef={createRef.confirmPasswordInputRef}
              onSubmit={(onSubmitRef) => {
                onSubmit(onSubmitRef);
              }}
              emailError={passwordError}
            />
          </View>
          <View style={styles.InputView}>
            <CustomTextInput
              inputRightIcon={Images.eyeShowPass}
              inputRightHideIcon={Images.eyeHidePass}
              TextInputPaddingStyle={styles.TextInputPaddingStyle}
              secureTextEntry={true}
              topLabelText="Confirm Password"
              returnKeyType="done"
              refrence={createRef.confirmPasswordInputRef}
              enablesReturnKeyAutomaticallly={true}
              placeholder={''}
              editable={true}
              value={confirmpassword}
              onChangeInput={(value) => setConfirmPassword(value)}
              onSubmitRef={'onDone'}
              onSubmit={(onSubmitRef) => {
                onSubmit(onSubmitRef);
              }}
              emailError={confirmpasswordError}
            />
          </View>

          <TouchableOpacity style={styles.SaveView} onPress={handleValidation}>
            <Text style={styles.saveBtn}>Save</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default EditProfile;
