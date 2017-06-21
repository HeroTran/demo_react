import * as React from 'react'
import * as cx from 'classnames';
import {Link} from 'react-router'
import { Button, Modal } from 'react-bootstrap';
import * as handleImage from '../../utility/handleMethod';
import './Site.scss'

type props = {
    listSite,
    listConfig,
    eventDownload?:Function,
    eventDeleted?:Function,
    onClick?:Function,
    eventOpenModal?:Function,
    eventCloseModal?:Function,
}

export default class Site extends React.Component<props, void> {
 constructor(props:props){
        super(props);
  }
  
  handleDownload =(isDowload,index) =>{
    this.props.eventDownload(isDowload,index);
  }
  handleDelete = (isDeleted,index) => {
      this.props.eventDeleted(isDeleted,index);
  }
  handleChangeInput = () =>{

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
      const{listSite,listConfig} = this.props;
      return (
        <ul>
        {listSite != null && listSite.map((data, index) => {
            const ischeck = data.downloaded;
            const siteDown = cx({
                'isDownload': ischeck === false,
                'downloaded': ischeck === true
            });
            var img = data.cover_image == null ? "/images/default-img.png" : data.cover_image.thumbnail ;
            return (
                <li className={cx(['Section-issue', siteDown])} key={index} >
                    <div className="Issue-cover">
                        <img src={img} onError={(event)=>this.handleErrorImage(event)}/>
                        <div className="Issue-cover-overlay">
                            <div className="Overlay-icons" >
                                 {!data.downloaded ? (
                                    <div title="Download" onClick={() => this.handleDownload(ischeck,index)}  className="tit"><i className="material-icons">file_download</i></div>
                                ) : (
                                    <div>
                                        <Link to="site/2923/issue/30">
                                            <div className="tit" title="View"><i className="material-icons">visibility</i></div>
                                        </Link>
                                        <div title="Config" onClick={() => this.handleOpenModal(index)} className="tit"><i className="material-icons">settings</i></div>
                                        <div title="Delete" onClick={() => this.handleDelete(ischeck,index)} className="tit"><i className="material-icons">delete_forever</i></div>
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
                                <input type="text" className="form-control" value={data.siteName}  readOnly/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="Password">Layout</label>
                                <select className="form-control">
                                    {listConfig.map((config, idx) => {
                                        return(
                                            <option key={idx} value={config}>{config}</option>
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