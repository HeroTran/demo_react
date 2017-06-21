import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import configureStore from './store/configureStore';
import "bootstrap-sass/assets/stylesheets/_bootstrap.scss";
import './app.scss';
import App from './containers/App';
import HomeContainer from './containers/HomeContainer';
import SiteContainer from './containers/SiteContainer';
import IssueContainer from './containers/IssueContainer';


const store = configureStore({});

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App} >
        <IndexRoute component={HomeContainer} />
        <Route path="/site/:id" component={SiteContainer} />
        <Route path="/site/:siteId/issue/:issueId" component={IssueContainer} />
      </Route>
    </Router>
  </Provider>
  , document.getElementById('root'));