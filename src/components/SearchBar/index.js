// @flow
import React from 'react';
import {View, TouchableOpacity, TextInput} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import styles from './styles';

import {Metrics, Colors} from '../../theme';

const SearchBar = (props) => {
  const {value, onChangeText, onPressCancel} = props;

  return (
    <View style={styles.searchBar}>
      <TextInput
        value={value}
        placeholder="Search here..."
        style={styles.searchBarTextInput}
        placeholderTextColor={Colors.Dove_Gray}
        onChangeText={onChangeText}
      />
      <TouchableOpacity style={styles.closeSerachBar} onPress={onPressCancel}>
        <MaterialIcons name="clear" size={Metrics.ratio(20)} color="#454F63" />
      </TouchableOpacity>
    </View>
  );
};

SearchBar.defaultProps = {
  value: '',
  onChangeText: undefined,
  onPressCancel: undefined,
};

SearchBar.propTypes = {
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  onPressCancel: PropTypes.func,
};

export default SearchBar;
