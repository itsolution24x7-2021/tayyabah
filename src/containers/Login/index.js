// @flow
import React, { useRef, useState, useEffect } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
} from 'react-native';
import { Checkbox } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

import styles from './styles';
import { Images, Colors, Metrics, Fonts } from '../../theme';
import { emailRegex, passwordRegex, validate } from '../../services/validation';
import { CustomTextInput, OverlayLoader } from '../../components';
import { request as login_request } from '../../redux/actions/Login';

let errors = {
  emailErr: 'Invalid email address.',
  passwordErr:
    'Minimum eight characters, at least one uppercase letter, one lowercase letter and one number',
};

const Login = (props) => {
  const dispatch = useDispatch();

  const createRef = {
    emailInputRef: useRef(null),
    passwordInputRef: useRef(null),
  };

  const [checked, setChecked] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const loginResponse = useSelector((state) => state.login);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      setChecked(false);
      setEmail('');
      setPassword('');
      setEmailError('');
      setPasswordError('');
      setIsLoading(false);
    });
    return unsubscribe;
  }, [])

  useEffect(() => {
    if (!loginResponse.isFetching) setIsLoading(false);
  }, [loginResponse]);

  const onChangeCheckBox = async () => {
    try {
      await AsyncStorage.setItem(
        'rememberMe',
        JSON.stringify({ rememberMe: !checked }),
      );
    } catch (error) {
      console.log(error);
    }
    setChecked(!checked);
  };

  const handleValidation = async () => {
    if (!email) {
      setEmailError('Email is required.');
    } else if (!password) {
      setPasswordError('Password is required.');
      setTimeout(() => {
        setPasswordError("");
      }, 3000);
    } else if (email && password && !emailError && !passwordError) {
      try {
        setIsLoading(true);
        const payload = { email, password };
        await dispatch(login_request(payload));
      } catch (error) {
        console.log(error, 'error');
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
      <View>
        <CustomTextInput
          inputLeftIcon={Images.Email}
          returnKeyType="next"
          enablesReturnKeyAutomaticallly={true}
          placeholder="Enter Email ID"
          editable={true}
          refrence={createRef.emailInputRef}
          value={email}
          onChangeInput={(value) =>
            onChangeInput(
              value,
              setEmail,
              setEmailError,
              emailRegex,
              errors.emailErr,
            )
          }
          onSubmitRef={createRef.passwordInputRef}
          onSubmit={(onSubmitRef) => {
            onSubmit(onSubmitRef);
          }}
          emailError={emailError}
        />

        <CustomTextInput
          inputLeftIcon={Images.Password}
          inputRightIcon={Images.eyeShowPass}
          inputRightHideIcon={Images.eyeHidePass}
          secureTextEntry={true}
          returnKeyType="done"
          enablesReturnKeyAutomaticallly={true}
          placeholder={'Password'}
          editable={true}
          refrence={createRef.passwordInputRef}
          value={password}
          onChangeInput={(value) => setPassword(value)}
          onSubmitRef={'onDone'}
          onSubmit={(onSubmitRef) => {
            onSubmit(onSubmitRef);
          }}
          emailError={passwordError}
        />
      </View>
    );
  };

  const renderBodyContent = () => {
    return (
      <View style={styles.CardViewStyle}>
        <Text style={styles.heading}>Login</Text>

        {renderLoginFields()}

        <View style={{ ...styles.keep }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Checkbox
              color={Colors.primary}
              uncheckedColor="#BBBBBB"
              status={checked ? 'checked' : 'unchecked'}
              onPress={onChangeCheckBox}
            />
            <TouchableOpacity onPress={onChangeCheckBox}>
              <Text style={{ ...styles.keepme }}>Keep me signed in.</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => props.navigation.navigate('ForgetPassword')}>
            <Text style={{ ...styles.forgot }}>Forgotten Password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loginBtn} onPress={handleValidation}>
          <Text style={styles.loginBtnText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.RegisterTag}>
          <Text style={styles.RegisterHere}>Don't have an account?</Text>
        </View>

        <View style={styles.RegisterTag}>
          <TouchableOpacity>
            <Text
              style={styles.RegisterHereLink}
              onPress={() => props.navigation.navigate('Register')}>
              Sign Up Here
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <ImageBackground
      style={styles.backgroundImg}
      source={Images.loginBackground}>
      <OverlayLoader isLoading={isLoading} />

      <ScrollView>
        <View style={styles.MainViewStyle}>
          <Image style={styles.LogoImg} source={Images.logo} />
        </View>
        {renderBodyContent()}
      </ScrollView>
    </ImageBackground>
  );
};

export default Login;
