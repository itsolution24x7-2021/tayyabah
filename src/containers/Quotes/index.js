import React, {useEffect, useState, useRef} from 'react';
import {
  TouchableOpacity,
  Image,
  ImageBackground,
  View,
  Text,
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
  QuoteCarousel,
  OverlayLoader,
} from '../../components';
import {
  getResourceFromSubCollection,
  createResourceInNestedSubCollection,
  getResourceFromNestedSubCollection,
  deleteResourceFromNestedSubCollection,
  createResourceNestedCollection,
  deleteResourceNestedCollection,
} from '../../config/firebaseMethods';

import util from '../../util';

const Quotes = (props) => {
  const loginResponse = useSelector((state) => state.login);

  const [quotes, setQuotes] = useState([]);
  const [comments, setComments] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [docId, setDocId] = useState('');
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [isLike, setIsLike] = useState(0);
  const [commentMsg, setCommentMsg] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCommentLoading, setIsCommentLoading] = useState(false);

  const modalizeRef = useRef(null);

  useEffect(() => {
    if (props?.route?.params?.categoryId) {
      const {categoryId, categoryName} = props.route.params;

      const fetchQuotes = async () => {
        setIsLoading(true);
        setIsCommentLoading(true);
        setCategoryName(categoryName);
        setCategoryId(categoryId);
        try {
          const quotes = await getResourceFromSubCollection({
            collectionName: 'quotesCategory',
            collectionDocId: categoryId,
            subCollectionName: 'quotes',
          });

          const comment = await getResourceFromNestedSubCollection({
            collectionName: 'quotesCategory',
            collectionDocId: categoryId,
            subCollectionName: 'quotes',
            subCollectionDocId: quotes[0]?.id,
            innerCollectionName: 'comments',
          });

          setQuotes([
            {spacer: 'left-spacer', id: 'left-spacer'},
            ...quotes,
            {spacer: 'right-spacer', id: 'right-spacer'},
          ]);
          setComments(comment);
          setIsLoading(false);
          setIsCommentLoading(false);
        } catch (error) {
          setIsLoading(false);
          util.showAlertWithDelay('Error', error.message, 1000);
        }
      };

      fetchQuotes();
    }

    // if user navigate from favourite icon
    if (props.route?.params?.favourite) {
      const getFavouriteQuotes = async () => {
        const {uid} = loginResponse.data.data;

        let quotes = await getResourceFromSubCollection({
          collectionName: 'user',
          collectionDocId: uid,
          subCollectionName: 'likes',
        });

        setQuotes([
          {spacer: 'left-spacer', id: 'left-spacer'},
          ...quotes,
          {spacer: 'right-spacer', id: 'right-spacer'},
        ]);
      };
      getFavouriteQuotes();
    }
  }, []);

  useEffect(() => {
    if (props?.route?.params?.categoryId) {
      getAlreadyLikes(activeIndex);
    }
  }, [quotes]);

  const getAlreadyLikes = async (index) => {
    setIsLike(false);
    setIsLoading(true);

    try {
      const {uid} = loginResponse.data.data;

      const noOfLikes = await getResourceFromNestedSubCollection({
        collectionName: 'quotesCategory',
        collectionDocId: categoryId,
        subCollectionName: 'quotes',
        subCollectionDocId: quotes[index + 1]?.id,
        innerCollectionName: 'likes',
      });

      const filterData = noOfLikes?.filter((x) => x._data.userId === uid);

      setIsLoading(false);
      if (filterData.length) {
        setIsLike(1);
        setDocId(filterData[0]?.id);
      }
    } catch (error) {
      setIsLoading(false);
      util.showAlertWithDelay('Error', error.message, 1000);
    }
  };

  const cancelComment = () => {
    setShowCommentBox(false);
    setCommentMsg('');
  };

  const handleCommentMsg = (text) => setCommentMsg(text);

  const getComments = async (index) => {
    try {
      setIsCommentLoading(true);
      setActiveIndex(index);

      const comment = await getResourceFromNestedSubCollection({
        collectionName: 'quotesCategory',
        collectionDocId: categoryId,
        subCollectionName: 'quotes',
        subCollectionDocId: quotes[index + 1]?.id,
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
    setIsLike(false);
    try {
      await deleteResourceFromNestedSubCollection({
        collectionName: 'quotesCategory',
        collectionDocId: categoryId,
        subCollectionName: 'quotes',
        subCollectionDocId: quotes[activeIndex + 1]?.id,
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
    } catch (error) {
      console.log(error);
      util.showAlertWithDelay('Error', error, 1000);
    }
  };

  const addToLike = async () => {
    setIsLike(1);
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

      const quotesPayload = {
        quotesInfo: quotes[activeIndex + 1]?._data,
        timeStamp: Date.now(),
        userId: uid,
      };

      let result = await createResourceInNestedSubCollection({
        collectionName: 'quotesCategory',
        collectionDocId: categoryId,
        subCollectionName: 'quotes',
        subCollectionDocId: quotes[activeIndex + 1]?.id,
        innerCollectionName: 'likes',
        payload,
      });

      quotesPayload.quotesCategoryId = categoryId;
      quotesPayload.quotesId = quotes[activeIndex + 1]?.id;
      quotesPayload.likesId = result.id;

      let userResult = await createResourceNestedCollection({
        collectionName: 'user',
        collectionDocId: uid,
        subCollectionName: 'likes',
        subCollectionDocId: result.id,
        payload: quotesPayload,
      });

      setIsLoading(false);

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
        quoteId: quotes[activeIndex + 1]?.id,
        commentType: 'quote',
      };

      try {
        setIsLoading(true);
        await createResourceInNestedSubCollection({
          collectionName: 'quotesCategory',
          collectionDocId: categoryId,
          subCollectionName: 'quotes',
          subCollectionDocId: quotes[activeIndex + 1]?.id,
          innerCollectionName: 'comments',
          payload,
        });

        setCommentMsg('');
        setShowCommentBox(false);
        setIsLoading(false);
        modalizeOpen();
        getComments(activeIndex);
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

  const getCommentsAndLikes = (index) => {
    if (index !== activeIndex) {
      getComments(index);
      getAlreadyLikes(index);
    }
  };

  const modalizeOpen = () => modalizeRef.current.open();

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
    <ImageBackground source={Images.QuotesOverallBg} style={styles.container}>
      <OverlayLoader isLoading={isLoading} />

      <Header
        leftIcon={Images.BackArrow}
        isLeftIconImg={true}
        leftBtnPress={() => props.navigation.goBack()}
        headerText={categoryName}
        headerTextStyle={styles.headerTextStyle}
      />

      {quotes.length > 2 ? (
        <QuoteCarousel
          data={quotes}
          noOfComment={util.nFormatter(comments.length)}
          onMomentumScrollEnd={getCommentsAndLikes}
          copyBtnPress={(text) => copyToClipboard(text)}
          // saveBtnPress={() => { }}
          isLike={isLike}
          favoriteBtnPress={() => {
            !isLike ? addToLike() : addToDisLike();
          }}
          commentBtnPress={modalizeOpen}
        />
      ) : (
        <View style={styles.noRecordView}>
          <Text style={styles.noRecordText}>No record found.</Text>
        </View>
      )}

      {quotes.length > 2 && !showCommentBox && (
        <Image
          source={Images.FlowerLine}
          resizeMode="contain"
          style={{...styles.flowerLineImage}}
        />
      )}

      {quotes.length > 2 && !showCommentBox && (
        <CustomModalize
          modalizeRef={modalizeRef}
          data={comments}
          isLoading={isCommentLoading}
          renderItem={renderItem}
          modalTopOffset={Metrics.ratio(70)}
        />
      )}

      {quotes.length > 2 && !showCommentBox && (
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

      {quotes.length > 2 && showCommentBox && (
        <CommentBox
          value={commentMsg}
          placeholder={'Type your comment here...'}
          onChangeText={handleCommentMsg}
          onSubmitEditing={sendCommentMsg}
          cancelBtnPress={cancelComment}
        />
      )}
    </ImageBackground>
  );
};

export default Quotes;
