import { createStore, applyMiddleware ,compose} from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger'
import rootReducer from '../reducers';

const loggerMiddleware = createLogger();
export default function configureStore(initialState) {
    const store = createStore(
        rootReducer,
        applyMiddleware(thunk,loggerMiddleware),
    );

    return store;
}
