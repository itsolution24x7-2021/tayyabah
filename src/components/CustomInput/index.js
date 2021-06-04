// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, TextInput, TouchableOpacity, Text } from 'react-native';
// import {Text} from '../index';
import styles from './styles';

export default class CustomTextInput extends React.Component {
  // state = {secureentry:"true" }
  constructor(props) {
    super(props);
    this.state = {
      sec: props.secureTextEntry,
    };
  }

  static propTypes = {
    returnKeyType: PropTypes.string,
    isEditable: PropTypes.bool,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    topLabelText: PropTypes.string,
    onChangeInput: PropTypes.func,
    emailError: PropTypes.string,
    refrence: PropTypes.object,
    onSubmitRef: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    onSubmit: PropTypes.func,
    enablesReturnKeyAutomaticallly: PropTypes.bool,
    inputLeftIcon: PropTypes.string,
    secureTextEntry: PropTypes.bool,
    customInputStyle: PropTypes.object,
    TextInputPaddingStyle: PropTypes.object,
    CustomTextInputStyle: PropTypes.object
  };

  static defaultProps = {
    returnKeyType: undefined,
    isEditable: undefined,
    value: undefined,
    placeholder: undefined,
    topLabelText: undefined,
    onChangeInput: undefined,
    emailError: undefined,
    refrence: undefined,
    onSubmitRef: undefined,
    onSubmit: undefined,
    enablesReturnKeyAutomaticallly: undefined,
    inputLeftIcon: undefined,
    secureTextEntry: undefined,
    customInputStyle: undefined,
    TextInputPaddingStyle: undefined,
    CustomTextInputStyle: undefined
  };

  render() {
    let {
      refrence,
      returnKeyType,
      placeholder,
      topLabelText,
      isEditable,
      value,
      onChangeInput,
      emailError,
      onSubmitRef,
      onSubmit,
      enablesReturnKeyAutomaticallly,
      inputLeftIcon,
      inputRightIcon,
      inputRightHideIcon,
      customInputStyle,
      TextInputPaddingStyle,
      // CustomTextInputStyle,
      secureTextEntry,
    } = this.props;

    return (
      <View>
        <View style={[styles.InputView, customInputStyle]}>
          {inputLeftIcon && (
            <Image
              style={styles.inputIcon}
              resizeMode="contain"
              source={inputLeftIcon}
            />
          )}
          <Text style={styles.labelTopText}>{topLabelText}</Text>
          <TextInput
            secureTextEntry={this.state.sec}
            returnKeyType={returnKeyType}
            enablesReturnKeyAutomaticallly={enablesReturnKeyAutomaticallly}
            style={[styles.textInputStyle, TextInputPaddingStyle]}
            placeholder={placeholder}
            editable={isEditable}
            ref={refrence}
            value={value}
            autoCapitalize={'none'}
            onChangeText={value => onChangeInput(value)}
            onSubmitEditing={() => {
              onSubmit(onSubmitRef);
            }}
          />
          <TouchableOpacity
            onPress={() => this.setState({ sec: !this.state.sec })}>
            <Image
              style={styles.rightIcon}
              resizeMode="contain"
              source={
                this.state.sec == true ? inputRightIcon : inputRightHideIcon
              }
            // source={ inputRightIcon}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.errormsg}> {emailError}</Text>
      </View>
    );
  }
}
