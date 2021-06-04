// @flow
import React, {useEffect, useState} from 'react';
import {View, ScrollView, Image, Text, TouchableOpacity} from 'react-native';

import styles from './styles';

import {Images} from '../../theme';
import {Header, OverlayLoader, SearchBar} from '../../components';
import {getResourceFromSubCollection} from '../../config/firebaseMethods';

const PeaceOfHeartList = (props) => {
  const {categoryId, categoryName} = props.route.params;

  const [isLoading, setIsLoading] = useState('');
  const [searchText, setSearchText] = useState('');
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [peaceOfHeart, setPeaceOfHeart] = useState([]);

  useEffect(() => {
    const fetchPeaceOfCategoryList = async () => {
      setIsLoading(true);
      try {
        const peaceOfHeart = await getResourceFromSubCollection({
          collectionName: 'peaceOfHeartCategory',
          collectionDocId: categoryId,
          subCollectionName: 'peaceOfHeart',
        });
        setPeaceOfHeart(peaceOfHeart);
        setIsLoading(false);
      } catch (error) {
        console.log(error, 'error');
        setIsLoading(false);
      }
    };

    fetchPeaceOfCategoryList();
  }, []);

  const handleNavigation = ({categoryId, id, title}) => {
    props.navigation.navigate('PeaceOfHeartListDetail', {
      categoryId: categoryId,
      id,
      title,
    });
  };

  const handleSearchBarCancel = () => {
    setShowSearchBox(false);
    setSearchText('');
  };

  const results = !searchText
    ? peaceOfHeart
    : peaceOfHeart?.filter((item) =>
        item?._data?.title
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
          rightIcon={Images.Search}
          isRightIconImg={true}
          leftBtnPress={() => props.navigation.goBack()}
          rightBtnPress={() => setShowSearchBox(true)}
          headerText={categoryName}
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

      {results.length > 0 ? (
        <ScrollView>
          <View style={styles.cardMainView}>
            {results.map((item) => {
              const {title, categoryId} = item._data;
              const {id} = item;

              return (
                <TouchableOpacity
                  key={id}
                  onPress={() => handleNavigation({categoryId, id, title})}>
                  <View style={styles.mainCard}>
                    <Image
                      resizeMode="contain"
                      source={Images.heartIcon}
                      style={styles.iconMain}></Image>
                    <Text style={styles.mainText}>{title}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      ) : (
        <View style={styles.noRecordView}>
          <Text style={styles.noRecordText}>No record found.</Text>
        </View>
      )}
    </View>
  );
};

export default PeaceOfHeartList;
