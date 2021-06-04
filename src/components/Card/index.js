import React from 'react';
import { Text, TouchableOpacity, Image } from 'react-native';

import styles from './styles';

const Card = (props) => {
  const { mainCardStyle, onPress, image, text } = props;

  return (
    <TouchableOpacity
      style={[styles.mainCard, mainCardStyle]}
      onPress={onPress}>
      <Image
        resizeMode="contain"
        source={image}
        style={styles.iconMain}></Image>
      <Text style={styles.mainText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Card;
