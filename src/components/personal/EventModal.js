import React from 'react';
import Modal from 'react-modal';
import uuid from 'uuid';
import {Calendar} from 'primereact/components/calendar/Calendar.js';

export default class EventModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: props.event ? props.event.startDate : props.selectedDate,
      endDate: props.event ? props.event.endDate : props.selectedDate,
      dates: props.event ? props.event.startDate + "," + props.event.endDate : props.selectedDate,
      title: props.event ? props.event.title : '',
      error: '',
      foundGroups: []
    };
  }

  onTitleInputChanged = (e) => {
    let title = e.target.value;
    this.setState(() => ({title}))
  };

  onDateInputChanged = (e) => {
    let dates = e.value;
    let [startDate, endDate] = dates.toString().split(",");
    this.setState({dates, startDate, endDate})
  };

  onSaveButtonClick = () => {
    let title = this.state.title;
    let startDate = this.state.startDate;
    let endDate = this.state.endDate;
    let id = uuid();
    if (!title) {
      this.setState({error: 'Укажите, пожайлуста, название события'});
      return;
    }
    console.log(this.state.title, this.state.startDate, this.state.endDate);
    this.props.event ?
      this.props.onSubmit({
        id,
        title,
        startDate,
        endDate
      }) : this.props.onEditEvent({
        id,
        title,
        startDate,
        endDate
      })
  };

  onRemoveEvent = () => {
    this.props.onRemoveEvent(this.state.event);
  };

  render() {
    return (
      <Modal
        isOpen={this.props.selectedOption}
        contentLabel="Create event"
        onRequestClose={this.props.onCloseModal}
        ariaHideApp={false}
        closeTimeoutMS={200}
        className="modal"
      >
        <div>
          <form>
            <fieldset>

              <p>Название события</p>
              <fieldset className="input-group__item">
                <input
                  className="text-input"
                  type="text"
                  placeholder="Событие"
                  value={this.props.title}
                  onChange={this.onTitleInputChanged}
                />
              </fieldset>

              <fieldset className="input-group__item">
                <Calendar
                  placeholder="Введите временной промежуток"
                          selectionMode="range"
                          value={this.state.dates}
                          onChange={this.onDateInputChanged}
                />
              </fieldset>

            </fieldset>
          </form>
          <button className="button" onClick={this.onSaveButtonClick}>
            <i className="ion-plus-round"/> Сохранить
          </button>
          {this.props.event ?
            <button className="button" onClick={this.onRemoveEvent}>
              <i className="ion-trash-a"/> Удалить
            </button> :
            <button className="button" onClick={this.props.onCloseModal}>Отмена</button>
          }

        </div>
        {this.state.error && <p className="form_error">{this.state.error}</p>}
      </Modal>
    )
  }
}
