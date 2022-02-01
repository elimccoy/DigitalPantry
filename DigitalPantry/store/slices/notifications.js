import { v4 as uuid } from 'uuid';

export const CREATE_NOTIFICATION = 'notifications/create'; 
export const DELETE_NOTIFICATION = 'notifications/delete'; 

/**
 * Creates a new notification to show the user
 * @param {{
    notifType: NotificationType
    contents: string
  }} ActionProps 
 * @returns {{
   type: ActionType
   id: string
   timestamp: number
   notifyType: string
   contents: string
 }}
 */
export const createNotification = ({ notifType, contents }) => ({
  type: CREATE_NOTIFICATION,
  id: uuid(), // generate a random uuidv4 random id
  timestamp: Date.now(),
  notifType,
  contents,
});

export const deleteNotification = (id) => ({
  type: DELETE_NOTIFICATION,
  id,
});

const INITIAL_STATE = {
  notifications: [/*{
    id: number - unique identifier for the notification 
    type: ENUM - represents a type to draw a card differently depending on what type of notification this is
    timestamp: number
    contents: String - the text to show the user
  }*/],
};

const reducers = {
   [CREATE_NOTIFICATION]: (state, action) => ({
     ...state,
     notifications: [...state.notifications, {
      id: action.id,
      timestamp: action.timestamp,
      type: action.notifType,
      contents: action.contents,
     }]
   }),
   [DELETE_NOTIFICATION]: (state, action) => ({
     ...state,
     notifications: state.notifications.filter(({ id }) => id !== action.id),
   }),
};

// boilerplate
export default function (state = INITIAL_STATE, action) {
  if (reducers[action.type]) {
    return reducers[action.type](state, action);
  }

  return state;
};
