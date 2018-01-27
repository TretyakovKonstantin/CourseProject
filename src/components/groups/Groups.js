import React from 'react';
import {connect} from 'react-redux';
import CreateGroupModal from './CreateGroupModal';
import GroupPanel from './GroupPanel';
import {
  GROUPS_PAGE_LOADED, GROUPS_PAGE_UNLOADED, ADD_GROUP, REMOVE_GROUP, GROUP_PAGE_UPDATED
} from "../../constants/actionTypes";
import agent from "../../agent";

const mapStateToProps = (state) => ({
  groups: state.group.groups,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({type: GROUPS_PAGE_LOADED, payload}),
  onAddGroup: payload =>
    dispatch({type: ADD_GROUP, payload}),
  onRemoveGroup: payload =>
    dispatch({type: REMOVE_GROUP, payload}),
  onUnload: () => dispatch({type: GROUPS_PAGE_UNLOADED}),
  onGroupUpdate: payload =>
    dispatch({type: GROUP_PAGE_UPDATED, payload}),
});


class Groups extends React.Component {
  state = {
    selectedOption: false
  };


  componentWillMount() {
    let groups = agent.Groups.userGroups(this.props.currentUser);
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
              return (

                <li className="button--link" key={group.id} onClick={() => {
                  this.props.onGroupUpdate([group, agent.News.forGroup(group.id)])
                }}>{group.name}</li>
              )
            })}
          </ul>
        </div>

        <CreateGroupModal
          onSubmit={this.onAddGroup}
          selectedOption={this.state.selectedOption}
          onCloseModal={this.onCloseModal}
          groups={this.props.groups}
        />
        <GroupPanel group={this.state.selectedGroup}/>
      </div>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Groups)