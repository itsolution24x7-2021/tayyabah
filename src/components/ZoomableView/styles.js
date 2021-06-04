// @flow
import {StyleSheet, Platform} from 'react-native';
import {Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  imageContainer: {
    height: Metrics.screenHeight,
    width: Metrics.screenWidth,
  },
  imageContainerRotate: {
    height: Metrics.screenWidth,
    transform: [
      {rotate: '90deg'},
      {translateX: Metrics.screenWidth / 3},
      {
        translateY:
          Platform.OS == 'ios'
            ? Metrics.screenHeight / 4.58
            : Metrics.screenHeight / 5.1,
      },
    ],
    width: Metrics.screenHeight,
  },
});
