import * as React from 'react';
import * as cx from 'classnames';
import './Pannel.scss'

interface props{
    showTab?:Function
    isShowTab?:String
}
interface stateInfo{
}


export default class Pannel extends React.Component<props, stateInfo> {
 constructor(props:props){
        super(props);
  }
  handleShowTab = (isShow,event) =>{
    var ul  = event.target.parentElement;
    ul.querySelector(".active-pannel").classList.remove("active-pannel");
    event.target.className += " active-pannel";
    this.props.showTab(isShow);
  }

  componentWillUnmount(){
    this.props.showTab("ALL");
  }
  
  
  render() {
    const{showTab,isShowTab} = this.props;
    const siteDown = cx({
        'active-pannel': isShowTab === "downloaded",
    });
    return (
        <div className="Pannel">
            <ul id="tab">
              <li className="active-pannel li-pannel" id="ALL" onClick={this.handleShowTab.bind(this,"ALL")}>Issue</li>
              <li className="li-pannel" id="DOWNLOADED" onClick={this.handleShowTab.bind(this,"DOWNLOADED")}>My Library</li>
            </ul>
        </div>
    );
  }
}

