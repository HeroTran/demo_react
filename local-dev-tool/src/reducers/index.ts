import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import HomeReducer  from './HomeReducer';
import SiteReducer  from './SiteReducer';
import IssueReducer  from './IssueReducer';


const rootReducer = combineReducers({
    HomeReducer,
    SiteReducer,
    IssueReducer,
    routing
});

export default rootReducer;
