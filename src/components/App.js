import agent from '../agent';
import Header from './Header';
import React from 'react';
import {connect} from 'react-redux';
import {APP_LOAD, REDIRECT} from '../constants/actionTypes';
import {Route, Switch} from 'react-router-dom';
import Article from '../components/Article';
import Editor from '../components/Editor';
import Home from '../components/Home';
import Login from '../components/Login';
import Profile from '../components/Profile';
import ProfileFavorites from '../components/ProfileFavorites';
import Register from '../components/Register';
import Settings from '../components/Settings';
import {store} from '../store';
import {push} from 'react-router-redux';
import Groups from '../components/groups/Groups'
import PersonalCabinet from '../components/personal/PersonalCabinet'
import NotFoundPage from '../components/NotFoundPage';
import PrivateRoute from '../components/routers/PrivateRoute';
import PublicRoute from '../components/routers/PublicRoute';
import {NonAuthPage} from "./NonAuthPage";

const mapStateToProps = state => {
  return {
    appLoaded: state.common.appLoaded,
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    redirectTo: state.common.redirectTo
  }
};

const mapDispatchToProps = dispatch => ({
  onLoad: (payload, token) =>
    dispatch({type: APP_LOAD, payload, token, skipTracking: true}),
  onRedirect: () =>
    dispatch({type: REDIRECT})
});

class App extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      // this.context.router.replace(nextProps.redirectTo);
      store.dispatch(push(nextProps.redirectTo));
      this.props.onRedirect();
    }
  }

  componentWillMount() {
    const token = window.localStorage.getItem('jwt');
    if (token) {
      agent.setToken(token);
    }

    this.props.onLoad(token ? agent.Auth.current() : null, token);
  }

  render() {
    if (this.props.appLoaded) {
      return (
        <div>
          <Switch>
            <PublicRoute exact path="/auth" component={NonAuthPage}/>
            <PublicRoute path="/login" component={Login}/>
            <PublicRoute path="/register" component={Register}/>
            <PrivateRoute exact path="/" component={Home}/>
            <PrivateRoute path="/editor/:slug" component={Editor}/>
            <PrivateRoute path="/editor" component={Editor}/>
            <PrivateRoute path="/article/:id" component={Article}/>
            <PrivateRoute path="/settings" component={Settings}/>
            <PrivateRoute path="/@:username/favorites" component={ProfileFavorites}/>
            <PrivateRoute path="/@:username" component={Profile}/>
            <PrivateRoute path="/groups" component={Groups}/>
            <PrivateRoute path="/personal" component={PersonalCabinet}/>
            <PublicRoute component={NotFoundPage}/>
          </Switch>
        </div>
      );
    }
    return null;
    // return (
    //   <div>
    //     <Header
    //       appName={this.props.appName}
    //       currentUser={this.props.currentUser}/>
    //   </div>
    // );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
