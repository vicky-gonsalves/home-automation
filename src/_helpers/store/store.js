import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../../_reducers';

export const composeEnhancers = () => {
  /* istanbul ignore if  */
  if (typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
    return window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});
  }
  return compose;
};

const allEnhancers = composeEnhancers();

const enhancer = allEnhancers(applyMiddleware(thunkMiddleware));

export const store = createStore(rootReducer, enhancer);
