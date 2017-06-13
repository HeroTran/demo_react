import * as React from 'react'
import {Link} from 'react-router'
import './Magazine.scss'

export default class Magazine extends React.Component<any,any> {
 
  render() {
    return (
      <div  className="Main-Section">
        <ul className="Section">
            <li className="Section-group">
                <div className="Group-header">
                    <h2 className="Group-Title">List Site Magazine</h2>
                    <span className="Add-new"><i className="material-icons md-12 dark">add</i>
                        Add Site
                    </span>
                </div>

                <ul>
                    <li className="Section-issue">
                        <div className="Issue-cover">
                            <img src={"/images/default-img.png"}/>
                            <div className="Issue-cover-overlay">
                                <div className="Overlay-icons Issue-remove" >
                                    <i className="material-icons md-12 dark">delete</i>
                                </div>
                            </div>
                        </div>
                        <div className="Issue-detail">
                            <ul className="Issue-info">
                                <Link to="Issue/123">
                                <li className="info-name">Play Boy</li>
                                <li className="info-id">4312</li>
                                </Link>
                            </ul>
                        </div>
                    </li>
                </ul>
            </li>
        </ul>
      </div>
    );
  }
}
