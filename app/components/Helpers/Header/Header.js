import React from 'react'
import './Header.scss'

export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div  className="Header">
        <div className="Header-search">
            <form>
                <input type="search" className="Header-searchInput" placeholder = "Search for Magazine"/>
                <i className="Header-searchIcon material-icon md-24 dask">search</i>
            </form>
        </div>
      </div>
    );
  }
}
