import * as React from 'react';
import * as cx from 'classnames';
import './ButtonIssue.scss'

interface props{
    changeFlatForm?:Function;
    onClick?:Function;
    changeMode?:Function;
    ChangeSize?:Function;
    isScreenFlatFrom?:object;
    changeScreenDevice?:Function;
    isZoom:string;
    zoomFrame?:Function;
    isFlatform?:string;
}
interface stateInfo{
}


export default class ButtonIssue extends React.Component<props, stateInfo> {
 constructor(props:props){
        super(props);
        
  }
  componentWillUpdate(nextProps,nextState){
    document.getElementById("ul-flatform").querySelector(".active").classList.remove("active");
    document.getElementById(nextProps.isFlatform).className += " active";
  }
  componentDidUpdate(prevProps,prevState){
    console.log(prevProps);
  }
  
  onHandleChangeFlatForm = (isFlatFrom,event) =>{
    document.getElementById("ul-flatform").querySelector(".active").classList.remove("active");
    if(isFlatFrom == "Landscap"){
      document.getElementById("Landscap").className += " active";
    }else if(isFlatFrom == "Portrait"){
      document.getElementById("Portrait").className += " active";
    }
    else{
      document.getElementById("Mobile").className += " active";
    }
    this.props.changeFlatForm(isFlatFrom);
  }
  onHandleChangeMode = (isMode,event) =>{
    document.getElementById("ul-mode").querySelector(".active").classList.remove("active");
    if(isMode == "Light"){
      document.getElementById("Light").className += " active";
    }else if(isMode == "Dark"){
      document.getElementById("Dark").className += " active";
    }
  }

  onHandleChangeSize = (isSize) =>{
    document.getElementById("ul-size").querySelector(".active").classList.remove("active");
    if(isSize == "Small"){
      document.getElementById("Small").className += " active";
    }else if(isSize == "Medium"){
      document.getElementById("Medium").className += " active";
    }
    else{
      document.getElementById("Large").className += " active";
    }
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
  render() {
    const{changeFlatForm,isScreenFlatFrom} = this.props;
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
          <div className="nav-button navbar navbar-default">
              <ul className="flatform-issue btn-feature" id="ul-flatform">
                <li className="active tooltip-issue" id="Landscap" title="Landscap" onClick={this.onHandleChangeFlatForm.bind(this,"Landscap")}><i className="material-icons md-12 dark">tablet</i></li>
                <li className="tooltip-issue" id="Portrait" title="Portrait" onClick={this.onHandleChangeFlatForm.bind(this,"Portrait")}><i className="material-icons md-12 dark">stay_current_portrait</i></li>
                <li className="tooltip-issue" id="Mobile" title="Mobile"  onClick={this.onHandleChangeFlatForm.bind(this,"Mobile")}><i className="material-icons md-12 dark">phone_iphone</i></li>
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
              <ul className="change-direction btn-feature">
                <li><i className="material-icons md-12 dark">skip_previous</i></li>
                <li><i className="material-icons md-12 dark">skip_next</i></li>
                <li><span>Scroll</span></li>
              </ul>
              <ul className="change-cache btn-feature">
                <li><span>Use Cache</span></li>
                <li><span>Use Log</span></li>
              </ul>
              <ul className="change-review change-cache btn-feature">
                <li><span>Preview</span></li>
                <li><span>RSS</span></li>
              </ul>
              <ul className="change-auto btn-feature">
                <select className="form-control">
                  <option value="1">Auto</option>
                  <option value="2">Dafault</option>
                  <option value="3">FullScreen</option>
                </select>
              </ul>
              <ul className="change-width change-screen">
                <li><input type="text" onChange={this.handleZoom.bind(this)} value={this.props.isZoom} className="form-control tooltip-issue" id="Zoom" title="Zoom"  />
                </li>
              </ul>
          </div>
          <div className="issue-iframe">
            <iframe src="https://facebook.github.io/react/" style={divStyle}></iframe>
          </div>
        </div>
    );
  }
}

