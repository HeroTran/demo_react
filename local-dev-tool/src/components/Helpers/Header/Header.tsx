import * as React from 'react'
import { Link } from 'react-router';
import './Header.scss'

export default class Header extends React.Component<any,any> {
  
  render() {
    return (
      <div  className="Header">
        <div className="Header-Home">
            <Link to="/">
                <img src="/images/logo-header.png" alt="App dev Tool" />
            </Link>
        </div>
        {/*
            <div className="Header-search">
                <div className="Header-expandableSearch">
                    <form>
                        <input type="search" className="Header-searchInput" placeholder = "Search for Magazine"/>
                        <i className="Header-searchIcon material-icons md-12 dark">search</i>
                    </form>
                </div>
            </div>
        */}
        
      </div>
    );
  }
}
