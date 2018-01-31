import React from 'react';


const PersonalNotes = props => {
  let p = [];
  for (let i = 0; i < 100; i++) {
    p.push(i);
  }
  return (
    <div>
      Мои Заметки
      {
        p.map((i) => <p>{i}</p>)
      }
    </div>
  );
};

export default PersonalNotes;
