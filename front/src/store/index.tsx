import createHistory from 'history/createBrowserHistory';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import reducers from '../reducers';
import sagas from './sagas';

// router
export const history = createHistory();
const routerMiddlewareWithHistory = routerMiddleware(history);

// import mySaga from './sagas'

// Saga ミドルウェアを作成する
const sagaMiddleware = createSagaMiddleware();

// Store にマウントする
const store = createStore(
  combineReducers({ reducers, routerReducer }),
  applyMiddleware(sagaMiddleware, logger, routerMiddlewareWithHistory)
);

sagaMiddleware.run(sagas);
export default store;
// Saga を起動する
// sagaMiddleware.run(mySaga)
