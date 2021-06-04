import React from 'react';
import { View, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import PropTypes from 'prop-types';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import styles from "./styles";

import { Metrics } from '../../theme';

const CommentBox = (props) => {
  const { value, placeholder, onChangeText, onSubmitEditing, cancelBtnPress } = props;

  return (
    <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? "padding" : null}>
      <View style={{ ...styles.row }}>
        <TextInput
          autoFocus
          multiline
          returnKeyType='send'
          value={value}
          style={{
            ...styles.textInput,
            paddingTop: Platform.OS == 'ios' ? Metrics.ratio(16) : Metrics.ratio(16)
          }}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
          blurOnSubmit={true}
          placeholder={placeholder}
          placeholderTextColor={'#ccc'}
        />
        <TouchableOpacity onPress={cancelBtnPress} style={{ ...styles.cancelBtn }}>
          <MaterialIcons name="clear" size={Metrics.ratio(25)} color="#454F63" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
};

CommentBox.defaultProps = {
  value: '',
  placeholder: '',
  onChangeText: undefined,
  onSubmitEditing: undefined,
  cancelBtnPress: undefined,
};

CommentBox.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChangeText: PropTypes.func.isRequired,
  onSubmitEditing: PropTypes.func.isRequired,
  cancelBtnPress: PropTypes.func.isRequired,
};

export default CommentBox;
