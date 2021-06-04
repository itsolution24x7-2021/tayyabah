// @flow
import React, { useRef, useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
} from 'react-native';
import auth from '@react-native-firebase/auth';

import styles from './styles';

import { Images } from '../../theme';
import { emailRegex, validate } from '../../services/validation';
import { CustomTextInput, Header, OverlayLoader } from '../../components';
import util from '../../util';
import { getResourceWithRefrence } from '../../config/firebaseMethods';

const errors = {
  emailErr: 'Invalid email address.',
};

const Forgot = (props) => {
  const createRef = {
    emailInputRef: useRef(null),
  };

  const [email, setUserEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleValidation = async () => {
    if (!email) {
      setEmailError('Email is required.');
    } else if (email && !emailError) {
      setIsLoading(true);
      try {
        const user = await getResourceWithRefrence('user', { key: 'email', value: email });

        if (user.length && !user[0]?._data?.isActive) {
          util.showAlertWithDelay(
            'Error',
            'Your account is deleted by admin.',
            1000,
          )
        } else {
          await auth().sendPasswordResetEmail(email);
          util.showAlertWithDelay(
            'Message',
            'Please check your email and click on the provided link to reset your password.',
            1000,
          )
        }

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        util.showAlertWithDelay('Error', error.message, 1000)
      }
    }
  };

  const onSubmit = (value) => {
    if (value === 'onDone') {
      handleValidation();
    } else {
      value.current.focus();
    }
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

  const renderLoginFields = () => {
    return (
      <CustomTextInput
        inputLeftIcon={Images.Email}
        returnKeyType="done"
        enablesReturnKeyAutomaticallly={true}
        placeholder="Enter Registered Email"
        editable={true}
        refrence={createRef.emailInputRef}
        value={email}
        onChangeInput={(value) =>
          onChangeInput(
            value,
            setUserEmail,
            setEmailError,
            emailRegex,
            errors.emailErr,
          )
        }
        onSubmitRef={'onDone'}
        onSubmit={(onSubmitRef) => {
          onSubmit(onSubmitRef);
        }}
        emailError={emailError}
      />
    );
  };

  const renderBodyContent = () => {
    return (
      <View style={styles.CardViewStyle}>
        <View>
          <Text style={styles.heading}>Forgot Password</Text>

          {renderLoginFields()}
        </View>

        <TouchableOpacity
          style={styles.loginBtn}
          onPress={handleValidation}>
          <Text style={styles.forgotBtnText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ImageBackground
      style={styles.backgroundImg}
      source={Images.loginBackground}>
      <OverlayLoader isLoading={isLoading} />

      <Header
        {...props}
        leftIcon={Images.BackArrow}
        isLeftIconImg={true}
        leftBtnPress={() => props.navigation.goBack()}
        headerText={''}
        headerTextStyle={styles.headerTextStyle}
      />

      <ScrollView>
        <View style={styles.MainViewStyle}>
          <Image style={styles.LogoImg} source={Images.logo} />
        </View>
        {renderBodyContent()}
      </ScrollView>
    </ImageBackground>
  );
};

export default Forgot;
