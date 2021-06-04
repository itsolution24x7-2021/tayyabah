import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ImageBackground } from 'react-native';

import styles from "./styles";

import { Header, OverlayLoader } from '../../components';
import { Images } from '../../theme';
import { getResource } from '../../config/firebaseMethods';

const AboutUs = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [aboutUs, setAboutUs] = useState('');

  useEffect(() => {
    const main = async () => {
      setIsLoading(true);
      try {
        const aboutUs = await getResource('aboutUs');
        setIsLoading(false);
        setAboutUs(aboutUs[0]._data.value);
      } catch (error) {
        console.log(error, 'error');
        setIsLoading(false);
      }
    }

    main();
  }, [])

  return (
    <ImageBackground style={styles.container} source={Images.AboutUsBg}>
      <OverlayLoader isLoading={isLoading} />

      <Header
        leftIcon={Images.BackArrow}
        isLeftIconImg={true}
        headerText={'About Us'}
        headerTextStyle={styles.headerTextStyle}
        leftBtnPress={() => props.navigation.goBack()}
      />

      <View style={styles.cardContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.cardText}>{aboutUs}</Text>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

export default AboutUs;
