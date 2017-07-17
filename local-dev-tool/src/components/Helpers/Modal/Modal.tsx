import * as React from 'react';
import { Button, Modal } from 'react-bootstrap';

import './Modal.scss'

interface propsModal{
    isShow?:boolean,
    isError?:string,
    closeModal?:Function,
    infoConfig?:State.InfoConfig,
    submitConfig?:Function,
    onClick?:Function,
    onChange?:Function,
    onChangeInput?:Function
}
interface stateInfo{
}


export default class ModalInfo extends React.Component<propsModal, stateInfo> {
 constructor(props:propsModal){
        super(props);
  }
   close = () => {
    this.props.closeModal(false);
  }
  submitFrom = () =>{
    this.props.submitConfig(this.props.infoConfig);
  }
  handleChangeInput =(propertyName,event) =>{
    this.props.onChangeInput(propertyName,event.target.value);
  }
  
  render() {
      const{isShow,isError,closeModal,infoConfig,submitConfig} = this.props;
    return (
        <Modal show={this.props.isShow} onHide={this.close}>
            <Modal.Header closeButton>
            <Modal.Title>Add new site</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {this.props.isError.length  > 0 &&
                <div className="alert alert-danger">
                  <strong>Danger! </strong> {this.props.isError}
                </div>
              }
             
              <div className="form-group">
                <label htmlFor="siteID">Site ID</label>
                <input type="text"  className="form-control" onChange={this.handleChangeInput.bind(this, 'siteId')} id="siteId" placeholder="Enter Site ID" />
              </div>
              <div className="form-group">
                <label htmlFor="SiteName">Site Name</label>
                <input type="text" className="form-control" onChange={this.handleChangeInput.bind(this ,'siteName')} id="siteName" placeholder="Enter Site Name" />
              </div>
              <div className="form-group">
                <label htmlFor="SiteLink">Site Link</label>
                <input type="text" className="form-control" onChange={this.handleChangeInput.bind(this, 'siteLink')} id="siteLink" placeholder="Enter Site Link" />
              </div>
              <div className="form-group">
                <label htmlFor="UserName">UserName</label>
                <input type="text" readOnly defaultValue="admin@audiencemedia.com" className="form-control" onChange={this.handleChangeInput.bind(this, 'siteUser')} placeholder="Enter UserName" />
              </div>
              <div className="form-group">
                <label htmlFor="Password">Password</label>
                <input readOnly type="text" defaultValue="devteam" className="form-control" id="sitePass" onChange={this.handleChangeInput.bind(this, 'sitePass')} placeholder="Enter password" />
              </div>
          </Modal.Body>
            <Modal.Footer>
            <button className="btn btn-primary" onClick={this.submitFrom}>
              Submit
            </button>
            </Modal.Footer>
        </Modal>
    );
  }
}

