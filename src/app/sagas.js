import { take, put, call, fork, select } from 'redux-saga/effects'
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
  FETCH_POSTS,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_ERROR,
} from './actions';

// Fetch mock
// const fetch = ({url, data}) => {
//   // return Promise.resolve({ json: () => Promise.reject("Bruh error: server unreachable") });
//   return Promise.resolve({ json: () => Promise.resolve({ authToken: 'BRUHBRUHBRUH' }) });
//   // return Promise.resolve({ json: () => Promise.resolve({ authToken: '', error: 'Wrong password' }) });
// }

const baseURL = 'https://postify-api.herokuapp.com';


async function fetchData(path, { method = 'POST', ...rest}) {
  let response = await fetch(baseURL+path, { method, ...rest });
  let json = await response.json();
  return { response, json };
}

function* signupSaga() {
  while (true) {
    let action = yield take(SIGN_UP);

    try {
      let { json } = yield call(fetchData, '/auth', { body: action.payload });

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

    try {
      let { response, json } = yield call(fetchData, '/auth/sign_in', { body: action.payload });

      if (response.status === 200) {
        let neededHeaders = ['access-token', 'client', 'uid'];
        const headers = Object.fromEntries(
            [...response.headers].filter((value, key) => neededHeaders.indexOf(value[0]) !== -1)
        );
        yield put({ type: SIGN_IN_SUCCESS, payload: { headers, data: json.data } });
      } else {
        yield put({ type: SIGN_IN_ERROR, payload: { error: json.errors } });
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

function* fetchPostsSaga() {
  while (true) {
    let action = yield take(FETCH_POSTS);
    
    try {
      let heads = yield select((state) => state.authHeaders);
      console.log(heads);
      let { json } = yield call(
        fetchData, '/posts/',
        {
          method: 'GET',
          headers: heads,
        },
      );
      console.log(json);
      if (!json.errors) {
        yield put({ type: FETCH_POSTS_SUCCESS, payload: { posts: json } });
      } else {
        yield put({ type: FETCH_POSTS_ERROR, payload: { error: json.error } });
      }
    } catch (error) {
      yield put({ type: FETCH_POSTS_ERROR, payload: { error } });
    }
  }
}

function* mainSaga() {
  yield fork(signupSaga);
  yield fork(signinSaga);
  //yield fork(makePostSaga)
  yield fork(fetchPostsSaga)
}


export { mainSaga };