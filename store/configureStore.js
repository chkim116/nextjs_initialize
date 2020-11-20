import { createStore, applyMiddleware, compose } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import rootReducer from '../redux';
import rootSaga from '../sagas';

const configureStore = () => {
    const sagaMiddleware = createSagaMiddleware();
    const logger = createLogger();
    const enhancer =
        process.env.NODE_ENV === 'production'
            ? compose(applyMiddleware())
            : compose(
                  composeWithDevTools(applyMiddleware(sagaMiddleware, logger))
              );
    const store = createStore(rootReducer, enhancer);
    store.sagaTask = sagaMiddleware.run(rootSaga);
    return store;
};

const wrapper = createWrapper(configureStore, { debug: true });

export default wrapper;
