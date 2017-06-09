import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import Home from './components/Home/Home';
import Issue from './components/Issue/Issue';
import Site from './components/Site/Site';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={Home} />
		<Route path="/issue" component={Issue} />
		<Route path="/site(/:pathParam)" component={Site} />
	</Route>
);
