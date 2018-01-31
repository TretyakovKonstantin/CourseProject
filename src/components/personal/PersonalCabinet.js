import React from 'react';
import PersonalInformation from './PersonalInformation'
import Timetable from './Timetable'
import PersonalNotes from './PersonalNotes'
import {Switch, Route, Link} from 'react-router-dom'
import 'primereact/components/schedule/Schedule.css'
import Profile from "../Profile";

const PersonalCabinet = () => {
  return (
    <div className="regular-page">
      <div className="items-list">

        <ul>
          <li>
            <Link to={`/personal/info`}>
              <button className="button button--link"><i className="ion-locked"/> Личная Информация</button></Link>
          </li>
          <li>
            <Link to={`/personal/timetable`}><button className="button button--link"><i className="ion-android-time"/> Расписание</button></Link>
          </li>
          <li>
            <Link to={`/personal/notes`}><button className="button button--link"><i className="ion-compose"/> Личные заметки</button></Link>
          </li>
        </ul>
      </div>


      <Switch>
        <Route path="/personal/@:username" component={Profile}/>
        <Route path={`/personal/info`} component={PersonalInformation}/>
        <Route path={`/personal/timetable`} component={Timetable}/>
        <Route path={`/personal/notes`} component={PersonalNotes}/>
      </Switch>
    </div>
  );
};

export default PersonalCabinet;
