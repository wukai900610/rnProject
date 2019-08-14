/**
 * 创建Store,整合Provider
 * Songlcy create by 2017-01-10
 * @flow
 */
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import rootReducer from '../reducers/rootReducer';

const logger = createLogger();

let store = createStore(rootReducer,{},
    compose(
        applyMiddleware(thunk, logger),
    )
);

export default store;
