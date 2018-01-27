import React from 'react';
import { Link } from 'react-router-dom';

const LoggedOutView = props => {
  if (!props.currentUser) {
    return (
      <ul className="header__content">

        <li className="header__title">
          <Link to="/login">
            Sign in
          </Link>
        </li>

        <li className="header__title">
          <Link to="/register">
            Sign up
          </Link>
        </li>

      </ul>
    );
  }
  return null;
};

const LoggedInView = props => {
  if (props.currentUser) {
    return (
      <ul className="header__content">

        <li className="header__title">
          <Link to="/">
            Home
          </Link>
        </li>

        <li className="header__title">
          <Link to="/groups">
            Groups
          </Link>
        </li>

        <li className="header__title">
          <Link to="/editor" >
            <i className="ion-compose"/>&nbsp;New Post
          </Link>
        </li>

        <li className="header__title">
          <Link to="/settings">
            <i className="ion-gear-a"/>&nbsp;Settings
          </Link>
        </li>

        <li className="header__title">
          <Link
            to={`/@${props.currentUser.username}`}
            className="header__title">
            <img src={props.currentUser.image} className="user-pic" alt={props.currentUser.username} />
            {props.currentUser.username}
          </Link>
        </li>

      </ul>
    );
  }

  return null;
};

class Header extends React.Component {
  render() {
    return (
      <nav className="header">
        <div className="container">
          <LoggedOutView currentUser={this.props.currentUser} />

          <LoggedInView currentUser={this.props.currentUser} />
        </div>
      </nav>
    );
  }
}

export default Header;
