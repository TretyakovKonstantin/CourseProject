import React from 'react';
import {connect} from 'react-redux'
import {DataScroller} from 'primereact/components/datascroller/DataScroller'
import NewsTemplate from './NewsTemplate'

const mapStateToProps = state => {
  console.log(state.group.news);
  return ({
    news: state.group.news,
    group: state.group.group
  });
};


class GroupPanel extends React.Component {
  render() {
    if (!this.props.news || !this.props.group) {
      return null
    }
    return (
      <div>
        <h1>Hello, Group</h1>
        <h2>{this.props.group.name}</h2>
        {this.props.news ?
          <DataScroller value={this.props.news} itemTemplate={NewsTemplate} lazy={true} rows={10}/> :
          <h3>В этой группе нет новостей</h3>}
      </div>
    )
  }
}

export default connect(mapStateToProps)(GroupPanel);