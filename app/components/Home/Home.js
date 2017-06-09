import React from 'react'
import './Home.scss'

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div  className="Main-Section">
        <ul className="Section">
            <li className="Section-group">
                <h2 className="Group-Title">List Site Magazine</h2>
                <ul>
                    <li className="Section-issue">
                        <div className="Issue-cover">
                            <img />
                            <div className="Issue-cover-overlay">
                                <div className="Overlay-icons Issue-remove" >
                                    <i className="material-icons md-12 dark">delete</i>
                                </div>
                            </div>
                        </div>
                        <div className="Issue-detail">
                            <ul className="Issue-info">
                                <li className="info-name">Play Boy</li>
                                <li className="info-id">4312</li>
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
