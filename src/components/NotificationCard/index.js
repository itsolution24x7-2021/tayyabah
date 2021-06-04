import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import styles from './styles';

const NotificationCard = (props) => {
  return (
    <TouchableOpacity onPress={props.handlePress} style={styles.mainCard}>
      {props.showOnlineStatus && <View style={styles.online}></View>}
      <Text style={styles.mainText}>
        {props.notification}
      </Text>
      <View>
        <Text style={styles.timeText}>{props.time}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default NotificationCard;
