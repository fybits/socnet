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
  SEND_COMMENT,
  SEND_COMMENT_SUCCESS,
  SEND_COMMENT_ERROR,
  EDIT_POST,
  EDIT_POST_SUCCESS,
  EDIT_POST_ERROR,
  LOAD_COMMENTS,
  LOAD_COMMENTS_SYNC,
  EDIT_COMMENT,
  EDIT_COMMENT_SUCCESS,
  EDIT_COMMENT_ERROR,
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
        yield put({ type: MAKE_POST, payload: json });
      } else {
        yield put({ type: MAKE_POST_ERROR, payload: { error: json.error } });
      }
    } catch (error) {
      yield put({ type: MAKE_POST_ERROR, payload: { error } });
    }
  }
}

function* makeCommentSaga() {
  while (true) {
    let action = yield take(SEND_COMMENT);
    
    try {
      let { json } = yield call(
        fetchData, '/comments/',
        {
          body: JSON.stringify(action.payload),
          headers: { ...yield select((state) => state.authHeaders), 'content-type': 'application/json'},
        },
      );
      if (json) {
        yield put({ type: SEND_COMMENT_SUCCESS, payload: json });
        yield put({
          type: LOAD_COMMENTS,
          payload: {
            id: json.commentable_id,
            type: json.commentable_type.toLowerCase(),
          }
        });
      } else {
        yield put({ type: SEND_COMMENT_ERROR, payload: { error: json.error } });
      }
    } catch (error) {
      yield put({ type: SEND_COMMENT_ERROR, payload: { error } });
    }
  }
}

function* fetchPostsSaga() {
  while (true) {
    yield take(FETCH_POSTS);
    
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
    const action = yield take(FETCH_COMMENTS);
    
    try {
      let { json } = yield call(
        fetchData, '/comments/',
        {
          method: 'GET',
          headers: yield select((state) => state.authHeaders),
        },
      );
      
      if (!json.errors) {
        yield put({
          type: FETCH_COMMENTS_SUCCESS,
          payload: {
            comments: json,
          }
        });
      } else {
        yield put({ type: FETCH_COMMENTS_ERROR, payload: { error: json.error } });
      }
    } catch (error) {
      yield put({ type: FETCH_COMMENTS_ERROR, payload: { error } });
    }
  }
}

function* loadCommentsSaga() {
  const queue = yield actionChannel(LOAD_COMMENTS)
  yield take(FETCH_COMMENTS_SUCCESS);
  while (true) {
    const action = yield take(queue);
    yield put({ ...action, type: LOAD_COMMENTS_SYNC })
  }
}

function* editPostSaga() {
  while (true) {
    const action = yield take(EDIT_POST);
    
    try {
      let { response, json } = yield call(
        fetchData, `/posts/${action.payload.id}`,
        {
          method: 'PUT',
          body: JSON.stringify({
            post: {
              title: action.payload.title,
              description: action.payload.description,
            }
          }),
          headers: { ...yield select((state) => state.authHeaders), 'content-type': 'application/json'},  
        },
      );
      
      if (json && response.status === 200) {
        yield put({ type: EDIT_POST_SUCCESS, payload: json });
        yield put({
          type: LOAD_COMMENTS,
          payload: {
            id: json.commentable_id,
            type: json.commentable_type.toLowerCase(),
          }
        });
      } else {
        yield put({ type: EDIT_POST_ERROR, payload: { json } });
      }
    } catch (error) {
      yield put({ type: EDIT_POST_ERROR, payload: { error } });
    }
  }
}


function* editCommentSaga() {
  while (true) {
    const action = yield take(EDIT_COMMENT);
    
    try {
      let { response, json } = yield call(
        fetchData, `/comments/${action.payload.id}`,
        {
          method: 'PUT',
          body: JSON.stringify({
            message: action.payload.message,
          }),
          headers: { ...yield select((state) => state.authHeaders), 'content-type': 'application/json'},  
        },
      );
      console.log(response, json);
      if (response.status === 200) {
        yield put({ type: EDIT_COMMENT_SUCCESS, payload: json });
      } else {
        yield put({ type: EDIT_COMMENT_ERROR, payload: { json } });
      }
    } catch (error) {
      yield put({ type: EDIT_COMMENT_ERROR, payload: { error } });
    }
  }
}

function* mainSaga() {
  yield fork(signupSaga);
  yield fork(signinSaga);
  yield fork(makePostSaga);
  yield fork(makeCommentSaga);
  yield fork(fetchPostsSaga);
  yield fork(fetchCommentsSaga);
  yield fork(loadCommentsSaga);
  yield fork(editPostSaga);
  yield fork(editCommentSaga);
}

export { mainSaga };