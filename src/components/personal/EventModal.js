import React from 'react';
import Modal from 'react-modal';
import uuid from 'uuid';
import {Calendar} from 'primereact/components/calendar/Calendar.js';

export default class EventModal extends React.Component {
  state = {
    startDate: this.props.selectedDate,
    endDate: this.props.selectedDate,
    dates: this.props.selectedDate,
    eventName: '',
    error: '',
    foundGroups: []
  };

  onTitleInputChanged = (e) => {
    let eventName = e.target.value;
    this.setState(() => ({eventName}))
  };

  onDateInputChanged = (e) => {
    let dates = e.value;
    let [startDate, endDate] = dates.split(" - ");
    this.setState({dates, startDate, endDate})
  };


  render() {
    return (
      <Modal
        isOpen={this.props.selectedOption}
        contentLabel="Create event"
        onRequestClose={this.props.onCloseModal}
        ariaHideApp={false}
      >
        <div>
          <form className="input-group"
                onSubmit={() => {
                  console.log(this.state.eventName, this.state.startDate, this.state.endDate);
                  this.props.onSubmit({
                    id: uuid(),
                    eventName: this.state.eventName,
                    startDate: this.state.startDate,
                    endDate: this.state.endDate
                  })
                }}
          >
            <fieldset>

              <p>Название события</p>
              <fieldset className="input-group__item">
                <input
                  className="text-input"
                  type="text"
                  placeholder="Событие"
                  value={this.props.eventName}
                  onChange={this.onTitleInputChanged}
                />
              </fieldset>

              <fieldset>
                <Calendar className="input-group__item"
                          selectionMode="range"
                          value={this.state.dates}
                          onChange={this.onDateInputChanged}
                />
              </fieldset>

              <button className="button" type="submit"><i className="ion-plus-round"/> Create
              </button>
              <button className="button" onClick={this.props.onRemoveEvent}><i className="ion-trash-a"/> Delete</button>
            </fieldset>
          </form>
        </div>
        {this.state.error && <p className="form_error">{this.state.error}</p>}
      </Modal>
    )
  }
}
