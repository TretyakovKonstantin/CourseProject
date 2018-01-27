import React from 'react';
import {connect} from 'react-redux'
import {DataScroller} from 'primereact/components/datascroller/DataScroller'

class GroupPanel extends React.Component {
  render() {
    return (
      <div >
        <h2>{this.props.group.name}</h2>
      </div>
    )
  }
}

export default connect()(GroupPanel);