export const CREATE_NOTIFICATION = 'notifications/create'; 

/**
 * Creates a new notification to show the user
 * @param {*} param0 
 * @returns 
 */
export const createNotification = ({ notifType, contents }) => ({
  type: CREATE_NOTIFICATION,
  notifType,
  contents,
});

const INITIAL_STATE = {
  notifications: [/*{
    type: ENUM - represents a type to draw a card differently depending on what type of notification this is
    contents: String - the text to show the user
  }*/],
};

const reducers = {
   [CREATE_NOTIFICATION]: (state, action) => ({
     ...state,
     notifications: [...state.notifications, {
      type: action.notifType,
      contents: action.contents
     }]
   }),
};

// boilerplate
export default function (state = INITIAL_STATE, action) {
  if (reducers[action.type]) {
    return reducers[action.type](state, action)
  }

  return state;
};
