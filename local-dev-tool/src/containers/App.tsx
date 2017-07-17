import * as React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Header from '../components/Helpers/Header/Header';
import reducers from '../reducers';


interface Props extends React.Props<App> {
}

export default class App extends React.Component<Props, {}> {
  public render() {
    return (
      <div className="content-app">
        <Header />
        {this.props.children}
      </div>
    );
  }
}
