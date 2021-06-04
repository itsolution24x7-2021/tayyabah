// @flow
import React, {useState, useEffect} from 'react';
import {View, ScrollView, Image, ImageBackground, Text} from 'react-native';

import styles from './styles';

import Card from '../../components/Card';
import {Images, Metrics} from '../../theme';
import {Header, OverlayLoader} from '../../components';
import {getResource} from '../../config/firebaseMethods';

const PhotosCategory = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [photoCategories, setPhotoCategories] = useState([]);

  useEffect(() => {
    const main = async () => {
      setIsLoading(true);
      try {
        const photoCategories = await getResource('photoCategory');
        setIsLoading(false);
        setPhotoCategories(photoCategories);
      } catch (error) {
        console.log(error, 'error');
        setIsLoading(false);
      }
    };

    main();
  }, []);

  return (
    <ImageBackground style={styles.backgroundImg} source={Images.photosBg}>
      <OverlayLoader isLoading={isLoading} />
      <Header
        leftIcon={Images.BackArrow}
        rightIcon={Images.Favorite}
        isLeftIconImg={true}
        isRightIconImg={true}
        leftBtnPress={() => props.navigation.goBack()}
        rightBtnPress={() =>
          props.navigation.navigate('ImagesFavourite', {favouriteItems: true})
        }
        headerText={'Photos'}
        headerTextStyle={styles.headerTextStyle}
        rightText={'Favourites'}
        rightIconStyle={{marginRight: Metrics.ratio(8)}}
      />
      <View style={styles.MainViewStyle}>
        <Image
          resizeMode="contain"
          style={styles.MainLogoImg}
          source={Images.CategoryLogo}
        />
      </View>
      <ScrollView>
        <View style={styles.PhotoCard}>
          <Text style={styles.Head}>Photos/Visual Therapy</Text>
          <Text style={styles.Para}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
        </View>
        <View style={styles.cardMainView}>
          {photoCategories.map((item, index) => {
            const {categoryName, image} = item._data;
            const {id} = item._ref._documentPath;
            let cardWidth = photoCategories.length - 1 === index && photoCategories.length % 2 !== 0
                ? Platform.OS === 'ios' ? Metrics.screenWidth * 0.926 : Metrics.screenWidth * 0.94
                : Platform.OS === 'ios' ? Metrics.screenWidth * 0.435 : Metrics.screenWidth * 0.444;
            return (
              <Card
                text={categoryName}
                image={{uri: image}}
                onPress={() =>
                  props.navigation.navigate('Image', {
                    categoryId: id,
                    categoryName,
                  })
                }
                mainCardStyle={{width: cardWidth}}
              />
            );
          })}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default PhotosCategory;
