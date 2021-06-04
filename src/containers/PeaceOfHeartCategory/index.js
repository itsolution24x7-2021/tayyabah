// @flow
import React, {useEffect, useState} from 'react';
import {View, ScrollView, Image, Text, TouchableOpacity} from 'react-native';

import styles from './styles';

import {Images} from '../../theme';
import {Header, OverlayLoader, SearchBar} from '../../components';
import {getResource} from '../../config/firebaseMethods';

const PeaceOfHeartCategory = (props) => {
  const [isLoading, setIsLoading] = useState('');
  const [peaceOfHeartCategories, setPeaceOfHeartCategories] = useState([]);
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const main = async () => {
      setIsLoading(true);
      try {
        const peaceOfHeartCategories = await getResource(
          'peaceOfHeartCategory',
        );
        peaceOfHeartCategories.sort(
          (a, b) => a._data.priorty - b._data.priorty,
        );
        setPeaceOfHeartCategories(peaceOfHeartCategories);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    main();
  }, []);

  const handleNavigation = ({categoryName, id}) => {
    props.navigation.navigate('PeaceOfHeartList', {
      categoryName: categoryName,
      categoryId: id,
    });
  };

  const handleSearchBarCancel = () => {
    setShowSearchBox(false);
    setSearchText('');
  };

  const results = !searchText
    ? peaceOfHeartCategories
    : peaceOfHeartCategories?.filter((item) =>
        item?._data?.categoryName
          .toLowerCase()
          .includes(searchText.toLocaleLowerCase()),
      );

  return (
    <View style={styles.backgroundImg}>
      <OverlayLoader isLoading={isLoading} />

      {showSearchBox ? (
        <SearchBar
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
          onPressCancel={handleSearchBarCancel}
        />
      ) : (
        <Header
          leftIcon={Images.BackArrow}
          isLeftIconImg={true}
          leftBtnPress={() => props.navigation.goBack()}
          isRightIconImg={true}
          rightIcon={Images.Search}
          rightBtnPress={() => setShowSearchBox(true)}
          headerText={'Peace of Heart'}
          headerTextStyle={styles.headerTextStyle}
        />
      )}

      <Image
        style={styles.BigHeart}
        resizeMode="contain"
        source={Images.BigHeart}
      />
      <Image
        source={Images.smallHeart}
        resizeMode="contain"
        style={styles.smallHeart}
      />
      <ScrollView>
        <View style={styles.cardMainView}>
          {results.map((item) => {
            const {categoryName, image} = item._data;
            const {id} = item;
            return (
              <TouchableOpacity
                key={id}
                onPress={() => handleNavigation({categoryName, id})}>
                <View style={styles.mainCard}>
                  <Image
                    resizeMode="contain"
                    source={{uri: image}}
                    style={styles.iconMain}></Image>
                  <Text style={styles.mainText}>{categoryName}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default PeaceOfHeartCategory;
