import ListErrors from './ListErrors';
import React from 'react';
import agent from '../agent';
import {connect} from 'react-redux';
import {Button} from 'primereact/components/button/Button';
import {
  SETTINGS_SAVED,
  SETTINGS_PAGE_UNLOADED,
  LOGOUT
} from '../constants/actionTypes';

class SettingsForm extends React.Component {
  constructor() {
    super();

    this.state = {
      image: '',
      username: '',
      bio: '',
      email: '',
      password: ''
    };

    this.updateState = field => ev => {
      const state = this.state;
      const newState = Object.assign({}, state, {[field]: ev.target.value});
      this.setState(newState);
    };

    this.submitForm = ev => {
      ev.preventDefault();

      const user = Object.assign({}, this.state);
      if (!user.password) {
        delete user.password;
      }

      this.props.onSubmitForm(user);
    };
  }

  componentWillMount() {
    if (this.props.currentUser) {
      Object.assign(this.state, {
        image: this.props.currentUser.image || '',
        username: this.props.currentUser.username,
        bio: this.props.currentUser.bio,
        email: this.props.currentUser.email
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser) {
      this.setState(Object.assign({}, this.state, {
        image: nextProps.currentUser.image || '',
        username: nextProps.currentUser.username,
        bio: nextProps.currentUser.bio,
        email: nextProps.currentUser.email
      }));
    }
  }

  render() {
    return (
      <div className="settings-layout">
        {/*<div className="box-layout__box">*/}
        <form onSubmit={this.submitForm} className="input-group">
          <fieldset>

            <fieldset className="input-group__item">
              <input
                className="text-input"
                type="text"
                placeholder="URL of profile picture"
                value={this.state.image}
                onChange={this.updateState('image')}/>
            </fieldset>

            <fieldset className="input-group__item">
              <input
                className="text-input"
                type="text"
                placeholder="Username"
                value={this.state.username}
                onChange={this.updateState('username')}/>
            </fieldset>

            <fieldset className="input-group__item">
            <textarea
              className="text-input"
              rows="8"
              placeholder="Short bio about you"
              value={this.state.bio}
              onChange={this.updateState('bio')}>
            </textarea>
            </fieldset>

            <fieldset className="input-group__item">
              <input
                className="text-input"
                type="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.updateState('email')}/>
            </fieldset>

            <fieldset className="input-group__item">
              <input
                className="text-input"
                type="password"
                placeholder="New Password"
                value={this.state.password}
                onChange={this.updateState('password')}/>
            </fieldset>

            <Button
              type="submit"
              disabled={this.state.inProgress}>
              Update Settings
            </Button>

          </fieldset>
        </form>
       {/*</div>*/}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.settings,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  onClickLogout: () => dispatch({type: LOGOUT}),
  onSubmitForm: user =>
    dispatch({type: SETTINGS_SAVED, payload: agent.Auth.save(user)}),
  onUnload: () => dispatch({type: SETTINGS_PAGE_UNLOADED})
});

class Settings extends React.Component {
  render() {
    return (
      <div className="regular-page">
        <h1>Your Settings</h1>

        <ListErrors errors={this.props.errors}/>

        <SettingsForm
          currentUser={this.props.currentUser}
          onSubmitForm={this.props.onSubmitForm}/>

        <button
          className="button button--link"
          onClick={this.props.onClickLogout}>
          Or click here to logout.
        </button>
      </div>

    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
