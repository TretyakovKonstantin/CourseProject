import React, {Component} from 'react';
import {Schedule} from 'primereact/components/schedule/Schedule';
import {connect} from 'react-redux';
import agent from "../../agent";
import uuid from 'uuid';
import {
  ADD_EVENT, REMOVE_EVENT, EVENT_PAGE_LOADED, EVENT_PAGE_UNLOADED
} from "../../constants/actionTypes";

const mapStateToProps = state => ({
  events: state.event.events,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({type: EVENT_PAGE_LOADED, payload}),
  onAddEvent: payload =>
    dispatch({type: ADD_EVENT, payload}),
  onRemoveEvent: payload =>
    dispatch({type: REMOVE_EVENT, payload}),
  onUnload: () => dispatch({type: EVENT_PAGE_UNLOADED})
});


class Timetable extends Component {
  header = {
    left: 'prev,next today',
    center: 'title',
    right: 'month,agendaWeek,agendaDay'
  };

  componentWillMount() {
    this.props.onLoad(
      agent.Events.userEvents(this.props.currentUser)
    );
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  onRemoveEvent = id => {
    this.props.onRemoveEvent(agent.Events.del(id));
  };

  onDayClick = ({date}) => {
    this.props.onAddEvent(agent.Events.create({"id": uuid(), "title": "EVENT", "start": date }))
  };

  onEventResize = (event, delta) => {

  };

  render() {

    return (
      <div>
        <div>
          {console.log(">>>>>>>>>", this.props.events)}
          <Schedule header={this.header} events={this.props.events} onDayClick={this.onDayClick} eventLimit={4}/>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Timetable);
