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
} from './actions';

const reducer = (prevState, action) => {
  console.log(action)
  switch (action.type) {
    case SIGN_UP:
    case SIGN_IN:
    case FETCH_COMMENTS:
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
    case FETCH_COMMENTS_ERROR:
      return { ...prevState, isFetching: false, errors: action.payload.error };
    case SIGN_IN_SUCCESS:
      return { ...prevState, isFetching: false, authHeaders: action.payload.headers };
    case LOG_OUT:
      return { ...prevState, authHeaders: null };
    case LOAD_SESSION:
      return { ...prevState, ...action.payload };
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
    case FETCH_POSTS_SUCCESS:
    case FETCH_COMMENTS_SUCCESS:
      return { ...prevState, isFetching: false, ...action.payload}
    case LOAD_COMMENTS_SYNC:
      let filteredComments = prevState.comments.filter(({ commentable_type, commentable_id }) => (
        commentable_type.toLowerCase() === action.payload.type && commentable_id === action.payload.id
      ))
      console.log('Filtered: ', filteredComments);
      return {
        ...prevState,
        cachedComments: {
          ...prevState.cachedComments,
          [action.payload.type]: {
            ...prevState.cachedComments[action.payload.type],
            [action.payload.id]: filteredComments
          }
        }
      };
    default:
      return { ...prevState };
  }
}

export default reducer;