import React, {useEffect, useState, useRef} from 'react';
import {
  TouchableOpacity,
  Image,
  ImageBackground,
  View,
  Text,
  ScrollView,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-simple-toast';
import {useSelector} from 'react-redux';

import styles from './styles';

import {Images, Metrics} from '../../theme';
import {
  Header,
  CustomModalize,
  CommentBox,
  CommentMsg,
  OverlayLoader,
} from '../../components';
import {
  createResourceInNestedSubCollection,
  getResourceFromNestedSubCollection,
  deleteResourceFromNestedSubCollection,
  createResourceNestedCollection,
  deleteResourceNestedCollection,
  getResourceByIdFromSubCollection,
} from '../../config/firebaseMethods';

import util from '../../util';

const SingleQuote = (props) => {
  const loginResponse = useSelector((state) => state.login);

  const [quote, setQuote] = useState();
  const [comments, setComments] = useState([]);
  const [docId, setDocId] = useState('');
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [isLike, setIsLike] = useState(0);
  const [commentMsg, setCommentMsg] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [quoteId, setQuoteId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCommentLoading, setIsCommentLoading] = useState(false);

  const modalizeRef = useRef(null);

  useEffect(() => {
    if (props?.route?.params?.categoryId) {
      const {categoryId, categoryName, quoteId} = props.route.params;
      const {uid} = loginResponse.data.data;

      const fetchQuote = async () => {
        setIsLoading(true);
        setIsCommentLoading(true);
        setCategoryName(categoryName);
        setCategoryId(categoryId);
        setQuoteId(quoteId);

        try {
          const quote = await getResourceByIdFromSubCollection({
            collectionName: 'quotesCategory',
            collectionDocId: categoryId,
            subCollectionName: 'quotes',
            subCollectionDocId: quoteId,
          });

          const comment = await getResourceFromNestedSubCollection({
            collectionName: 'quotesCategory',
            collectionDocId: categoryId,
            subCollectionName: 'quotes',
            subCollectionDocId: quoteId,
            innerCollectionName: 'comments',
          });

          const noOfLikes = await getResourceFromNestedSubCollection({
            collectionName: 'quotesCategory',
            collectionDocId: categoryId,
            subCollectionName: 'quotes',
            subCollectionDocId: quoteId,
            innerCollectionName: 'likes',
          });

          const filterData = noOfLikes?.filter((x) => x._data.userId === uid);

          if (filterData.length) {
            setIsLike(1);
            setDocId(filterData[0]?.id);
          }

          setQuote(quote);
          setComments(comment);
          setIsLoading(false);
          setIsCommentLoading(false);
        } catch (error) {
          setIsLoading(false);
          util.showAlertWithDelay('Error', error.message, 1000);
        }
      };

      fetchQuote();
    }
  }, []);

  const cancelComment = () => {
    setShowCommentBox(false);
    setCommentMsg('');
  };

  const handleCommentMsg = (text) => setCommentMsg(text);

  const getComments = async () => {
    try {
      setIsCommentLoading(true);
      const comment = await getResourceFromNestedSubCollection({
        collectionName: 'quotesCategory',
        collectionDocId: categoryId,
        subCollectionName: 'quotes',
        subCollectionDocId: quoteId,
        innerCollectionName: 'comments',
      });

      setComments(comment);
      setIsCommentLoading(false);
    } catch (error) {
      setIsCommentLoading(false);
      util.showAlertWithDelay('Error', error.message, 1000);
    }
  };

  const addToDisLike = async () => {
    const {uid} = loginResponse.data.data;

    setIsLoading(true);
    try {
      await deleteResourceFromNestedSubCollection({
        collectionName: 'quotesCategory',
        collectionDocId: categoryId,
        subCollectionName: 'quotes',
        subCollectionDocId: quoteId,
        innerCollectionName: 'likes',
        innerCollectionDocId: docId,
      });

      await deleteResourceNestedCollection({
        collectionName: 'user',
        collectionDocId: uid,
        subCollectionName: 'likes',
        subCollectionDocId: docId,
      });

      setIsLoading(false);
      setIsLike(0);
    } catch (error) {
      console.log(error);
      util.showAlertWithDelay('Error', error, 1000);
    }
  };

  const addToLike = async () => {
    setIsLoading(true);

    const {
      email,
      firstName,
      profileImage,
      uid,
      lastName,
    } = loginResponse.data.data;

    try {
      const payload = {
        email,
        firstName,
        profileImage,
        userId: uid,
        lastName,
        timeStamp: Date.now(),
      };

      const quotePayload = {
        quotesInfo: quote._data,
        timeStamp: Date.now(),
        userId: uid,
      };

      let result = await createResourceInNestedSubCollection({
        collectionName: 'quotesCategory',
        collectionDocId: categoryId,
        subCollectionName: 'quotes',
        subCollectionDocId: quoteId,
        innerCollectionName: 'likes',
        payload,
      });

      quotePayload.quotesCategoryId = categoryId;
      quotePayload.quotesId = quoteId;
      quotePayload.likesId = result.id;

      await createResourceNestedCollection({
        collectionName: 'user',
        collectionDocId: uid,
        subCollectionName: 'likes',
        subCollectionDocId: result.id,
        payload: quotePayload,
      });

      setIsLoading(false);
      setIsLike(1);
      setDocId(result.id);
    } catch (error) {
      setIsLoading(false);
      util.showAlertWithDelay('Error', error, 1000);
    }
  };

  const sendCommentMsg = async () => {
    if (commentMsg) {
      const {firstName, lastName, profileImage, uid} = loginResponse.data.data;
      const payload = {
        userId: uid,
        firstName,
        lastName,
        profileImage,
        msg: commentMsg,
        timeStamp: Date.now(),
        categoryId,
        quoteId: quoteId,
        commentType: 'quote',
      };

      try {
        setIsLoading(true);
        await createResourceInNestedSubCollection({
          collectionName: 'quotesCategory',
          collectionDocId: categoryId,
          subCollectionName: 'quotes',
          subCollectionDocId: quoteId,
          innerCollectionName: 'comments',
          payload,
        });

        setCommentMsg('');
        setShowCommentBox(false);
        setIsLoading(false);
        modalizeOpen();
        getComments();
      } catch (error) {
        setIsLoading(false);
        util.showAlertWithDelay('Error', error.message, 1000);
      }
    } else {
      Toast.showWithGravity(
        'Please, Type a message to continue.',
        Toast.LONG,
        Toast.CENTER,
      );
    }
  };

  const copyToClipboard = (text) => {
    Clipboard.setString(text);
    Toast.showWithGravity('Quote copied.', Toast.LONG, Toast.CENTER);
  };

  const modalizeOpen = () => {
    setShowCommentBox(false);
    modalizeRef.current.open();
  };

  const renderItem = ({item}) => {
    const {firstName, lastName, profileImage, msg} = item._data;
    return (
      <CommentMsg
        image={{uri: profileImage}}
        name={`${firstName} ${lastName}`}
        message={msg}
      />
    );
  };

  return (
    <ImageBackground
      source={Images.QuotesOverallBg}
      style={{...styles.container}}>
      <OverlayLoader isLoading={isLoading} />

      <Header
        leftIcon={Images.BackArrow}
        isLeftIconImg={true}
        leftBtnPress={() => props.navigation.goBack()}
        headerText={categoryName}
        headerTextStyle={{...styles.headerTextStyle}}
        isRightIconImg={true}
        rightIcon={Images.CopyGray}
        rightBtnPress={() => copyToClipboard(quote?._data?.quotes)}
        isRightSecIconImg={true}
        rightSecIcon={isLike ? Images.Favorite : Images.UnFavorite}
        rightSecBtnPress={isLike ? addToDisLike : addToLike}
      />

      <View style={{...styles.contentContainer}}>
        {quote?._data?.quotes && (
          <Image
            source={Images.InnerQuote}
            resizeMode="contain"
            style={{...styles.innerQuote}}
          />
        )}
        {quote?._data?.quotes && (
          <Image
            source={Images.TopFlower}
            resizeMode="contain"
            style={{...styles.topFlower}}
          />
        )}
        {quote?._data?.quotes && (
          <Image
            source={Images.BottomFlower}
            resizeMode="contain"
            style={{...styles.bottomFlower}}
          />
        )}
        {quote?._data?.quotes && (
          <Image
            source={Images.RightFlower}
            resizeMode="contain"
            style={{...styles.rightFlower}}
          />
        )}

        {quote?._data?.quotes && (
          <TouchableOpacity
            onPress={modalizeOpen}
            style={{...styles.noOfCommentsContainer}}>
            <Text style={{...styles.noOfCommentsText}}>
              {util.nFormatter(comments.length)}
            </Text>
            <Image
              source={Images.CommentGray}
              resizeMode="contain"
              style={{...styles.noOfCommentsImage}}
            />
          </TouchableOpacity>
        )}

        {quote?._data?.quotes && (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{...styles.quoteScrollView}}>
            {quote?._data?.quotesTitle && (
              <Text style={{...styles.quoteTitle}}>
                {quote?._data?.quotesTitle}
              </Text>
            )}
            <Text style={{...styles.quoteText}}>{quote?._data?.quotes}</Text>
            <Text numberOfLines={1} style={{...styles.quoteAuthor}}>
              &mdash; {quote?._data?.quotesBy}
            </Text>
          </ScrollView>
        )}

        {quote?._data?.quotes && !showCommentBox && (
          <Image
            source={Images.FlowerLine}
            resizeMode="contain"
            style={{...styles.flowerLine}}
          />
        )}

        {quote?._data?.quotes && !showCommentBox && (
          <CustomModalize
            modalizeRef={modalizeRef}
            data={comments}
            isLoading={isCommentLoading}
            renderItem={renderItem}
            modalTopOffset={Metrics.ratio(70)}
          />
        )}

        {quote?._data?.quotes && !showCommentBox && (
          <TouchableOpacity
            onPress={() => setShowCommentBox(!showCommentBox)}
            style={{...styles.commentFloatingView}}>
            <Image
              source={Images.CreateComment}
              resizeMode="contain"
              style={{...styles.commentFloatingImage}}
            />
          </TouchableOpacity>
        )}

        {quote?._data?.quotes && showCommentBox && (
          <CommentBox
            value={commentMsg}
            placeholder={'Type your comment here...'}
            onChangeText={handleCommentMsg}
            onSubmitEditing={sendCommentMsg}
            cancelBtnPress={cancelComment}
          />
        )}
      </View>
    </ImageBackground>
  );
};

export default SingleQuote;
