import React from 'react';
import {Link} from 'react-router-dom';

const NotFoundPage = () => (
  <div className="not-found">
    <div className="auth-layout__box">
      <h1>404</h1>
      Страница не найдена <Link to="/">Вернуться</Link>
    </div>
  </div>
);

export default NotFoundPage;
