import React from 'react';
import {Link} from 'react-router-dom';


const LoggedInView = props => {
  if (props.currentUser) {
    return (
      <ul className="header__content">

        <li className="header__title">
          <Link to="/">
            <i className="ion-ios-home"/>&nbsp;Home
          </Link>
        </li>

        <li className="header__title">
          <Link to="/groups">
            <i className="ion-person-stalker"/>&nbsp;Группы
          </Link>
        </li>

        <li className="header__title">
          <Link to={`/personal/@${props.currentUser.username}`}>
            <i className="ion-person"/>&nbsp;Личный кабинет
          </Link>
        </li>

        <li className="header__title">
          <Link to="/editor">
            <i className="ion-compose"/>&nbsp;New Post
          </Link>
        </li>

        <li className="header__title">
          <Link to="/settings">
            <i className="ion-gear-a"/>&nbsp;Настройки
          </Link>
        </li>

        <li className="header__title">
          <Link
            to={`/@${props.currentUser.username}`}
            className="header__title">
            <img src={props.currentUser.image} className="user-pic"/>
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
    if (!this.props.currentUser) {
      return null
    }
    return (
    <nav className="header">
      <LoggedInView currentUser={this.props.currentUser}/>
    </nav>
    );
  }
}

export default Header;