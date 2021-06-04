import React from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import PropTypes from 'prop-types';

import styles from './styles';

const OverlayLoader = (props) => {

  const { isLoading } = props;

  return (
    <Spinner
      visible={isLoading}
      customIndicator={
        <View style={{ ...styles.container }}>
          <ActivityIndicator size='small' color={'#4DE528'} />
          <Text style={{ ...styles.message }}>Loading, please wait.</Text>
        </View>
      }
    />
  );
};

OverlayLoader.defaultProps = {
  isLoading: false,
};

OverlayLoader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default OverlayLoader;
