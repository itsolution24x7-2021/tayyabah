// @flow
import React from 'react';
import PropTypes from 'prop-types';
import {View, Animated} from 'react-native';
import {PinchGestureHandler, State} from 'react-native-gesture-handler';

import styles from './styles';

const ImageZoomable = (props) => {
  const {source} = props;

  const scale = new Animated.Value(1);

  const onGestureEvent = Animated.event(
    [
      {
        nativeEvent: {scale},
      },
    ],
    {useNativeDriver: true},
  );

  const onHandlerStateChange = (event) => {
    if (event.nativeEvent.oldState == State.ACTIVE) {
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <View style={{...styles.container}}>
      <PinchGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}>
        <Animated.Image
          source={source}
          style={{...styles.image, transform: [{scale}]}}
        />
      </PinchGestureHandler>
    </View>
  );
};

ImageZoomable.defaultProps = {
  source: undefined,
};

ImageZoomable.propTypes = {
  source: PropTypes.object,
};

export default ImageZoomable;
