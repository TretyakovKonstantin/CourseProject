import React from 'react';
import {connect} from 'react-redux';
import CreateGroupModal from './CreateGroupModal';
import GroupPanel from './GroupPanel';
import {
  GROUP_PAGE_LOADED, GROUP_PAGE_UNLOADED, ADD_GROUP, REMOVE_GROUP
} from "../../constants/actionTypes";
import agent from "../../agent";

const mapStateToProps = (state) => ({
  groups: state.group.groups,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({type: GROUP_PAGE_LOADED, payload}),
  onAddGroup: payload =>
    dispatch({type: ADD_GROUP, payload}),
  onRemoveGroup: payload =>
    dispatch({type: REMOVE_GROUP, payload}),
  onUnload: () => dispatch({type: GROUP_PAGE_UNLOADED})
});


class Groups extends React.Component {
  state = {
    selectedOption: false
  };


  componentWillMount() {
    let groups = agent.Groups.getUserGroups(this.props.currentUser);
    this.setState({selectedGroup: groups[0]});
    this.props.onLoad([
      groups
    ]);
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  onOpenModal = () => {
    this.setState(() => ({
      selectedOption: true
    }))
  };

  onAddGroup = (group) => {
    const payload = agent.Groups.create(group);
    this.props.onAddGroup(payload);
  };

  onCloseModal = () => {
    this.setState(() => ({
      selectedOption: false
    }))
  };

  render() {
    if (!this.props.groups) {
      return null
    }

    return (
      <div className="usual-page">
        <div className="tabs-left">
          My groups
          <ul>
            <li className="button--link" onClick={this.onOpenModal}>+</li>
            {this.props.groups.map((group) => {
              return <li className="button--link" key={group.id} onClick={() => {
                this.setState({selectedGroup: group});
              }}>{group.name}</li>
            })}
          </ul>
        </div>

        <CreateGroupModal
          onSubmit={this.onAddGroup}
          selectedOption={this.state.selectedOption}
          onCloseModal={this.onCloseModal}
          groups={this.props.groups}
        />
        {this.state.selectedGroup ? <GroupPanel group={this.state.selectedGroup}/> : <h2>У вас нет групп</h2>}
      </div>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Groups)