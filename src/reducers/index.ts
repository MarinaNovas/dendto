import {combineReducers} from 'redux';

import clusterReducer from './cluster';

const rootReducer = combineReducers({
    clusterReducer,
});

export default rootReducer;
