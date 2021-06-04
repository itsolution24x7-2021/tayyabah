import { Platform, Alert, ToastAndroid } from 'react-native';
import moment from 'moment';
// import NetInfo from '@react-native-community/netinfo';

class Util {
  isPlatformAndroid = () => Platform.OS === 'android';

  showToast(message: String) {
    if (this.isPlatformAndroid()) {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    }
  }

  showYesNoMessage(title, message, onYes, onNo) {
    setTimeout(() => {
      Alert.alert(
        title,
        message,
        [
          {
            text: 'Yes',
            onPress: onYes,
          },
          {
            text: 'No',
            onPress: onNo,
            style: 'cancel',
          },
        ],
        { cancelable: false },
      );
    }, 150);
  }

  showCommonMessage(title, message, onOkPressed) {
    Alert.alert(
      title,
      message,
      [
        {
          text: 'ok',
          onPress: onOkPressed,
        },
      ],
      { cancelable: false },
    );
  }

  showAlertWithDelay(title, message, delay = 150) {
    setTimeout(() => {
      this.showCommonMessage(title, message);
    }, delay);
  }

  // isConnected() {
  //   let isConnected;
  //   NetInfo.addEventListener((state) => {
  //     isConnected = state.isConnected;
  //   });
  //   return isConnected;
  // }

  expiryCountdownFormatter(expiryDate) {
    let countDownDate = new Date(expiryDate).getTime();
    let now = new Date().getTime();
    let distance = countDownDate - now;
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    // let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (!countDownDate || distance < 0) {
      return 'Expired';
    }

    if (hours > 0) {
      return `${days} days ${hours} hr`;
    } else {
      return `${days} days ${minutes} min`;
    }
  }

  nFormatter(num) {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return num;
  }

  notificationDataFormatter(data) {
    let filteredData = [];
    const currentDate = moment(Date.now()).format('YYYY-MM-DD');
    const previousDate = moment(Date.now()).subtract(1, 'days').format('YYYY-MM-DD');
    const findAndReturnData = (updated_array, item, conditionText, title) => {
      let _index = updated_array.findIndex(y => y.title.toLowerCase() === conditionText);
      if (_index != -1) {
        return updated_array[_index].data.push(item);
      } else {
        let obj = { title, data: [item] }
        return updated_array.push(obj);
      }
    }
    data.forEach(x => {
      const receiveDate = moment(x._data.timeStamp).format('YYYY-MM-DD');
      const today = moment(receiveDate).isSame(currentDate);
      const yesterday = moment(receiveDate).isSame(previousDate);
      const thisWeek = moment(receiveDate).isSame(currentDate, 'week');
      const lastWeek = moment(currentDate).isAfter(receiveDate, 'week');
      const thisMonth = moment(receiveDate).isSame(currentDate, 'month');
      const lastMonth = moment(currentDate).isAfter(receiveDate, 'month');
      const thisYear = moment(receiveDate).isSame(currentDate, 'year');
      if (today) {
        findAndReturnData(filteredData, x, 'today', 'Today');
      } else if (yesterday) {
        findAndReturnData(filteredData, x, 'yesterday', 'Yesterday');
      } else if (thisWeek) {
        findAndReturnData(filteredData, x, 'this week', 'This Week');
      } else if (lastWeek) {
        findAndReturnData(filteredData, x, 'last week', 'Last Week');
      } else if (thisMonth) {
        findAndReturnData(filteredData, x, 'this month', 'This Month');
      } else if (lastMonth) {
        findAndReturnData(filteredData, x, 'last month', 'Last Month');
      } else if (thisYear) {
        findAndReturnData(filteredData, x, 'this year', 'This Year');
      } else {
        findAndReturnData(filteredData, x, 'last year', 'Last Year');
      }
    })
    return filteredData;
  }
}
export default new Util();
