import article from './reducers/article';
import articleList from './reducers/articleList';
import auth from './reducers/auth';
import {combineReducers} from 'redux';
import common from './reducers/common';
import editor from './reducers/editor';
import home from './reducers/home';
import profile from './reducers/profile';
import settings from './reducers/settings';
import group from './reducers/group';
import event from './reducers/event';
import {routerReducer} from 'react-router-redux';

export default combineReducers({
  article,
  articleList,
  auth,
  common,
  editor,
  home,
  profile,
  settings,
  group,
  event,
  router: routerReducer
});
