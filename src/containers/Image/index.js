import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  Platform,
  PermissionsAndroid,
  Animated,
  StatusBar,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Menu, {MenuItem} from 'react-native-material-menu';
import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';
import {useSelector} from 'react-redux';
import Toast from 'react-native-simple-toast';
import CameraRoll from '@react-native-community/cameraroll';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './styles';

import {Images, Metrics} from '../../theme';
import {
  ImageCarousel,
  OverlayLoader,
  CustomModalize,
  CommentMsg,
  CommentBox,
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

const ImageScreen = (props) => {
  const {categoryId, categoryName} = props.route.params;

  const loginResponse = useSelector((state) => state.login);
  const networkInfoResponse = useSelector((state) => state.networkInfo);

  const menuRef = useRef(null);
  const modalizeRef = useRef(null);

  const [images, setImages] = useState([]);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [docId, setDocId] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLike, setIsLike] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [commentMsg, setCommentMsg] = useState('');
  const [isCommentLoading, setIsCommentLoading] = useState(false);
  const [imageRotate, setImageRotate] = useState(false);
  const [slideUpValue] = useState(new Animated.Value(1));

  const modalizeOpen = () => {
    setIsCommentLoading(true);
    modalizeRef.current.open();
    hideMenu();
  };

  const hideMenu = () => menuRef?.current?.hide();

  const showMenu = () => menuRef?.current?.show();

  const handleCommentMsg = (text) => setCommentMsg(text);

  useEffect(() => {
    const fetchImages = async () => {
      setIsLoading(true);
      try {
        const images = await getResourceFromSubCollection({
          collectionName: 'photoCategory',
          collectionDocId: categoryId,
          subCollectionName: 'photos',
        });

        setIsLoading(false);
        setImages(images);
      } catch (error) {
        console.log(error, 'error');
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    if (images.length > 0) setImageUrl(images[activeIndex]._data.image);
  }, [activeIndex, images]);

  useEffect(() => {
    onChangeImage(activeIndex);
  }, [setImages, images]);

  const _startSlideUp = () => {
    return Animated.parallel([
      Animated.timing(slideUpValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const _endSlideUp = () => {
    return Animated.parallel([
      Animated.timing(slideUpValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleHeader = (showHeader) => {
    if (showHeader) {
      _endSlideUp();
    } else {
      _startSlideUp();
    }
  };

  const handleDownloadImage = async () => {
    try {
      let granted;
      if (Platform.OS === 'android') {
        granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );
      }

      if (
        Platform.OS === 'android' &&
        granted !== PermissionsAndroid.RESULTS.GRANTED
      ) {
        setIsLoading(false);
        util.showAlertWithDelay('Error', 'Camera permission denied', 1000);
      } else {
        downloadImage();
      }
    } catch (error) {
      console.log(error, 'error');
    }
  };

  const downloadImage = () => {
    const {isConnected} = networkInfoResponse.data;

    let newImgUri = imageUrl.lastIndexOf('/');
    let imageName = imageUrl.substring(newImgUri);

    let dirs = RNFetchBlob.fs.dirs;
    let path =
      Platform.OS === 'ios'
        ? dirs['MainBundleDir'] + imageName
        : dirs.PictureDir + imageName;

    if (isConnected) {
      setIsLoading(true);
      if (Platform.OS == 'android') {
        RNFetchBlob.config({
          fileCache: true,
          appendExt: 'png',
          indicator: true,
          IOSBackgroundTask: true,
          path: path,
          addAndroidDownloads: {
            useDownloadManager: true,
            notification: true,
            path: path,
            description: 'Image',
          },
        })
          .fetch('GET', imageUrl)
          .then((res) => {
            setIsLoading(false);
          })
          .catch((error) => {
            setIsLoading(false);
            hideMenu();
            console.log(error, 'error');
          });
      } else {
        // For ios directory
        CameraRoll.saveToCameraRoll(imageUrl);
      }
    } else {
      util.showAlertWithDelay(
        'No internet connection',
        'Please check your internet connection and try again.',
        1000,
      );
    }
  };

  const shareImage = () => {
    const {isConnected} = networkInfoResponse.data;
    let imagePath = null;
    if (isConnected) {
      setIsLoading(true);
      RNFetchBlob.config({fileCache: true})
        .fetch('GET', imageUrl)
        // the image is now dowloaded to device's storage
        .then((resp) => {
          // the image path you can use it directly with Image component
          imagePath = resp.path();
          return resp.readFile('base64');
        })
        .then(async (base64Res) => {
          let base64Data = `data:image/png;base64,` + base64Res;
          // here's base64 encoded image
          await Share.open({url: base64Data});
          setIsLoading(false);
          hideMenu();
          // remove the file from storage
          return RNFetchBlob.fs.unlink(imagePath);
        })
        .catch((error) => {
          hideMenu();
          setIsLoading(false);
          if (error.error) util.showAlertWithDelay('Error', error.error, 1000);
        });
    } else {
      util.showAlertWithDelay(
        'No internet connection',
        'Please check your internet connection and try again.',
        1000,
      );
    }
  };

  const onChangeImage = async (index) => {
    setActiveIndex(index);
    setIsLike(false);
    _startSlideUp();

    const {uid} = loginResponse.data.data;

    const noOfLikes = await getResourceFromNestedSubCollection({
      collectionName: 'photoCategory',
      collectionDocId: categoryId,
      subCollectionName: 'photos',
      subCollectionDocId: images[index]?.id,
      innerCollectionName: 'likes',
    });

    const filterData = noOfLikes?.filter((x) => x._data.userId === uid);
    if (filterData.length) {
      setIsLike(true);
      setDocId(filterData[0]?.id);
    }
  };

  const addToDisLike = async () => {
    const {uid} = loginResponse.data.data;

    setIsLoading(true);
    setIsLike(false);
    try {
      let result = await deleteResourceFromNestedSubCollection({
        collectionName: 'photoCategory',
        collectionDocId: categoryId,
        subCollectionName: 'photos',
        subCollectionDocId: images[activeIndex].id,
        innerCollectionName: 'likes',
        innerCollectionDocId: docId,
      });

      await deleteResourceNestedCollection({
        collectionName: 'user',
        collectionDocId: uid,
        subCollectionName: 'imageLikes',
        subCollectionDocId: docId,
      });

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      util.showAlertWithDelay('Error', error, 1000);
    }
  };

  const addToLike = async () => {
    const {
      email,
      firstName,
      profileImage,
      uid,
      lastName,
    } = loginResponse.data.data;

    setIsLike(true);
    setIsLoading(true);

    try {
      const payload = {
        email,
        firstName,
        profileImage,
        userId: uid,
        lastName,
        timeStamp: Date.now(),
      };

      const imagesLikePayload = {
        imagesInfo: images[activeIndex]?._data,
        timeStamp: Date.now(),
        userId: uid,
      };

      let result = await createResourceInNestedSubCollection({
        collectionName: 'photoCategory',
        collectionDocId: categoryId,
        subCollectionName: 'photos',
        subCollectionDocId: images[activeIndex].id,
        innerCollectionName: 'likes',
        payload,
      });

      setIsLoading(false);

      imagesLikePayload.imagesCategoryId = categoryId;
      imagesLikePayload.imagesId = images[activeIndex].id;
      imagesLikePayload.likesId = result.id;

      let userResult = await createResourceNestedCollection({
        collectionName: 'user',
        collectionDocId: uid,
        subCollectionName: 'imageLikes',
        subCollectionDocId: result.id,
        payload: imagesLikePayload,
      });

      setDocId(result.id);
    } catch (error) {
      console.log(error);
      util.showAlertWithDelay('Error', error, 1000);
    }
  };

  const handleOnClosedModalize = () => {
    setCommentMsg('');
    setComments([]);
    setIsCommentLoading(false);
  };

  const getComments = async () => {
    const {isConnected} = networkInfoResponse.data;
    if (isConnected) {
      try {
        setIsCommentLoading(true);

        const comment = await getResourceFromNestedSubCollection({
          collectionName: 'photoCategory',
          collectionDocId: categoryId,
          subCollectionName: 'photos',
          subCollectionDocId: images[activeIndex].id,
          innerCollectionName: 'comments',
        });

        setComments(comment);
        setIsCommentLoading(false);
      } catch (error) {
        setIsCommentLoading(false);
        util.showAlertWithDelay('Error', error.message, 1000);
      }
    } else {
      setIsLoading(false);
      util.showAlertWithDelay(
        'No internet connection',
        'Please check your internet connection and try again.',
        1000,
      );
    }
  };

  const sendCommentMsg = async () => {
    const {isConnected} = networkInfoResponse.data;
    if (commentMsg) {
      if (isConnected) {
        const {
          firstName,
          lastName,
          profileImage,
          uid,
        } = loginResponse.data.data;
        const payload = {
          userId: uid,
          firstName,
          lastName,
          profileImage,
          msg: commentMsg,
          timeStamp: Date.now(),
          categoryId,
          photoId: images[activeIndex].id,
          commentType: 'photo',
        };
        try {
          setIsLoading(true);
          await createResourceInNestedSubCollection({
            collectionName: 'photoCategory',
            collectionDocId: categoryId,
            subCollectionName: 'photos',
            subCollectionDocId: images[activeIndex].id,
            innerCollectionName: 'comments',
            payload,
          });

          setCommentMsg('');
          setIsLoading(false);
          getComments();
        } catch (error) {
          setIsLoading(false);
          util.showAlertWithDelay('Error', error.message, 1000);
        }
      } else {
        setIsLoading(false);
        util.showAlertWithDelay(
          'No internet connection',
          'Please check your internet connection and try again.',
          1000,
        );
      }
    } else {
      Toast.showWithGravity(
        'Please, Type a message to continue.',
        Toast.LONG,
        Toast.CENTER,
      );
    }
  };

  const cancelComment = () => setCommentMsg('');

  const renderMenuItem = ({image, text, onPress}) => {
    return (
      <MenuItem onPress={onPress}>
        <View style={styles.menuItemContainer}>
          <Image
            source={image}
            resizeMode="contain"
            style={styles.menuItemImage}
          />
          <Text style={styles.menuItemText}>{text}</Text>
        </View>
      </MenuItem>
    );
  };

  const renderCommentMsg = ({item}) => {
    const {firstName, lastName, profileImage, msg} = item._data;
    return (
      <CommentMsg
        image={{uri: profileImage}}
        name={`${firstName} ${lastName}`}
        message={msg}
      />
    );
  };

  const renderCommentBox = () => {
    return (
      <CommentBox
        value={commentMsg}
        placeholder={'Type your comment here...'}
        onChangeText={handleCommentMsg}
        onSubmitEditing={sendCommentMsg}
        cancelBtnPress={cancelComment}
      />
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle="light-content"
      />

      <OverlayLoader isLoading={isLoading} />

      <Animated.View
        style={{
          transform: [
            {
              translateY: slideUpValue.interpolate({
                inputRange: [0, 1],
                outputRange: [-Metrics.screenHeight * 0.25, 0],
              }),
            },
          ],
          ...styles.headerContainer,
        }}>
        <View style={styles.topHeaderContainer}>
          <TouchableOpacity
            style={styles.topLeftIcon}
            onPress={() => props.navigation.goBack()}>
            <MaterialIcons
              name={'chevron-left'}
              size={Metrics.ratio(25)}
              color={'#8F93A2'}
            />
          </TouchableOpacity>

          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText} numberOfLines={1}>
              {categoryName}
            </Text>
          </View>

          {images.length > 0 && (
            <TouchableOpacity onPress={showMenu}>
              <MaterialIcons
                name={'more-vert'}
                size={Metrics.ratio(27)}
                color={'#ffffff'}
              />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.secHeaderContainer}>
          {images.length > 0 && (
            <TouchableOpacity
              style={styles.secLeftIconContainer}
              onPress={!isLike ? addToLike : addToDisLike}>
              {!isLike ? (
                <Image
                  source={Images.UnFavorite}
                  resizeMode="contain"
                  style={styles.secLeftIconImg}
                />
              ) : (
                <Image
                  source={Images.Favorite}
                  resizeMode="contain"
                  style={styles.secLeftIconImg}
                />
              )}
            </TouchableOpacity>
          )}

          <View style={styles.menuContainer}>
            <Menu ref={menuRef} style={styles.menu}>
              {renderMenuItem({
                image: Images.SaveGray,
                text: 'Save',
                onPress: handleDownloadImage,
              })}
              {renderMenuItem({
                image: Images.ShareGray,
                text: 'Share',
                onPress: shareImage,
              })}
              {renderMenuItem({
                image: Images.CommentGray,
                text: 'Comment',
                onPress: modalizeOpen,
              })}
            </Menu>
          </View>
        </View>

        {images.length > 0 && (
          <TouchableOpacity
            onPress={() => setImageRotate(!imageRotate)}
            style={{...styles.rotateBtn}}>
            <MaterialCommunityIcons
              name={'rotate-3d-variant'}
              size={Metrics.ratio(26)}
              color={'#FFFFFF'}
            />
          </TouchableOpacity>
        )}
      </Animated.View>

      {images.length > 0 ? (
        <ImageCarousel
          images={images}
          imageRotate={imageRotate}
          onChangeImage={(index) => onChangeImage(index)}
          handleHeader={handleHeader}
        />
      ) : (
        <View style={styles.noRecordView}>
          <Text style={styles.noRecordText}>No record found.</Text>
        </View>
      )}

      <CustomModalize
        data={comments}
        modalizeRef={modalizeRef}
        isLoading={isCommentLoading}
        renderItem={renderCommentMsg}
        footerComponent={renderCommentBox}
        modalTopOffset={Metrics.ratio(50)}
        onClosed={handleOnClosedModalize}
        onOpened={getComments}
      />
    </View>
  );
};

export default ImageScreen;
