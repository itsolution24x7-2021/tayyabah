// @flow
import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-simple-toast';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './styles';
import {Images, Metrics} from '../../theme';
import {Header, OverlayLoader} from '../../components';
import {getResource} from '../../config/firebaseMethods';

const FontsResources = (props) => {
  const [isLoading, setIsLoading] = useState('');
  const [fontsResources, setFontsResources] = useState('');

  useEffect(() => {
    const fetchFontsResources = async () => {
      setIsLoading(true);
      try {
        const fontsResources = await getResource('fontsAndResources');
        setFontsResources(fontsResources);
        setIsLoading(false);
      } catch (error) {
        console.log(error, 'error');
        setIsLoading(false);
      }
    };

    fetchFontsResources();
  }, []);

  const copyToClipboard = (text) => {
    Clipboard.setString(text);
    Toast.showWithGravity('Copied.', Toast.LONG, Toast.CENTER);
  };

  const openLink = (link) => {
    Linking.openURL(link);
  };

  return (
    <View style={styles.backgroundImg}>
      <OverlayLoader isLoading={isLoading} />

      <Header
        leftIcon={Images.BackArrow}
        isLeftIconImg={true}
        leftBtnPress={() => props.navigation.goBack()}
        headerText={'Fonts / Resources'}
        headerTextStyle={styles.headerTextStyle}
      />

      <Image
        style={styles.bigHeart}
        resizeMode="contain"
        source={Images.BigHeart}
      />

      <Image
        source={Images.smallHeart}
        resizeMode="contain"
        style={styles.smallHeart}
      />

      {fontsResources.length > 0 ? (
        <ScrollView>
          {fontsResources.map((item, key) => {
            const {fontsResources, fontsResourcesType, link} = item._data;
            return (
              <View
                key={key}
                style={{
                  ...styles.card,
                  justifyContent:
                    fontsResourcesType == 'English' ? 'flex-start' : 'flex-end',
                }}>
                <TouchableOpacity
                  onPress={() => copyToClipboard(fontsResources)}
                  style={[
                    styles.copyButton,
                    fontsResourcesType == 'English'
                      ? {right: Metrics.ratio(-8)}
                      : {left: Metrics.ratio(-8)},
                  ]}>
                  <Image
                    resizeMode="contain"
                    source={Images.CopyGray}
                    style={{...styles.copyIcon}}></Image>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => openLink(link)}
                  style={[
                    styles.copyButton,
                    fontsResourcesType == 'English'
                      ? {right: Metrics.ratio(30)}
                      : {left: Metrics.ratio(30)},
                  ]}>
                  <MaterialCommunityIcons
                    name={'link-variant'}
                    size={Metrics.ratio(17)}
                    color={'#979DA8'}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    ...styles.cardText,
                    fontSize:
                      fontsResourcesType == 'English'
                        ? Metrics.ratio(16)
                        : Metrics.ratio(20),
                  }}>
                  {fontsResources}
                </Text>
              </View>
            );
          })}
        </ScrollView>
      ) : (
        <View style={styles.noRecordView}>
          <Text style={styles.noRecordText}>No record found.</Text>
        </View>
      )}
    </View>
  );
};

export default FontsResources;
