import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  Image,
  ImageBackground,
  View,
  Text,
  TextInput,
  ScrollView,
} from 'react-native';
import {useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';

import styles from './styles';

import {Images, Metrics, Colors} from '../../theme';
import {Header, OverlayLoader} from '../../components';
import {getResourceFromSubCollection} from '../../config/firebaseMethods';

import util from '../../util';

const FavouriteQuotesList = (props) => {
  const isFocused = useIsFocused();
  const loginResponse = useSelector((state) => state.login);

  const [quotes, setQuotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchQuotes = async () => {
      const {uid} = loginResponse.data.data;
      setIsLoading(true);

      try {
        let quotes = await getResourceFromSubCollection({
          collectionName: 'user',
          collectionDocId: uid,
          subCollectionName: 'likes',
        });

        setIsLoading(false);
        setQuotes(quotes);
      } catch (error) {
        setIsLoading(false);
        util.showAlertWithDelay('Error', error.message, 1000);
      }
    };

    fetchQuotes();
  }, [isFocused]);

  const handleNavigation = (quotesCategory, quotesCategoryId, quoteId) => {
    props.navigation.navigate('SingleQuote', {
      categoryName: quotesCategory,
      categoryId: quotesCategoryId,
      quoteId,
    });
  };

  const results = !searchText
    ? quotes
    : quotes?.filter((item) =>
        item?._data?.quotes
          .toLowerCase()
          .includes(searchText.toLocaleLowerCase()),
      );

  return (
    <ImageBackground source={Images.QuoteBackground} style={styles.container}>
      <OverlayLoader isLoading={isLoading} />

      <Header
        leftIcon={Images.BackArrow}
        isLeftIconImg={true}
        leftBtnPress={() => props.navigation.goBack()}
        headerText={'Favourite Quotes'}
        headerTextStyle={styles.headerTextStyle}
      />

      <View style={{...styles.searchBar}}>
        <Image source={Images.Search} style={{...styles.searchBarIcon}} />
        <TextInput
          value={searchText}
          placeholder="Search here..."
          style={{...styles.searchBarTextInput}}
          placeholderTextColor={Colors.Dove_Gray}
          onChangeText={(text) => setSearchText(text)}
        />
      </View>

      {results.length > 0 ? (
        <ScrollView style={{marginVertical: Metrics.ratio(16)}}>
          {results.map((item) => {
            return (
              <TouchableOpacity
                key={item._ref.id}
                onPress={() =>
                  handleNavigation(
                    item._data.quotesInfo.categoryName,
                    item._data.quotesInfo.categoryId,
                    item._data.quotesId,
                  )
                }
                style={{...styles.quoteItem}}>
                <Image
                  resizeMode="contain"
                  source={Images.quoteSmall}
                  style={{...styles.quoteItemIcon}}
                />
                <Text numberOfLines={1} style={{...styles.quoteItemText}}>
                  {item?._data?.quotesInfo?.quotes}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      ) : (
        <View style={styles.noRecordView}>
          <Text style={styles.noRecordText}>
            {isLoading ? 'Loading, please wait.' : 'No record found.'}
          </Text>
        </View>
      )}
    </ImageBackground>
  );
};

export default FavouriteQuotesList;
