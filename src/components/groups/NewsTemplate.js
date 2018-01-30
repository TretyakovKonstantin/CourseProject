import React from 'react';

const NewsTemplate = ({header, info}) => (
  <div className="news">
    <h3>{header}</h3>
    <p>{info}</p>
  </div>
);

export default NewsTemplate;