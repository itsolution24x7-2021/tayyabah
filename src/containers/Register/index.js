// @flow
import React, { useRef, useState, useEffect } from 'react';
import DatePicker from 'react-native-datepicker';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useDispatch, useSelector } from 'react-redux';

import styles from './styles';

import { Images, Metrics, Fonts } from '../../theme';
import {
  emailRegex,
  nameRegex,
  passwordRegex,
  validate,
} from '../../services/validation';
import { CustomTextInput, Header, OverlayLoader } from '../../components';
import { request as register_request } from '../../redux/actions/Register';
import { logout } from '../../redux/actions/Login';
import util from '../../util';

let errors = {
  emailErr: 'Invalid email address.',
  passwordErr: 'Minimum eight characters, at least one uppercase letter, one lowercase letter and one number',
};

const Register = (props) => {
  const dispatch = useDispatch();

  const createRef = {
    firstNameInputRef: useRef(null),
    lastNameInputRef: useRef(null),
    emailInputRef: useRef(null),
    passwordInputRef: useRef(null),
  };

  const [placeholderImage, setPlaceholderImage] = useState({});
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [password, setUserPassword] = useState('');

  const [placeholderImageError, setPlaceholderImageError] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [dateOfBirthError, setDateOfBirthError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const registerResponse = useSelector(state => state.register);

  useEffect(() => {
    const main = async () => {
      if (
        !registerResponse?.isFetching &&
        !registerResponse?.failure &&
        registerResponse?.data?.id
      ) {

        try {
          setIsLoading(false);
          util.showAlertWithDelay('SUCCESS', 'Your account has been created successfully.', 1000)
          await dispatch(logout());
          props.navigation.goBack();
        } catch (error) {
          console.log(error, 'error')
        }

      } else if (!registerResponse?.isFetching) {
        setIsLoading(false);
      }
    }

    main();
  }, [registerResponse?.isFetching])

  useEffect(() => {
    setTimeout(() => {
      setPlaceholderImageError('');
      setDateOfBirthError('');
    }, 3000);
  }, [placeholderImageError, dateOfBirthError]);

  const handleValidation = async () => {
    if (!placeholderImage?.uri) {
      setPlaceholderImageError('Profile image is required.')
    } else if (!firstName) {
      setFirstNameError('First name is required.');
    } else if (!lastName) {
      setLastNameError('Last name is required.');
    } else if (!email) {
      setEmailError('Email is required.');
    } else if (!dateOfBirth) {
      setDateOfBirthError('Date of birth is required.');
    } else if (!password) {
      return setPasswordError('Password is required.');
    } else if (
      placeholderImage.uri &&
      firstName &&
      lastName &&
      email &&
      dateOfBirth &&
      password &&
      !firstNameError &&
      !lastNameError &&
      !emailError &&
      !dateOfBirthError &&
      !passwordError
    ) {
      try {
        setIsLoading(true);
        const profileImageBlob = await uriToBlob(placeholderImage.uri)
        const payload = {
          firstName,
          lastName,
          email,
          dateOfBirth,
          password,
          profileImageBlob,
          userType: "user",
          isActive: true,
          timeStamp: Date.now(),
        };
        await dispatch(register_request(payload));
      } catch (error) {
        console.log(error, 'error')
        setIsLoading(false);
      }
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
  }

  const onSubmit = (value) => {
    if (value === 'onDone') {
      handleValidation();
    } else {
      value.current.focus();
    }
  };

  const pickImage = () => {
    let options = {};
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
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

  const renderLoginFields = () => {
    return (
      <View>
        <CustomTextInput
          returnKeyType="next"
          enablesReturnKeyAutomaticallly={true}
          placeholder="First Name"
          editable={true}
          refrence={createRef.firstNameInputRef}
          value={firstName}
          onChangeInput={(value) =>
            onChangeInput(value, setFirstName, setFirstNameError, nameRegex, firstNameError)
          }
          onSubmitRef={createRef.lastNameInputRef}
          onSubmit={(onSubmitRef) => {
            onSubmit(onSubmitRef);
          }}
          emailError={firstNameError}
        />

        <CustomTextInput
          returnKeyType="next"
          enablesReturnKeyAutomaticallly={true}
          placeholder="Last Name"
          editable={true}
          refrence={createRef.lastNameInputRef}
          value={lastName}
          onChangeInput={(value) =>
            onChangeInput(
              value,
              setLastName,
              setLastNameError,
              emailRegex,
              errors.lastNameError,
            )
          }
          onSubmitRef={createRef.emailInputRef}
          onSubmit={(onSubmitRef) => {
            onSubmit(onSubmitRef);
          }}
          emailError={lastNameError}
        />

        <CustomTextInput
          inputLeftIcon={Images.EmailSignup}
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

        <DatePicker
          confirmBtnText={'Confirm'}
          cancelBtnText={'Cancel'}
          date={dateOfBirth}
          mode={'date'}
          format={'YYYY-MM-DD'}
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
            marginBottom: dateOfBirthError ? Metrics.ratio(0) : Metrics.ratio(15),
            height: Metrics.ratio(50),
          }}
          placeholder="Date of Birth"
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
              left: -55,
            },
          }}
        />
        {dateOfBirthError ? (
          <Text style={{
            color: 'red',
            fontSize: Fonts.size.fourteen,
            fontFamily: Fonts.type.MontserratRegular,
            marginLeft: Metrics.ratio(20),
          }}>{dateOfBirthError}</Text>
        ) : null}

        <CustomTextInput
          inputLeftIcon={Images.PasswordSignup}
          inputRightIcon={Images.eyeShowPass}
          inputRightHideIcon={Images.eyeHidePass}
          secureTextEntry={true}
          returnKeyType="done"
          enablesReturnKeyAutomaticallly={true}
          placeholder={'Password'}
          editable={true}
          refrence={createRef.passwordInputRef}
          value={password}
          onChangeInput={(value) =>
            onChangeInput(
              value,
              setUserPassword,
              setPasswordError,
              passwordRegex,
              errors.passwordErr,
            )
          }
          onSubmitRef={'onDone'}
          onSubmit={(onSubmitRef) => {
            onSubmit(onSubmitRef);
          }}
          emailError={passwordError}
        />
      </View>
    );
  };

  const renderUploadImage = () => {
    return (
      <>
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity style={{}} onPress={() => pickImage()}>
            <Image
              style={styles.placeholder}
              source={
                placeholderImage?.uri
                  ? { uri: placeholderImage.uri }
                  : Images.Placeholder
              }
            />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Image style={styles.uploadIcon} source={Images.Upload} />
          <Text style={{ ...styles.uploadText, marginBottom: placeholderImageError ? Metrics.ratio(4) : Metrics.ratio(30) }}>Upload image</Text>
        </View>
        {placeholderImageError ? (
          <Text style={{
            color: 'red',
            fontSize: Metrics.ratio(12),
            fontFamily: Fonts.type.MontserratRegular,
            alignSelf: 'center',
            marginBottom: Metrics.ratio(30),
          }}>{placeholderImageError}</Text>
        ) : null}
      </>
    );
  };

  const renderBodyContent = () => {
    return (
      <View style={styles.CardViewStyle}>
        <Text style={styles.heading}> Sign Up</Text>
        {renderUploadImage()}
        {renderLoginFields()}
        <View style={styles.signupBtn}>
          <TouchableOpacity onPress={handleValidation}>
            <Text style={styles.loginBtnText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? "padding" : null} style={{ flex: 1 }}>
      <ImageBackground
        style={styles.backgroundImg}
        source={Images.loginBackground}>
        <OverlayLoader isLoading={isLoading} />

        <Header
          leftIcon={Images.BackArrow}
          isLeftIconImg={true}
          leftBtnPress={() => props.navigation.goBack()}
          headerText={''}
          headerTextStyle={styles.headerTextStyle}
        />

        <ScrollView>
          <View style={styles.MainViewStyle}>
            <Image style={styles.SignUpLogoImg} source={Images.logo} />
          </View>

          {renderBodyContent()}
        </ScrollView>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default Register;
