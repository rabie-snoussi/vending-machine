import { createStore, applyMiddleware } from 'redux';
import reducers from 'reducers';
import createSagaMiddleware from 'redux-saga';
import { watcherSaga } from 'middleware';

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

const store = createStore(reducers, {}, applyMiddleware(...middleware));

sagaMiddleware.run(watcherSaga);

export default store;
