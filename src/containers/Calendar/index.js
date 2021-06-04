import React, {Component} from 'react';
import {View, ScrollView, TouchableOpacity, Text, Image} from 'react-native';
import Modal from 'react-native-modal';
import momentHijri from 'moment-hijri';
import momentGregorian from 'moment';

import styles from './styles';

import {CustomCalendar, Header, OverlayLoader} from '../../components';
import {Images} from '../../theme';
import gregorian_utils from '../../util/gregorian_utils';
import {gregorian_months} from '../../util/constats';
import {getResourceWithRefrence} from '../../config/firebaseMethods';

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navigationDate: gregorian_utils.initialMoment(),
      selectedDate: gregorian_utils.initialMoment(),
      _calendar_utils: gregorian_utils,
      _months: gregorian_months,
      isModalVisible: false,
      islamicEvents: [],
      isLoading: false,
      selectedEvent: [],
    };
  }

  async componentDidMount() {
    momentGregorian.locale('en');
    const {navigationDate} = this.state;

    try {
      this.setState({isLoading: true});
      const islamicEvents = await getResourceWithRefrence('islamicEvents', {
        key: 'eventMonth',
        value: momentHijri(navigationDate).format('iM'),
      });

      this.setState({
        isLoading: false,
        islamicEvents,
      });
    } catch (error) {
      this.setState({isLoading: false});
      console.log(error);
    }
  }

  onOneMonthBackClick = async () => {
    const {_calendar_utils, navigationDate} = this.state;
    try {
      this.setState({isLoading: true});

      const islamicEvents = await getResourceWithRefrence('islamicEvents', {
        key: 'eventMonth',
        value: momentHijri(_calendar_utils.oneMonthBack(navigationDate)).format(
          'iM',
        ),
      });

      this.setState({
        ...this.state,
        navigationDate: _calendar_utils.oneMonthBack(navigationDate),
        isLoading: false,
        islamicEvents,
      });
    } catch (error) {
      this.setState({isLoading: false});
      console.log(error);
    }
  };

  onOneMonthAheadClick = async () => {
    const {_calendar_utils, navigationDate} = this.state;
    try {
      this.setState({isLoading: true});

      const islamicEvents = await getResourceWithRefrence('islamicEvents', {
        key: 'eventMonth',
        value: momentHijri(
          _calendar_utils.oneMonthAhead(navigationDate),
        ).format('iM'),
      });

      this.setState({
        ...this.state,
        navigationDate: _calendar_utils.oneMonthAhead(navigationDate),
        isLoading: false,
        islamicEvents,
      });
    } catch (error) {
      this.setState({isLoading: false});
      console.log(error);
    }
  };

  onExactMonthClick = async (_month) => {
    const {_calendar_utils, navigationDate} = this.state;
    try {
      this.setState({isLoading: true});

      const islamicEvents = await getResourceWithRefrence('islamicEvents', {
        key: 'eventMonth',
        value: momentHijri(
          _calendar_utils.exactMonth(navigationDate, _month),
        ).format('iM'),
      });

      this.setState({
        ...this.state,
        navigationDate: _calendar_utils.exactMonth(navigationDate, _month),
        isLoading: false,
        islamicEvents,
      });
    } catch (error) {
      this.setState({isLoading: false});
      console.log(error);
    }
  };

  onOneYearBackClick = () => {
    const {_calendar_utils, navigationDate} = this.state;

    this.setState({
      ...this.state,
      navigationDate: _calendar_utils.oneYearBack(navigationDate),
    });
  };

  onOneYearAheadClick = () => {
    const {_calendar_utils, navigationDate} = this.state;

    this.setState({
      ...this.state,
      navigationDate: _calendar_utils.oneYearAhead(navigationDate),
    });
  };

  onTenYearsBackClick = () => {
    const {_calendar_utils, navigationDate} = this.state;

    this.setState({
      ...this.state,
      navigationDate: _calendar_utils.tenYearsBack(navigationDate),
    });
  };

  onTenYearsAheadClick = () => {
    const {_calendar_utils, navigationDate} = this.state;

    this.setState({
      ...this.state,
      navigationDate: _calendar_utils.tenYearsAhead(navigationDate),
    });
  };

  onDateSelected = (selectedEvent) =>
    this.setState({isModalVisible: true, selectedEvent});

  onClose = () => this.setState({isModalVisible: false, selectedEvent: []});

  render() {
    const {
      _calendar_utils,
      _months,
      isModalVisible,
      selectedEvent,
      isLoading,
    } = this.state;

    let _eventDate = momentHijri(
      selectedEvent[0]?._data?.eventDate,
      'iYYYY/iM/iD',
    ).format('iD');
    let _eventMonth = momentHijri(
      selectedEvent[0]?._data?.eventDate,
      'iYYYY/iM/iD',
    ).format('iMMMM');
    let _eventGeorgianDate = momentHijri(
      selectedEvent[0]?._data?.eventDate,
      'iYYYY/iM/iD',
    ).format('dddd, Do MMMM, YYYY');

    return (
      <View style={styles.container}>
        <OverlayLoader isLoading={isLoading} />

        <Header
          leftIcon={Images.BackArrow}
          isLeftIconImg={true}
          leftBtnPress={() => this.props.navigation.goBack()}
          headerText={'Calendar'}
          headerTextStyle={styles.headerTextStyle}
        />

        <ScrollView>
          {!isLoading && (
            <CustomCalendar
              {...this.state}
              utils={_calendar_utils}
              gregorianUtils={gregorian_utils}
              onOneMonthBackClick={this.onOneMonthBackClick}
              onOneMonthAheadClick={this.onOneMonthAheadClick}
              onOneYearBackClick={this.onOneYearBackClick}
              onOneYearAheadClick={this.onOneYearAheadClick}
              onTenYearsBackClick={this.onTenYearsBackClick}
              onTenYearsAheadClick={this.onTenYearsAheadClick}
              onDateSelected={this.onDateSelected}
            />
          )}

          {!isLoading && (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {_months?.map((name, index) => (
                <TouchableOpacity
                  key={name}
                  onPress={() => this.onExactMonthClick(index + 1)}
                  style={styles.monthBtn}>
                  <Text style={styles.monthBtnText}>{name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </ScrollView>

        {selectedEvent.length > 0 && (
          <Modal
            animationType="fade"
            transparent={true}
            isVisible={isModalVisible}>
            <View style={styles.modalMain}>
              <View style={styles.eventHeaderContainer}>
                <View style={{flex: 1}}>
                  <Text numberOfLines={1} style={styles.heading}>
                    {`${_eventDate}, ${_eventMonth}!`}{' '}
                  </Text>
                  <Text style={styles.secHeading}>{_eventGeorgianDate}</Text>
                </View>
                <TouchableOpacity onPress={this.onClose}>
                  <Image source={Images.close} style={styles.closeImg} />
                </TouchableOpacity>
              </View>
              <ScrollView>
                {selectedEvent.map((val, index) => {
                  return (
                    <View key={`${val}+${index}`}>
                      <Text style={styles.number}>{`${index + 1}`}.</Text>
                      <Text style={styles.name}>
                        {'Passing Away of '}
                        <Text style={styles.nameBold}>{val._data.name}</Text>
                      </Text>
                      <Text style={styles.by}>{`(${val._data.address})`}</Text>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          </Modal>
        )}
      </View>
    );
  }
}

export default Calendar;
