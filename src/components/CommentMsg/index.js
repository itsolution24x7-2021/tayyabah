import React from 'react';
import { View, Text, Image } from 'react-native';
import PropTypes from 'prop-types';

import styles from "./styles";

const CommentMsg = (props) => {
  const { image, name, message } = props;

  return (
    <View style={{ ...styles.container }}>
      <Image source={image} resizeMode="cover" style={{ ...styles.profileImage }} />
      <View style={{ ...styles.row }}>
        <Text style={{ ...styles.profileName }}>{name}</Text>
        <Text style={{ ...styles.message }}>{message}</Text>
      </View>
    </View>
  )
};

CommentMsg.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default CommentMsg;
