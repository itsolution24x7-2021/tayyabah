import moment from 'moment';

const initialMoment = () => {
  return moment();
};

const oneYearAhead = d => {
  return moment(d).add(1, 'year');
};

const oneYearBack = d => {
  return moment(d).subtract(1, 'year');
};

const tenYearsAhead = d => {
  return moment(d).add(10, 'year');
};

const tenYearsBack = d => {
  return moment(d).subtract(10, 'year');
};

const oneMonthAhead = d => {
  return moment(d).add(1, 'month');
};

const oneMonthBack = d => {
  return moment(d).subtract(1, 'month');
};

const exactMonth = (d, _month) => {
  if (_month > moment(d).format('M')) {
    return moment(d).add(_month - moment(d).format('M'), 'month');
  } else if (_month < moment(d).format('M')) {
    return moment(d).subtract(moment(d).format('M') - _month, 'month');
  } else {
    return moment(d);
  }
};

const monthHeader = d => {
  return moment(d).format('MMMM');
};

const yearHeader = d => {
  return moment(d).format('YYYY');
};

const inputDate = d => {
  return moment(d).format('YYYY-MM-DD');
};

const dateSelected = (d, date) => {
  return moment().year(d.year()).month(d.month()).date(date);
};

const startingDate = d => {
  return moment().year(d.year()).month(d.month()).date('01');
};

const diffDate = d => {
  const start = moment().year(d.year()).month(d.month()).date('01');
  const end = moment(start).endOf('month');
  return end.diff(start, 'days') + 1;
};

const isSelectedDate = (d, s, date) => {
  if (moment(d).year() === moment(s).year() &&
    moment(d).month() === moment(s).month() &&
    date === moment(s).date()) {
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
