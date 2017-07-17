import * as React from 'react'
import * as cx from 'classnames';
import {Link} from 'react-router'
import { Button, Modal } from 'react-bootstrap';
import * as handleImage from '../../utility/handleMethod';
import './Site.scss'

type props = {
    listSite,
    listConfig,
    downLoadIssue?:Function,
    deleteIssue?:Function,
    onClick?:Function,
    eventOpenModal?:Function,
    eventCloseModal?:Function,
    eventConfig?:Function;
    params
}

export default class Site extends React.Component<props, void> {
 constructor(props:props){
        super(props);
  }
  
  handleDownload =(isDowload,siteId,issueId,index) =>{
    document.getElementById("issueId_"+index).className += " downloadding";
    this.props.downLoadIssue(isDowload,siteId,issueId,index);
  }
  handleDelete = (isDowload,siteId,issueId,index) => {
      document.getElementById("issueId_"+index).className += " downloadding";
      this.props.deleteIssue(isDowload,siteId,issueId,index);
  }
  handleConfig = (event,index) =>{
    this.props.eventConfig(true,index,event.target.value)
  }
  handleOpenModal = (index) => {
    this.props.eventOpenModal(index);
  }
  handleCloseModal = (index)=>{
      this.props.eventCloseModal(index);
  }
  handleErrorImage = (event) => {
      event.target.src = "/images/default-img.png";
  }
  
  render() {
      const{listSite,listConfig,params} = this.props;
      const siteId = params.id;
      return (
        <ul>
        {listSite != null && listSite.map((data, index) => {
            const ischeck = data.downloaded;
            const issueId = data.id;
            const siteDown = cx({
                'isDownload': ischeck === false,
                'downloaded': ischeck === true
            });
            
            var img = data.cover_image == null ? "/images/default-img.png" : data.cover_image.thumbnail ;
            return (
                <li className={cx(['Section-issue', siteDown])} key={index} id={"issueId_"+index}>
                    <div className="Issue-cover">
                        <img src={img} onError={(event)=>this.handleErrorImage(event)} title={data.name}/>
                        <div className="Issue-cover-overlay">
                            <div className="spinner"></div>
                            <div className="Overlay-icons" >
                                 {!data.downloaded ? (
                                    <div title="Download" onClick={(event) => this.handleDownload(ischeck,siteId,issueId,index)}  className="tit"><i className="material-icons">file_download</i></div>
                                ) : (
                                    <div>
                                        <Link to={'/sites/'+siteId+"/issues/"+issueId}>
                                            <div className="tit" title="View"><i className="material-icons">visibility</i></div>
                                        </Link>
                                        {/*<div title="Config" onClick={() => this.handleOpenModal(index)} className="tit"><i className="material-icons">settings</i></div>*/}
                                        <div title="Delete" onClick={(event) => this.handleDelete(ischeck,siteId,issueId,index)} className="tit"><i className="material-icons">delete_forever</i></div>
                                    </div>
                                )}
                                
                            </div>
                           
                        </div>
                    </div>
                    <div className="Issue-detail">
                        <ul className="Issue-info">
                                <li className="info-name" title={data.issue_name}>{data.issue_name}</li>
                                <li className="info-id">{data.id}</li>
                        </ul>
                    </div>
                    <Modal data-index={index} show={data.isConfig}>
                        <Modal.Header>
                            <button  type="button" className="close"  onClick={() => this.handleCloseModal(index)}><span aria-hidden="true">×</span><span className="sr-only">Close</span></button>
                        <Modal.Title>Config Layout For Issue</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        
                            <div className="form-group">
                                <label htmlFor="UserName">Issue</label>
                                <input type="text" className="form-control" value={data.issue_name}  readOnly/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="Password">Layout</label>
                                <select  onChange={(event) => this.handleConfig(event,index)} className="form-control" >
                                    {data.listConfig.map((config, idx) => {
                                        return(
                                            <option  selected={config.selected} key={idx} value={idx}>{config.designPack}</option>
                                        );
                                    })}
                                </select>
                            </div>

                    </Modal.Body>
                        <Modal.Footer>
                        <button className="btn btn-primary">
                        Save
                        </button>
                        </Modal.Footer>
                    </Modal>
            </li> 
            
            );
        })}
        </ul>     
    );
    
  }
}