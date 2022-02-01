// https://redux.js.org/tutorials/essentials/part-1-overview-concepts

// template for actions. This is to enforce constants so that you don't make a mistake mispelling an action name.
// export const <ACTION NAME> = 'pantry/<action name>'; 

// template for action creators. This helps you create actions based on the arguments. Replace <arg1> and such with the necessary args. 
// Import these to use in store.dispatch(<action name>) to dispatch actions.
// export const <action name> = (<arg1>, <arg2>, ...) => ({
//   type: <ACTION NAME>,
//   arg1: arg1,
//   arg2: arg2,
//   ...
// })

const INITIAL_STATE = {
  ingredients: [],
};

const reducers = {
  /**
   * reducer template: replace name with the action name
   * as seen here: https://github.com/coder13/LetsCube/blob/master/client/src/store/chat/reducer.js
   * [<action name>]: (state, action) => ({
   *   ...state,
   * })
   * */
};

// boilerplate
export default function (state = INITIAL_STATE, action) {
  if (reducers[action.type]) {
    return reducers[action.type](state, action)
  }

  return state;
};
