import React, {Component} from 'react';
import {Schedule} from 'primereact/components/schedule/Schedule';
import {connect} from 'react-redux';
import agent from "../../agent";
import uuid from 'uuid';
import EventModal from './EventModal';
import {
  ADD_EVENT, REMOVE_EVENT, EVENT_PAGE_LOADED, EVENT_PAGE_UNLOADED
} from "../../constants/actionTypes";

const mapStateToProps = state => ({
  events: state.event.events,
  currentUser: state.common.currentUser,
  selectedDate: ''
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

  state = {
    selectedDate: '',
    selectedOption: false,
    selectedEvent: null
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

  onAddEvent = ({date}) => {
    this.props.onAddEvent(agent.Events.create({"id": uuid(), "title": "EVENT", "start": date}));
    this.onCloseModal();
  };

  onCloseModal = () => {
    this.setState(()=>({selectedOption: false}))
  };

  onDayClick = ({date}) => {
    this.setState(()=>({
      selectedDate: date,
      selectedOption: true
    }));
  };

  onEventClick = (event) => {
    console.log(event);
    this.setState(()=>({
      selectedDate: event.startDate,
      selectedEvent: event,
      selectedOption: true
    }))
  };

  render() {

    return (
      <div>
        <div>
          <Schedule header={this.header}
                    events={this.props.events}
                    onDayClick={this.onDayClick}
                    onEventClick={this.onEventClick}
                    eventLimit={4}/>
        <EventModal
          onSubmit={this.onAddEvent}
          selectedOption={this.state.selectedOption}
          onCloseModal={this.onCloseModal}
          selectedDate={this.state.selectedDate}
          onRemoveEvent={this.onRemoveEvent}
        />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Timetable);
