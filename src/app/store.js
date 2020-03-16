import { createStore, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga';
import { mainSaga } from './sagas';
import {
  SIGN_IN_SUCCESS,
  LOG_OUT,
  LOAD_SESSION,
  MAKE_POST_SUCCESS,
  SIGN_UP,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR,
} from './actions';

const reducer = (prevState, action) => {
  console.log(action)
  switch (action.type) {
    case SIGN_UP:
      return { ...prevState, isFetching: true };
    case SIGN_UP_SUCCESS:
      return { ...prevState, isFetching: false, isSignUpSuccessful: true, errors: {} };
    case SIGN_UP_ERROR:
      return { ...prevState, isFetching: false, errors: action.payload.error };
    case SIGN_IN_SUCCESS:
      return { ...prevState, authToken: action.payload.authToken };
    case LOG_OUT:
      return { ...prevState, authToken: '' };
    case LOAD_SESSION:
      return { ...prevState, authToken: action.payload.authToken };
    case MAKE_POST_SUCCESS:
      return {
        ...prevState,
        posts: [
          ...prevState.posts,
          {
            ...action.payload,
            id: Date.now(),
            date: Date.now(),
            comments: []
          }
        ]
      }
    default:
      return { ...prevState };
  }
}

const sagaMiddleware = createSagaMiddleware();

const initialState = {
  authToken: '',
  posts: [
    { id: 228, title: 'Bruh', description: 'Bruh bruh bruh', date: 1584347727000, comments: [{ body: 'bruh' }, { body: 'bruh' }, { body: 'bruh' }] },
    { id: 1488, title: 'Ne bruh', description: 'Ne bruh bruh bruh', date: 1584347228000, comments: [{ body: 'bruh' }, { body: 'bruh' }] },
    { id: 42069, title: 'Bruh bruhen bruh', description: 'Ne bruh bruh bruh', date: 1584347228000, comments: [{ body: 'bruh' }, { body: 'bruh' }] },
  ],
  errors: {},
};


export default createStore(reducer, initialState, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(mainSaga);
