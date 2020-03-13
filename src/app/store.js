import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga';
import { mainSaga } from './sagas';
import { SIGN_UP_SUCCESS, SIGN_IN_SUCCESS } from './actions';

const reducer = (prevState, action) => {
  console.log(action)
  switch (action.type) {
    case SIGN_IN_SUCCESS:
      return { ...prevState, authToken: action.payload.authToken };
    default:
      return { ...prevState };
  }
}

const sagaMiddleware = createSagaMiddleware();

export default createStore(reducer, { authToken: 'asdasdas' }, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(mainSaga);
