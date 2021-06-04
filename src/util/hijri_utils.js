import moment from './moment-hijri';

const initialMoment = () => {
  return moment().format('YYYY-MM-DD');
};

const oneYearAhead = d => {
  return moment(d).add(1, 'iYear');
};

const oneYearBack = d => {
  return moment(d).subtract(1, 'iYear');
};

const tenYearsAhead = d => {
  return moment(d).add(10, 'iYear');
};

const tenYearsBack = d => {
  return moment(d).subtract(10, 'iYear');
};

const oneMonthAhead = d => {
  return moment(d).add(1, 'iMonth');
};

const oneMonthBack = d => {
  return moment(d).subtract(1, 'iMonth');
};

const exactMonth = (d, _month) => {
  if (_month > moment(d).format('iM')) {
    return moment(d).add(_month - moment(d).format('iM'), 'iMonth');
  } else if (_month < moment(d).format('iM')) {
    return moment(d).subtract(moment(d).format('iM') - _month, 'iMonth');
  } else {
    return moment(d);
  }
};

const monthHeader = d => {
  return moment(d).format('iMMMM');
};

const yearHeader = d => {
  return moment(d).format('iYYYY');
};

const inputDate = d => {
  return moment(d).format('iYYYY-iMM-iDD');
};

const dateSelected = (d, date) => {
  const year = moment(d).format('iYYYY');
  const month = moment(d).format('iMM');

  let hijri_date = `${year}/${month}/${date}`
  return hijri_date;
};

const startingDate = d => {
  return moment(d).startOf('iMonth');
};

const diffDate = d => {
  const start = moment(d).startOf('iMonth');
  const end = moment(start).endOf('iMonth');
  return end.diff(start, 'days') + 1;
};

const isSelectedDate = (d, s, date) => {
  if (moment(d).iYear() === moment(s).iYear() &&
    moment(d).iMonth() === moment(s).iMonth() &&
    date === moment(s).iDate()) {
    return true;
  }
  return false;
};

export default {
  initialMoment,
  oneYearAhead,
  oneYearBack,
  tenYearsAhead,
  tenYearsBack,
  oneMonthAhead,
  oneMonthBack,
  exactMonth,
  monthHeader,
  yearHeader,
  inputDate,
  dateSelected,
  startingDate,
  diffDate,
  isSelectedDate,
};
