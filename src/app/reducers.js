import {
  SIGN_UP,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR,
  SIGN_IN,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  MAKE_POST_SUCCESS,
  MAKE_POST_ERROR,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_ERROR,
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_ERROR,
  LOG_OUT,
  LOAD_SESSION,
  LOAD_COMMENTS_SYNC,
  FETCH_COMMENTS,
  SEND_COMMENT_SUCCESS,
  EDIT_POST_SUCCESS,
  EDIT_COMMENT_SUCCESS,
  DELETE_COMMENT_SUCCESS,
  DELETE_POST_SUCCESS,
} from './actions';

const reducer = (prevState, action) => {
  console.log(action)
  const { type, payload } = action;
  switch (type) {
    case SIGN_UP:
    case SIGN_IN:
    case FETCH_COMMENTS:
      return { ...prevState, isFetching: !payload.background };
    case SIGN_UP_SUCCESS:
      return {
        ...prevState,
        isFetching: false,
        isSignUpSuccessful: true,
        errors: ['Registration successful! Use your e-mail and password to sign in.']
      };
    case SIGN_UP_ERROR:
    case SIGN_IN_ERROR:
    case FETCH_COMMENTS_ERROR:
      return { ...prevState, isFetching: false, errors: payload.error };
    case SIGN_IN_SUCCESS:
      return { ...prevState, isFetching: false, authHeaders: payload.headers, userData: payload.data };
    case LOG_OUT:
      return { ...prevState, authHeaders: null };
    case LOAD_SESSION:
      return { ...prevState, ...payload };
    case MAKE_POST_SUCCESS:
      return {
        ...prevState,
        posts: [
          ...prevState.posts,
          {
            ...payload,
            id: payload.id,
            date: new Date(payload.created_at),
            comments: []
          }
        ]
      }
    case FETCH_POSTS_SUCCESS:
    case FETCH_COMMENTS_SUCCESS:
      return { ...prevState, isFetching: false, ...payload}
    case LOAD_COMMENTS_SYNC:
      let filteredComments = prevState.comments.filter(({ commentable_type, commentable_id }) => (
        commentable_type.toLowerCase() === payload.type && commentable_id === payload.id
      ))
      filteredComments.sort((a, b) => new Date(a.created_at)-new Date(b.created_at));
      return {
        ...prevState,
        cachedComments: {
          ...prevState.cachedComments,
          [payload.type]: {
            ...prevState.cachedComments[payload.type],
            [payload.id]: filteredComments
          }
        }
      };
    case SEND_COMMENT_SUCCESS:
    case EDIT_COMMENT_SUCCESS:
      return { ...prevState, comments: [...prevState.comments, payload] };
    case EDIT_POST_SUCCESS:
      return { 
        ...prevState,
        posts: [ ...prevState.posts.filter((post) => post.id !== payload.id), payload ]
      };
    case DELETE_COMMENT_SUCCESS:
      return {
        ...prevState,
        comments: prevState.comments.filter((comment) => comment.id !== action.payload.id)
      };
    case DELETE_POST_SUCCESS:
      return {
        ...prevState,
        posts: prevState.posts.filter((post) => post.id !== payload.id),
      }
    default:
      return { ...prevState };
  }
}

export default reducer;