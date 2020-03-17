import { createStore, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga';
import { mainSaga } from './sagas';
import {
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  SIGN_IN,
  LOG_OUT,
  LOAD_SESSION,
  MAKE_POST_SUCCESS,
  SIGN_UP,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR,
  FETCH_POSTS,
} from './actions';

const reducer = (prevState, action) => {
  console.log(action)
  switch (action.type) {
    case SIGN_UP:
    case SIGN_IN:
      return { ...prevState, isFetching: true };
    case SIGN_UP_SUCCESS:
      return {
        ...prevState,
        isFetching: false,
        isSignUpSuccessful: true,
        errors: ['Registration successful! Use your e-mail and password to sign in.']
      };
    case SIGN_UP_ERROR:
    case SIGN_IN_ERROR:
      return { ...prevState, isFetching: false, errors: action.payload.error };
    case SIGN_IN_SUCCESS:
      return { ...prevState, isFetching: false, authHeaders: action.payload.headers };
    case LOG_OUT:
      return { ...prevState, authHeaders: null };
    case LOAD_SESSION:
      return { ...prevState, authHeaders: action.payload.authHeaders };
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
    case FETCH_POSTS:
      return { ...prevState, posts: [
        {
          id: 228,
          title: 'Bruh',
          description: 'Bruh bruh bruh',
          date: 1584347727000,
          comments: [
            { body: 'bruh' },
            { body: 'bruh' },
            { body: 'bruh' }
          ]
        }
      ]}
    default:
      return { ...prevState };
  }
}

const sagaMiddleware = createSagaMiddleware();

const initialState = {
  authHeaders: {},
  posts: [
    { id: 228, title: 'Bruh', description: 'Bruh bruh bruh', date: 1584347727000, comments: [{ body: 'bruh' }, { body: 'bruh' }, { body: 'bruh' }] },
    { id: 1488, title: 'Ne bruh', description: 'Ne bruh bruh bruh', date: 1584347228000, comments: [{ body: 'bruh' }, { body: 'bruh' }] },
    { id: 42069, title: 'Bruh bruhen bruh', description: 'Ne bruh bruh bruh', date: 1584347228000, comments: [{ body: 'bruh' }, { body: 'bruh' }] },
  ],
  errors: {},
};


export default createStore(reducer, initialState, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(mainSaga);
