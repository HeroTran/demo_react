import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import configureStore from './store/configureStore';
import './app.scss';
import App from './containers/App';
import Home from './containers/Home';
import Issue from './containers/Issue';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route  path="/" component={App} >
      <IndexRoute component={Home}/>
      <Route path="/issue/:id"  component={Issue} />
    </Route>
  </Router>

  , document.getElementById('root'));