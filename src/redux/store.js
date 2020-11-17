import {applyMiddleware, createStore} from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers/FilterReducer';

export const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
