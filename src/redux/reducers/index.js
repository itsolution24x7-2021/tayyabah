import { combineReducers } from 'redux';

import login from './Login';
import register from './Register';
import networkInfo from './NetworkInfo';

export default combineReducers({
  login,
  register,
  networkInfo,
});
