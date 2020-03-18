import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga';
import { mainSaga } from './sagas';
import { LOAD_SESSION } from './actions';
import reducer from './reducers'

const sagaMiddleware = createSagaMiddleware();

const initialState = {
  authHeaders: {},
  posts: [],
  cachedComments: {
    post: {},
    comment: {}
  },
  errors: {},
};


const store = createStore(reducer, initialState, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(mainSaga);

store.dispatch({
  type: LOAD_SESSION, 
  payload: {
    authHeaders: JSON.parse(window.localStorage.getItem('authHeaders')),
    posts: JSON.parse(window.localStorage.getItem('posts')),
  }
})

export default store;