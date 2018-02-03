import auth from './reducers/auth';
import {combineReducers} from 'redux';
import common from './reducers/common';
import profile from './reducers/profile';
import settings from './reducers/settings';
import group from './reducers/group';
import event from './reducers/event';
import {routerReducer} from 'react-router-redux';

export default combineReducers({
  auth,
  common,
  profile,
  settings,
  group,
  event,
  router: routerReducer
});
