import React, {useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Animated,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

import {Images, Metrics} from '../../theme';

const QuoteCarousel = (props) => {
  const {
    data,
    onMomentumScrollEnd,
    copyBtnPress,
    favoriteBtnPress,
    commentBtnPress,
    noOfComment,
    isLike,
  } = props;

  const SPACING = 16;
  const ITEM_SIZE = Metrics.screenWidth * 0.82;
  const SPACER_ITEM_SIZE = (Metrics.screenWidth - ITEM_SIZE) / 2;

  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <Animated.FlatList
      showsHorizontalScrollIndicator={false}
      data={data}
      keyExtractor={(item) => item.id.toString()}
      horizontal
      contentContainerStyle={{...styles.contentContainerStyle}}
      snapToInterval={ITEM_SIZE}
      decelerationRate={0}
      bounces={false}
      pagingEnabled
      onMomentumScrollEnd={(ev) => {
        onMomentumScrollEnd(
          Math.round(ev.nativeEvent.contentOffset.x / ITEM_SIZE),
        );
      }}
      onScroll={Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}], {
        useNativeDriver: true,
      })}
      scrollEventThrottle={16}
      renderItem={({item, index}) => {
        const inputRange = [
          (index - 2) * ITEM_SIZE,
          (index - 1) * ITEM_SIZE,
          index * ITEM_SIZE,
        ];
        const translateY = scrollX.interpolate({
          inputRange,
          outputRange: [-15, -60, -15],
        });

        if (item.spacer) {
          return <View style={{width: SPACER_ITEM_SIZE}} />;
        }

        return (
          <View style={{width: ITEM_SIZE, ...styles.itemContainer}}>
            <Animated.View
              style={{
                marginHorizontal: SPACING,
                padding: SPACING,
                transform: [{translateY}],
                ...styles.itemAnimatedContainer,
              }}>
              <Image
                source={Images.InnerQuote}
                resizeMode="contain"
                style={{...styles.innerQuote}}
              />

              <Image
                source={Images.TopFlower}
                resizeMode="contain"
                style={{...styles.topFlower}}
              />

              <Image
                source={Images.BottomFlower}
                resizeMode="contain"
                style={{...styles.bottomFlower}}
              />

              <Image
                source={Images.RightFlower}
                resizeMode="contain"
                style={{...styles.rightFlower}}
              />

              <Image
                source={Images.QuotesCardBg}
                resizeMode="contain"
                style={{...styles.quotesCardBg}}
              />

              <View style={{...styles.actionRow}}>
                <TouchableOpacity
                  style={{...styles.actionBtnView}}
                  onPress={() =>
                    copyBtnPress(
                      `${
                        item?._data?.quotesInfo?.quotes
                          ? item?._data?.quotesInfo?.quotes
                          : item._data?.quotes
                      } - ${
                        item?._data?.quotesInfo?.quotesBy
                          ? item?._data?.quotesInfo?.quotesBy
                          : item._data?.quotesBy
                      }`,
                    )
                  }>
                  <Image
                    source={Images.CopyGray}
                    resizeMode="contain"
                    style={{...styles.copyImage}}
                  />
                </TouchableOpacity>

                {/* <TouchableOpacity style={{ ...styles.actionBtnView }} onPress={saveBtnPress}>
                  <Image source={Images.SaveGray} resizeMode="contain" style={{ ...styles.saveImage }} />
                </TouchableOpacity> */}

                <TouchableOpacity
                  style={{...styles.actionBtnView}}
                  onPress={favoriteBtnPress}>
                  {isLike ? (
                    <Image
                      source={Images.Favorite}
                      resizeMode="contain"
                      style={{...styles.favoriteImage}}
                    />
                  ) : (
                    <Image
                      source={Images.UnFavorite}
                      resizeMode="contain"
                      style={{...styles.favoriteImage}}
                    />
                  )}
                </TouchableOpacity>
              </View>

              <View style={{...styles.secActionView}}>
                <TouchableOpacity
                  style={{...styles.secActionRow}}
                  onPress={commentBtnPress}>
                  <Text style={{...styles.noOfComment}}>{noOfComment}</Text>
                  <Image
                    source={Images.CommentGray}
                    resizeMode="contain"
                    style={{...styles.commentImage}}
                  />
                </TouchableOpacity>
              </View>

              <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={{...styles.quoteTitle}}>
                  {item?._data?.quotesInfo?.quotesTitle
                    ? item?._data?.quotesInfo?.quotesTitle
                    : item._data?.quotesTitle}
                </Text>
                <Text style={{...styles.quoteText}}>
                  {item?._data?.quotesInfo?.quotes
                    ? item?._data?.quotesInfo?.quotes
                    : item._data?.quotes}
                </Text>
                <Text style={{...styles.quoteAuthor}}>
                  &mdash;{' '}
                  {` ${
                    item?._data?.quotesInfo?.quotesBy
                      ? item?._data?.quotesInfo?.quotesBy
                      : item._data?.quotesBy
                  }`}
                </Text>
              </ScrollView>
            </Animated.View>
          </View>
        );
      }}
    />
  );
};

QuoteCarousel.defaultProps = {
  data: [],
  onMomentumScrollEnd: undefined,
  copyBtnPress: undefined,
  // saveBtnPress: undefined,
  favoriteBtnPress: undefined,
  commentBtnPress: undefined,
  isLike: 0,
  noOfComment: 0,
};

QuoteCarousel.propTypes = {
  data: PropTypes.array.isRequired,
  onMomentumScrollEnd: PropTypes.func.isRequired,
  copyBtnPress: PropTypes.func.isRequired,
  isLike: PropTypes.number,

  // saveBtnPress: PropTypes.func.isRequired,
  favoriteBtnPress: PropTypes.func.isRequired,
  commentBtnPress: PropTypes.func.isRequired,
  noOfComment: PropTypes.number,
};

export default QuoteCarousel;
