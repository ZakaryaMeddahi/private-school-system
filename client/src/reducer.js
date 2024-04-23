import {
  ADD_USER,
  REMOVE_USER,
  UPDATE_SCREEN,
  UPDATE_SHARING,
} from './actions';

const reducer = (state, action) => {
  if (action.type === ADD_USER) {
    const { user } = action.payload;
    const prevUsers = state.users.filter((u) => u.uid !== user.uid);
    const newUsers = [...prevUsers, user];
    return { ...state, users: newUsers };
  }
  if (action.type === REMOVE_USER) {
    const newUsers = state.users.filter((u) => u.uid !== action.payload.uid);
    return { ...state, users: newUsers };
  }
  if (action.type === UPDATE_SHARING) {
    return { ...state, isScreenSharing: action.payload.isSharing };
  }
  if (action.type === UPDATE_SCREEN) {
    return { ...state, isScreenSharing: action.payload.isFull };
  }

  throw new Error(`No matching ${action.type} action type`);
};

export default reducer;
