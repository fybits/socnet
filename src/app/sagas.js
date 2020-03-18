import { take, put, call, fork, select, actionChannel } from 'redux-saga/effects'
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
  FETCH_COMMENTS,
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_ERROR,
  LOAD_COMMENTS,
  LOAD_COMMENTS_SYNC,
} from './actions';
import { baseURL } from './config';

// Fetch mock
// const fetch = ({url, data}) => {
//   // return Promise.resolve({ json: () => Promise.reject("Bruh error: server unreachable") });
//   return Promise.resolve({ json: () => Promise.resolve({ authToken: 'BRUHBRUHBRUH' }) });
//   // return Promise.resolve({ json: () => Promise.resolve({ authToken: '', error: 'Wrong password' }) });
// }



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
      let { json } = yield call(
        fetchData, '/posts/',
        {
          body: JSON.stringify({ post: action.payload }),
          headers: { ...yield select((state) => state.authHeaders), 'content-type': 'application/json'},
        },
      );
      if (json) {
        yield put({ type: MAKE_POST_SUCCESS, payload: json });
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
      let { json } = yield call(
        fetchData, '/posts/',
        {
          method: 'GET',
          headers: yield select((state) => state.authHeaders),
        },
      );
      
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

function* fetchCommentsSaga() {
  while (true) {
    let action = yield take(FETCH_COMMENTS);
    
    try {
      let { json } = yield call(
        fetchData, '/comments/',
        {
          method: 'GET',
          headers: yield select((state) => state.authHeaders),
        },
      );
      
      if (!json.errors) {
        yield put({ type: FETCH_COMMENTS_SUCCESS, payload: { comments: json } });
      } else {
        yield put({ type: FETCH_COMMENTS_ERROR, payload: { error: json.error } });
      }
    } catch (error) {
      yield put({ type: FETCH_COMMENTS_ERROR, payload: { error } });
    }
  }
}

function* loadComments() {
  const queue = yield actionChannel(LOAD_COMMENTS)
  yield take(FETCH_COMMENTS_SUCCESS);
  while (true) {
    const action = yield take(queue);
    yield put({ ...action, type: LOAD_COMMENTS_SYNC })
  }
}

function* mainSaga() {
  yield fork(signupSaga);
  yield fork(signinSaga);
  yield fork(makePostSaga);
  yield fork(fetchPostsSaga);
  yield fork(fetchCommentsSaga);
  yield fork(loadComments);
}

export { mainSaga };