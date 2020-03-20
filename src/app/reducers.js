import {
  SIGN_UP,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR,
  SIGN_IN,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  MAKE_POST_SUCCESS,
  FETCH_POSTS_SUCCESS,
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_ERROR,
  LOG_OUT,
  LOAD_SESSION,
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
      return { ...prevState, isFetching: false, ...payload}
    case FETCH_COMMENTS_SUCCESS:
      let { comments } = payload;
      let cachedComments = { post: {}, comment: {} };
      comments.sort((a, b) => new Date(a.created_at)-new Date(b.created_at))
        .forEach(comment => {
        let { commentable_id, commentable_type } = comment;
        if (!cachedComments[commentable_type.toLowerCase()][commentable_id]){
          cachedComments[commentable_type.toLowerCase()][commentable_id] = [];
        }
        cachedComments[commentable_type.toLowerCase()][commentable_id].push(comment);
      });
      return { ...prevState, isFetching: false, cachedComments: cachedComments };
    case SEND_COMMENT_SUCCESS:
    case EDIT_COMMENT_SUCCESS:
    case DELETE_COMMENT_SUCCESS:
      let type = payload.commentable_type.toLowerCase();
      let newCommentable = [...(prevState.cachedComments[type][payload.commentable_id] || [])];
      if (action.type !== SEND_COMMENT_SUCCESS) {
        newCommentable = newCommentable.filter((comment) => comment.id !== payload.id);
      }
      if (action.type !== DELETE_COMMENT_SUCCESS) {
        newCommentable.push(payload);
      }
      return { ...prevState,
        cachedComments: {
          ...prevState.cachedComments,
          [type]: {
            ...prevState.cachedComments[type],
            [payload.commentable_id]: newCommentable,
          }
        }
      };
    case EDIT_POST_SUCCESS:
      return { 
        ...prevState,
        posts: [...prevState.posts.filter((post) => post.id !== payload.id), payload]
      };
    case DELETE_POST_SUCCESS:
      return {
        ...prevState,
        posts: [...prevState.posts.filter((post) => post.id !== payload.id)]
      }
    default:
      return { ...prevState };
  }
}

export default reducer;