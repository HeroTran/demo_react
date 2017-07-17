import * as React from 'react';
import * as cx from 'classnames';
import * as handleMethod from '../../../utility/handleMethod'; 
import './ButtonIssue.scss'

  

interface props{
    changeFlatForm?:Function;
    onClick?:Function;
    changeMode?:Function;
    changeFontSize?:Function;
    isScreenFlatFrom?:object;
    changeTemplate?:Function;
    changeScreenDevice?:Function;
    isZoom:string;
    zoomFrame?:Function;
    platform?:string;
    changeIFrame?:Function;
    url:string;
    orientation?:string;
    params?:object;
    designPack?:string;
    listFileTwig,
    currentPage:number,
    changeSwipe?:Function,
    layout:string
}
interface stateInfo{
}
interface Window { logged_user: Object }

export default class ButtonIssue extends React.Component<props, stateInfo> {
 constructor(props:props){
        super(props);
        
  }
  componentWillUpdate(nextProps,nextState){
    if(document.getElementById("ul-flatform") != null){
      document.getElementById("ul-flatform").querySelector(".active").classList.remove("active");
      document.getElementById(nextProps.orientation).className += " active";
    }
  }
  
  
  onHandleChangeFlatForm = (orientation,event) =>{
    console.log(event);
    event.preventDefault();
    document.getElementById("ul-flatform").querySelector(".active").classList.remove("active");
    if(orientation == "landscape"){
      document.getElementById("landscape").className += " active";
    }else if(orientation == "portrait"){
      document.getElementById("portrait").className += " active";
    }
    else{
      document.getElementById("mobile").className += " active";
    }
    var issueTitle = this.props.url.split("issueTitle=")[1];
    this.props.changeFlatForm(orientation,issueTitle);
  }
  onHandleChangeMode = (isMode,event) =>{
    var mode;
    document.getElementById("ul-mode").querySelector(".active").classList.remove("active");
    if(isMode == "Light"){
      mode = "0";
      document.getElementById("Light").className += " active";
    }else if(isMode == "Dark"){
      mode = "1";
      document.getElementById("Dark").className += " active";
    }
    this.props.changeMode(mode);
  }

  onHandleChangeSize = (isSize) =>{
    var fontSize;
    document.getElementById("ul-size").querySelector(".active").classList.remove("active");
    if(isSize == "Small"){
      fontSize= "0";
      document.getElementById("Small").className += " active";
    }else if(isSize == "Medium"){
      fontSize= "1";
      document.getElementById("Medium").className += " active";
    }
    else{
      fontSize= "2";
      document.getElementById("Large").className += " active";
    }
    this.props.changeFontSize(fontSize);
  }

  handleChangeInput = (isScreen,event) =>{
    var check  = /^[0-9]+$/.test(event.target.value)
    if(check){
      event.target.value = event.target.value;
      this.props.changeScreenDevice(isScreen,parseInt(event.target.value));
    }
    
  }

  handleZoom = (event) =>{
    var check  = /^[0-9]+$/.test(event.target.value)
    if(check && parseInt(event.target.value) <= 150){
      this.props.zoomFrame(event.target.value);
    }
  }
  handleChangeTemplate = (event) =>{
    console.log(event.target.value);
    this.props.changeTemplate(event.target.value);
  }
  
  onHandleSwipe = (currentPage,isSwipe,width,event)=>{
    var totalPage = document.querySelector("iframe").contentWindow['getTotalPage']();
    if(isSwipe == "Prev"){
      currentPage = currentPage > 0 ? currentPage - 1 : currentPage;
    }else{
      currentPage = currentPage < totalPage - 1 ? currentPage + 1 : currentPage;
    }
    if(totalPage >=2 ){
      this.props.changeSwipe(currentPage);
      handleMethod.scroolIFrame(currentPage,width);
    }
  }
  render() {
    const{changeFlatForm,isScreenFlatFrom,changeTemplate,url,changeIFrame,params,changeMode,listFileTwig,currentPage} = this.props;
    var isZoom = parseInt(this.props.isZoom) / 100;
    var value = parseInt(this.props.isZoom) - 100 >= 0 ? (parseInt(this.props.isZoom) - 100) * 4 : (parseInt(this.props.isZoom) - 100) * 2.5; 
    const divStyle = {
      width: this.props.isScreenFlatFrom['width'] + "px",
      height: this.props.isScreenFlatFrom["height"] + "px",
      position:"relative",
      top:`${value}px`,
      transform: `scale(${isZoom})`
    };
    
    return (
        <div className="iframe-content row wrap-feature isOpenFrame" id="wrap-frame" >
          {url !="" && <div className="nav-button navbar navbar-default">
              <ul className="flatform-issue btn-feature" id="ul-flatform">
                <li onClick={this.onHandleChangeFlatForm.bind(this,"landscape")} className="active tooltip-issue" id="landscape" title="landscape"><i className="material-icons md-12 dark">tablet</i></li>
                <li onClick={this.onHandleChangeFlatForm.bind(this,"portrait")} className="tooltip-issue" id="portrait" title="portrait" ><i className="material-icons md-12 dark">stay_current_portrait</i></li>
                <li onClick={this.onHandleChangeFlatForm.bind(this,"mobile")} className="tooltip-issue" id="mobile" title="mobile"  ><i className="material-icons md-12 dark">phone_iphone</i></li>
              </ul>
              <ul className="change-width">
                <li><input type="text" value={isScreenFlatFrom['width']} onChange={this.handleChangeInput.bind(this,"width")} className="form-control" /></li>
                <li><input type="text" value={isScreenFlatFrom['height']} onChange={this.handleChangeInput.bind(this,"height")} className="form-control" /></li>
              </ul>
              <ul className="change-light btn-feature" id="ul-mode">
                <li className="active tooltip-issue" id="Light" title="Mode Light" onClick={this.onHandleChangeMode.bind(this,"Light")}><i className="material-icons md-12 dark">wb_sunny</i></li>
                <li className="tooltip-issue" id="Dark" title="Mode Dark" onClick={this.onHandleChangeMode.bind(this,"Dark")}><i className="material-icons md-12 dark">brightness_2</i></li>
              </ul>
              <ul className="change-size btn-feature" id="ul-size">
                <li className="active tooltip-issue" id="Small" onClick={this.onHandleChangeSize.bind(this,"Small")} title="Font Small"><span>S</span></li>
                <li className="tooltip-issue" id="Medium" onClick={this.onHandleChangeSize.bind(this,"Medium")} title="Font Medium"><span>M</span></li>
                <li className="tooltip-issue" id="Large" onClick={this.onHandleChangeSize.bind(this,"Large")} title="Font Large"><span>L</span></li>
              </ul>
              <ul className="change-direction btn-feature" id="ul-swipe">
                <li className="tooltip-issue" id="Prev" onClick={this.onHandleSwipe.bind(this,currentPage,"Prev",this.props.isScreenFlatFrom['width'])} title="Prev for Swipe"><i className="material-icons md-12 dark">skip_previous</i></li>
                <li className="tooltip-issue" id="Next" onClick={this.onHandleSwipe.bind(this,currentPage,"Next",this.props.isScreenFlatFrom['width'])} title="Next for Swipe"><i className="material-icons md-12 dark">skip_next</i></li>
              </ul>
              {/*<ul className="change-cache btn-feature">
                <li><span>Use Cache</span></li>
                <li><span>Use Log</span></li>
              </ul>
              <ul className="change-review change-cache btn-feature">
                <li><span>Preview</span></li>
                <li><span>RSS</span></li>
              </ul>
              */}
              {listFileTwig.length > 0 && <ul className="change-auto btn-feature">
                <select  onChange={(event) => this.handleChangeTemplate(event)}   className="form-control" >
                    {listFileTwig.map((tl, idx) => {
                        return(
                          <option selected={tl == this.props.layout}   key={idx} value={tl}>{tl}</option>
                        );
                    })}
                </select>

              </ul>}
              <ul className="change-width change-screen">
                <li><input type="text" onChange={this.handleZoom.bind(this)} value={this.props.isZoom} className="form-control tooltip-issue" id="Zoom" title="Zoom"  />
                </li>
              </ul>
          </div>}

          {url !="" && <div className="issue-iframe">
            <iframe src={url} style={divStyle}></iframe>
          </div>}
        </div>
    );
  }
}

