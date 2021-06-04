// @flow
import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import {Image, View} from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';

import styles from './styles';
import {Metrics} from '../../theme';

const ZoomableView = (props) => {
  const {source, imageRotate, handleThumbnails, showThumbnail, onMove} = props;

  const scaleValue = useRef(0);

  return (
    <ImageZoom
      style={{...styles.container}}
      cropWidth={Metrics.screenWidth}
      cropHeight={Metrics.screenHeight}
      imageWidth={Metrics.screenWidth}
      imageHeight={Metrics.screenHeight}
      minScale={1}
      {...props}
      onStartShouldSetPanResponder={(e) => {
        if (e.nativeEvent.touches.length === 2 || scaleValue.current > 1) {
          handleThumbnails(true);
          return e.nativeEvent.touches.length === 2 || scaleValue.current > 1;
        }
      }}
      onMove={(val) => {
        scaleValue.current = val.scale;
        onMove && onMove({scale: val.scale});
      }}>
      <View
        style={[
          imageRotate ? styles.imageContainerRotate : styles.imageContainer,
        ]}
        onStartShouldSetResponder={(e) => {
          if (e.nativeEvent.touches.length < 2 && scaleValue.current <= 1) {
            handleThumbnails(showThumbnail);
          }
        }}>
        <Image resizeMode="contain" source={source} style={{...styles.image}} />
      </View>
    </ImageZoom>
  );
};

ZoomableView.defaultProps = {
  source: undefined,
  imageRotate: false,
};

ZoomableView.propTypes = {
  source: PropTypes.object,
  imageRotate: PropTypes.bool,
  handleThumbnails: PropTypes.func,
  showThumbnail: PropTypes.bool,
  onMove: PropTypes.func,
};

export default ZoomableView;
