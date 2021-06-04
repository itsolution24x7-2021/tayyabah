// @flow
import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import {Images, Metrics} from '../../theme';
import Menu, {MenuItem} from 'react-native-material-menu';
import {getResourceByIdFromSubCollection} from '../../config/firebaseMethods';
import {Header, OverlayLoader} from '../../components';
import AsyncStorage from '@react-native-community/async-storage';
import {Modalize} from 'react-native-modalize';
import Slider from '@react-native-community/slider';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const PeaceOfHeartListDetail = (props) => {
  const {categoryId, id, title} = props.route.params;
  const [isLoading, setIsLoading] = useState('');
  const [counter, setCounter] = useState(0);
  const [peaceOfHeartDetail, setPeaceOfHeartDetails] = useState(0);
  const [arabicFontSize, setArabicFontSize] = useState(30);
  const [translationFontSize, setTranslationFontSize] = useState(15);

  const menuRef = useRef(null);
  const modalizeRef = useRef(null);

  const hideMenu = () => menuRef?.current?.hide();
  const showMenu = () => menuRef?.current?.show();

  useEffect(() => {
    const fetchPeaceOfCategoryListDetail = async () => {
      setIsLoading(true);
      try {
        const peaceOfHeartDetail = await getResourceByIdFromSubCollection({
          collectionName: 'peaceOfHeartCategory',
          collectionDocId: categoryId,
          subCollectionName: 'peaceOfHeart',
          subCollectionDocId: id,
        });
        setPeaceOfHeartDetails(peaceOfHeartDetail._data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    getItemFromStorage();
    fetchPeaceOfCategoryListDetail();
  }, []);

  const getItemFromStorage = async () => {
    try {
      let item = await AsyncStorage.getItem(`${id}`);
      const itemParsed = JSON.parse(item);

      if (itemParsed?.subCollectionDocId == id) {
        setCounter(itemParsed?.counter);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveCounter = async () => {
    if (counter) {
      let item = {collectionDocId: categoryId, subCollectionDocId: id, counter};
      try {
        setIsLoading(true);
        await AsyncStorage.setItem(`${id}`, JSON.stringify(item));
        hideMenu();
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const resetCounter = async () => {
    try {
      setIsLoading(true);
      await AsyncStorage.removeItem(`${id}`);
      hideMenu();
      setCounter(0);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const modalizeOpen = () => {
    modalizeRef.current.open();
    hideMenu();
  };

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

  const renderSlider = ({label, icon, value, onValueChange}) => {
    return (
      <View style={{marginBottom: Metrics.ratio(16)}}>
        <Text style={{...styles.sliderLabel}}>{label}</Text>
        <View style={{...styles.sliderContainer}}>
          {icon}
          <Slider
            style={{
              width: Metrics.screenWidth * 0.843,
              height: Metrics.ratio(40),
            }}
            step={5}
            thumbTintColor={'#4de528'}
            minimumValue={10}
            maximumValue={50}
            value={value}
            onValueChange={(value) => onValueChange(value)}
            minimumTrackTintColor="#30a414"
            maximumTrackTintColor="#808080"
          />
        </View>
      </View>
    );
  };

  return (
    <ImageBackground style={styles.backgroundImg} source={Images.PohBackground}>
      <OverlayLoader isLoading={isLoading} />
      <Header
        leftIcon={Images.BackArrow}
        isLeftIconImg={true}
        leftBtnPress={() => props.navigation.goBack()}
        headerText={title}
        rightIcon={'more-vert'}
        rightIconColor={'#8F93A2'}
        rightBtnPress={showMenu}
        headerTextStyle={styles.headerTextStyle}
      />
      <ScrollView>
        <View style={styles.cardMainView}>
          <View style={styles.mainCard}>
            <Text
              style={{
                ...styles.mainText,
                fontSize: Metrics.ratio(arabicFontSize),
              }}>
              {peaceOfHeartDetail.arabic}
            </Text>
          </View>
        </View>
        <View style={styles.cardMainView}>
          <View style={styles.cardTranslation}>
            <View>
              <Text style={styles.innerText}>Transliteration</Text>
              <Text
                style={{
                  ...styles.mainTranslation,
                  fontSize: Metrics.ratio(translationFontSize),
                }}>
                {peaceOfHeartDetail.translitteration}
              </Text>
            </View>
            <View>
              <Text style={styles.innerText}>Translation</Text>
              <Text
                style={{
                  ...styles.mainTranslation,
                  fontSize: Metrics.ratio(translationFontSize),
                }}>
                {peaceOfHeartDetail.translation}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.menuContainer}>
          <Menu ref={menuRef} style={styles.menu}>
            {renderMenuItem({
              image: Images.SaveGray,
              text: 'Save Counter',
              onPress: saveCounter,
            })}
            {renderMenuItem({
              image: Images.reset,
              text: 'Reset Counter',
              onPress: resetCounter,
            })}
            {renderMenuItem({
              image: Images.FontSize,
              text: 'Font Size',
              onPress: modalizeOpen,
            })}
          </Menu>
        </View>
      </ScrollView>
      <View style={styles.tapMain}>
        <View style={styles.toolTipContainer}>
          <Text style={styles.toolTipText}>{counter}</Text>
          <Image
            source={Images.triangleGreen}
            resizeMode={'contain'}
            style={styles.toolTipImage}
          />
        </View>
        <TouchableOpacity
          style={styles.tap}
          onPress={() => setCounter(counter + 1)}>
          <Image
            style={styles.tapImage}
            resizeMode="contain"
            source={Images.tap}
          />
        </TouchableOpacity>
      </View>

      <Modalize
        ref={modalizeRef}
        modalStyle={{...styles.modalStyle}}
        handleStyle={{...styles.handleStyle}}
        overlayStyle={{...styles.overlayStyle}}
        handlePosition={'inside'}
        adjustToContentHeight={false}
        modalTopOffset={Metrics.screenHeight * 0.6}>
        <View style={{...styles.modalizeContentView}}>
          {renderSlider({
            label: 'Arabic',
            icon: (
              <MaterialCommunityIcons
                name={'abjad-arabic'}
                size={Metrics.ratio(25)}
                color={'#444E62'}
              />
            ),
            value: arabicFontSize,
            onValueChange: setArabicFontSize,
          })}
          {renderSlider({
            label: 'Transliteration & Translation',
            icon: (
              <FontAwesome
                name={'font'}
                size={Metrics.ratio(25)}
                color={'#444E62'}
              />
            ),
            value: translationFontSize,
            onValueChange: setTranslationFontSize,
          })}
        </View>
      </Modalize>
    </ImageBackground>
  );
};

export default PeaceOfHeartListDetail;
