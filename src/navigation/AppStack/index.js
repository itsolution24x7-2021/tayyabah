import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import {
  Calendar,
  Home,
  MyProfile,
  EditProfile,
  Notification,
  PhotosCategory,
  Image,
  AboutUs,
  QuotesCategory,
  PeaceOfHeartCategory,
  PeaceOfHeartList,
  PeaceOfHeartListDetail,
  Quotes,
  FavouriteQuotes,
  ImagesFavourite,
  FontsResources,
  QuotesList,
  SingleQuote,
  FavouriteQuotesList,
} from '../../containers';

const AppStack = createStackNavigator();
const AppStackScreen = () => {
  return (
    <AppStack.Navigator headerMode="none" initialRouteName="Home">
      <AppStack.Screen name="Home" component={Home} />
      <AppStack.Screen name="MyProfile" component={MyProfile} />
      <AppStack.Screen name="EditProfile" component={EditProfile} />
      <AppStack.Screen name="Calendar" component={Calendar} />
      <AppStack.Screen name="Notification" component={Notification} />
      <AppStack.Screen name="PhotosCategory" component={PhotosCategory} />
      <AppStack.Screen name="Image" component={Image} />
      <AppStack.Screen name="AboutUs" component={AboutUs} />
      <AppStack.Screen name="QuotesCategory" component={QuotesCategory} />
      <AppStack.Screen name="FavouriteQuotes" component={FavouriteQuotes} />
      <AppStack.Screen name="ImagesFavourite" component={ImagesFavourite} />
      <AppStack.Screen name="PeaceOfHeartCategory" component={PeaceOfHeartCategory} />
      <AppStack.Screen name="PeaceOfHeartList" component={PeaceOfHeartList} />
      <AppStack.Screen name="PeaceOfHeartListDetail" component={PeaceOfHeartListDetail} />
      <AppStack.Screen name="Quotes" component={Quotes} />
      <AppStack.Screen name="FontsResources" component={FontsResources} />
      <AppStack.Screen name="QuotesList" component={QuotesList} />
      <AppStack.Screen name="SingleQuote" component={SingleQuote} />
      <AppStack.Screen name="FavouriteQuotesList" component={FavouriteQuotesList} />
    </AppStack.Navigator>
  );
};

export default AppStackScreen;
