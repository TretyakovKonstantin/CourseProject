import React from 'react';
import uuid from "uuid";

class NoteInputTemplate extends React.Component {
  state = {
    header: '',
    info: ''
  };

  onAddNote = () => {
    this.props.onAddNote({id: uuid(), header: this.state.header, info: this.state.info});
  };

  onHeaderChange = e => {
    let header = e.target.value;
    this.setState({header})
  };

  onInfoChange = e => {
    let info = e.target.value;
    this.setState({info})
  };

  render() {
    return (
      <div className="news">
        <form>
          <fieldset className="input-group__item">
            <input type="text"
                   value={this.state.header}
                   onChange={this.onHeaderChange}
                   className="note-text-input"
                   placeholder="Заголовок"/>
          </fieldset>
          <fieldset className="input-group__item">
            <textarea className="note-textarea"
                      placeholder="Добавьте здесь свою заметку"
                      value={this.state.info}
                      onChange={this.onInfoChange}/>
          </fieldset>
        </form>
        <button className="button button-link"
                onClick={this.onAddNote}
        >Добавить заметку
        </button>
      </div>
    );
  }
}

export default NoteInputTemplate;