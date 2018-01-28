import React from 'react';
import {Link} from 'react-router-dom';

export const NonAuthPage = () => (
  <div className="auth-layout">
    <div className="auth-layout__box">
      <h1 className="auth-layout__title">Welcome to Hogwarts Express</h1>
      <p>Please, log in or sign in</p>
      <Link to="/login">
        <button className="button">Авторизоваться</button>
      </Link>
      <Link to="/register">
        <button className="button">Зарегистрироваться</button>
      </Link>
    </div>
  </div>
);