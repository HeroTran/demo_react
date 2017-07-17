import * as React from 'react'
import {Link} from 'react-router'
import './Magazine.scss'

type propsMagazine = {
    siteMagazine;
    deleteSite?:Function
}

export default class Magazine extends React.Component<propsMagazine,{}>{
    constructor(props:propsMagazine){
        super(props);
    }
    handleDeleteSite = (siteId,event) =>{
        //console.log(siteId);
        event.preventDefault();
        this.props.deleteSite(siteId);
    }
    render(){
        const{siteMagazine,deleteSite} = this.props;
        //console.log('siteMagazine',siteMagazine)
        return(
            <ul>
                {siteMagazine != null && siteMagazine.map((data, index) => {
                    var siteId = data.siteId;
                    return (
                        
                        <li className="Section-issue" key={index}>
                            <div className="Issue-cover">
                                {
                                    data.image ? 
                                    (<img src={data.image}/>)
                                    : (<img src="/images/logo.png"/>)
                                }
                                <div className="Issue-cover-overlay">
                                    <div className="Overlay-icons Issue-remove">
                                        <Link to={`/sites/${data.siteId}`}>
                                            <div className="tit">
                                                <i className="material-icons md-12 dark">visibility</i>
                                            </div>
                                        </Link>
                                        <a href={data.url} target="_blank">
                                            <div className="tit">
                                                <i className="material-icons md-12 dark">link</i> CMS
                                            </div>
                                        </a>
                                        
                                    </div>
                                </div>
                            </div>
                            <div className="Issue-detail">
                                <ul className="Issue-info">
                                    <li className="info-name">{data.name}</li>
                                    <li className="info-id">{data.siteId}</li>
                                </ul>
                                
                            </div>
                    </li> 
                );
        })}

            </ul>
        );
    }
    
};