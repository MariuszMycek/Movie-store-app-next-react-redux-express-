import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from '../modules/reducers';

let store = null;

const reducers = combineReducers(reducer);

const getStore = initialState => ({
  store: createStore(
    reducers,
    initialState,
    compose(applyMiddleware(thunkMiddleware))
  )
});

export const initStore = (isServer, initialState) => {
  if (isServer && typeof window === 'undefined') {
    //Server
    return getStore(initialState);
  }
  if (!store) {
    //Client
    store = getStore(initialState);
  }
  return store;
};

export default initStore;
