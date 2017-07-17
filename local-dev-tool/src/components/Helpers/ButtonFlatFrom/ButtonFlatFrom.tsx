import * as React from 'react';
import * as cx from 'classnames';
import './ButtonFlatFrom.scss'

interface props{
    showFlatForm?:Function;
    searchIssue?:Function;
    params?:object;
    orientation?:string;
    
}
interface stateInfo{
}


export default class ButtonFlatFrom extends React.Component<props, stateInfo> {
 constructor(props:props){
        super(props);
  }
  
  handleShowFlatForm = (isFlatForm,event) => {
    var ul ;
    var li;
    if(event.target.classList.value.indexOf("material-icons") != -1){
      ul = event.target.parentElement.parentElement;
      li = event.target.parentElement;
    }else{
      ul  = event.target.parentElement;
      li = event.target;
    }
    ul.querySelector(".active").classList.remove("active");
    li.className += " active";
    this.props.showFlatForm(isFlatForm);
  }
  handleReloadPage = (event) =>{
     location.reload();
  }

  handleSearchIssue = (event,params) =>{
    console.log(event.target.value);
    const check = !/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(event.target.value.trim());
    if(check){
        let searchName = event.target.value.trim();
        this.props.searchIssue(searchName,params.id);
    }else{
        event.target.value = "";
    }
  }
  render() {
    const{showFlatForm,searchIssue,params} = this.props;
    
    return (
        <div className="wrap-button">
          <div className="left search-issue">
            <input type="text" onChange={(event)=>this.handleSearchIssue(event,this.props.params)}   className="button-searchInput form-control" placeholder="Search for Issue" />
          </div>
          <div className="right Flatform">
              <ul>
                <li className="active li-flatForm" onClick={this.handleShowFlatForm.bind(this,true)}><i className="material-icons md-12 dark">tablet_mac</i></li>
                <li className = "li-flatForm" onClick={this.handleShowFlatForm.bind(this,false)}><i className="material-icons md-12 dark">phone_iphone</i></li>
                <li onClick={this.handleReloadPage.bind(this)}><i className="material-icons md-12 dark">autorenew</i></li>
              </ul>
          </div>
        </div>
    );
  }
}

