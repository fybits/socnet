import { take, put, call, fork } from 'redux-saga/effects'
import {
  SIGN_UP,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR,
  SIGN_IN,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
} from './actions';

// Fetch mock
const fetch = ({url, data}) => {
  // return Promise.resolve({ json: () => Promise.reject("Bruh error: server unreachable") });
  return Promise.resolve({ json: () => Promise.resolve({ authToken: 'BRUHBRUHBRUH' }) });
  // return Promise.resolve({ json: () => Promise.resolve({ authToken: '', error: 'Wrong password' }) });
}

const fetchData = async ({url, data}) => {
  let response = await fetch({ url, data });
  return await response.json();
}

function* signupSaga() {
  while (true) {
    let action = yield take(SIGN_UP);
    // TODO: authentificate
    try {
      let json = yield call(fetchData, { url: 'localhost', data: action.payload })
      
      if (json.authToken) {
        yield put({ type: SIGN_UP_SUCCESS, payload: { authToken: json.authToken } });
      } else {
        yield put({ type: SIGN_UP_ERROR, payload: { error: json.error } });
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
      let json = yield call(fetchData, { url: 'localhost', data: action.payload })
      
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

function* mainSaga() {
  yield fork(signupSaga);
  yield fork(signinSaga);
}


export { mainSaga };