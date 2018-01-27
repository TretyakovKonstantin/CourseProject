import {
  ADD_GROUP, GROUP_PAGE_LOADED, GROUP_PAGE_UNLOADED, REMOVE_GROUP
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case GROUP_PAGE_LOADED:
      console.log('>>>>>>>>>>>>>>>>>>>>>>>>', action.payload[0]);
      return {
        groups: action.payload[0]
      };
    case GROUP_PAGE_UNLOADED:
      return {};
    case ADD_GROUP:
      return {
        ...state,
        groups: action.error ?
          null :
          (state.groups || []).concat([action.payload.group])
      };
    case REMOVE_GROUP:
      const groupId = action.groupId;
      return {
        ...state,
        groups: state.filter(({id}) => id !== groupId)
      };
    default:
      return state;
  }
};
