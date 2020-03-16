import { take, put, call, fork } from 'redux-saga/effects'
import {
  SIGN_UP,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR,
  SIGN_IN,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  MAKE_POST,
  MAKE_POST_SUCCESS,
  MAKE_POST_ERROR,
} from './actions';

// Fetch mock
// const fetch = ({url, data}) => {
//   // return Promise.resolve({ json: () => Promise.reject("Bruh error: server unreachable") });
//   return Promise.resolve({ json: () => Promise.resolve({ authToken: 'BRUHBRUHBRUH' }) });
//   // return Promise.resolve({ json: () => Promise.resolve({ authToken: '', error: 'Wrong password' }) });
// }

const baseURL = 'https://postify-api.herokuapp.com';


const fetchData = async (path, data) => {
  console.log("Fetching..");
  let response = await fetch(baseURL+path, { method: 'POST', body: data });
  console.log(...data.entries())
  return await response.json();
}

function* signupSaga() {
  while (true) {
    let action = yield take(SIGN_UP);
    // TODO: authentificate

    try {
      let json = yield call(fetchData, '/auth', action.payload);
      
      if (json.status === 'success') {
        yield put({ type: SIGN_UP_SUCCESS, payload: { ...json.data } });
      } else {
        yield put({ type: SIGN_UP_ERROR, payload: { error: json.errors } });
      }
    } catch (error) {
      yield put({ type: SIGN_UP_ERROR, payload: { error } });
    }
  }
}

function* signinSaga() {
  while (true) {
    let action = yield take(SIGN_IN);
    // TODO: authentificate
    try {
      let json = yield call(fetchData, { url: 'localhost/auth', data: action.payload });
      
      if (json.authToken) {
        yield put({ type: SIGN_IN_SUCCESS, payload: { authToken: json.authToken } });
      } else {
        yield put({ type: SIGN_IN_ERROR, payload: { error: json.error } });
      }
    } catch (error) {
      yield put({ type: SIGN_IN_ERROR, payload: { error } });
    }
  }
}

function* makePostSaga() {
  while (true) {
    let action = yield take(MAKE_POST);
    
    try {
      let json = yield call(fetchData, { url: 'localhost/posts/', data: action.payload });
      if (json) {
        yield put({ type: MAKE_POST_SUCCESS, payload: action.payload });
      } else {
        yield put({ type: MAKE_POST_ERROR, payload: { error: json.error } });
      }
    } catch (error) {
      yield put({ type: MAKE_POST_ERROR, payload: { error } });
    }
  }
}

function* mainSaga() {
  yield fork(signupSaga);
  //yield fork(signinSaga);
  yield fork(makePostSaga)
}


export { mainSaga };