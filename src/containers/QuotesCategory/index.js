// @flow
import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
} from 'react-native';

import styles from './styles';

import {Images} from '../../theme';
import {Header, OverlayLoader, SearchBar} from '../../components';
import {getResource} from '../../config/firebaseMethods';

const QuotesCategory = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [quoteCategories, setQuoteCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchText, setSearchText] = useState('');
  const [showSearchBox, setShowSearchBox] = useState(false);

  useEffect(() => {
    const main = async () => {
      setIsLoading(true);
      try {
        const quoteCategories = await getResource('quotesCategory');
        setIsLoading(false);
        setQuoteCategories(quoteCategories);
      } catch (error) {
        console.log(error, 'error');
        setIsLoading(false);
      }
    };

    main();
  }, []);

  const handleNavigation = ({quotesCategory, id}) => {
    setSelectedCategory(quotesCategory);
    props.navigation.navigate('QuotesList', {
      categoryName: quotesCategory,
      categoryId: id,
    });
  };

  const handleSearchBarCancel = () => {
    setShowSearchBox(false);
    setSearchText('');
  };

  const results = !searchText
    ? quoteCategories
    : quoteCategories?.filter((item) =>
        item?._data?.quotesCategory
          .toLowerCase()
          .includes(searchText.toLocaleLowerCase()),
      );

  return (
    <ImageBackground
      style={styles.backgroundImg}
      source={Images.QuoteBackground}>
      <OverlayLoader isLoading={isLoading} />

      {showSearchBox ? (
        <SearchBar
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
          onPressCancel={handleSearchBarCancel}
        />
      ) : (
        <Header
          isLeftIconImg={true}
          leftIcon={Images.BackArrow}
          leftBtnPress={() => props.navigation.goBack()}
          headerText={'Quotes'}
          headerTextStyle={styles.headerTextStyle}
          isRightIconImg={true}
          rightIcon={Images.Favorite}
          rightBtnPress={() =>
            props.navigation.navigate('FavouriteQuotesList', {favourite: true})
          }
          rightText={'Favourites'}
          isRightSecIconImg={true}
          rightSecIcon={Images.Search}
          rightSecBtnPress={() => setShowSearchBox(true)}
        />
      )}

      <ScrollView>
        <View style={styles.cardMainView}>
          {results.map((item) => {
            const {quotesCategory} = item._data;
            const {id} = item;
            return (
              <TouchableOpacity
                key={id}
                onPress={() => handleNavigation({quotesCategory, id})}>
                <View
                  style={{
                    ...styles.mainCard,
                    backgroundColor:
                      quotesCategory === selectedCategory
                        ? '#e4f6e5'
                        : '#F7F7FA',
                  }}>
                  <Image
                    resizeMode="contain"
                    source={
                      quotesCategory === selectedCategory
                        ? Images.quoteSmallGreen
                        : Images.quoteSmall
                    }
                    style={styles.iconMain}
                  />
                  <Text
                    style={{
                      color:
                        quotesCategory == selectedCategory
                          ? '#14C114'
                          : 'rgba(69, 79, 99, 0.5)',
                      ...styles.categoryName,
                    }}>
                    {quotesCategory}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default QuotesCategory;
