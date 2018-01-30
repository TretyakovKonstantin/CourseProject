import React, {Component} from 'react';
import {Schedule} from 'primereact/components/schedule/Schedule';

const mapStateToProps = () => {

};

export default class Timetable extends Component {
  onDayClick = (date) => {

  };

  render() {
    this.header = {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay'
    };

    return (
      <div>
        <div className="content-section">
          <div className="feature-intro">
            <h1>Schedule</h1>
            <p>Schedule is an event calendar based on FullCalendar.</p>
          </div>
        </div>

        <div className="content-section implementation">
          <Schedule header={this.header} eventLimit={4}/>
        </div>
      </div>
    );
  }
}

