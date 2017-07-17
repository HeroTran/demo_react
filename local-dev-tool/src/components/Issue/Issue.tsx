import * as React from 'react'
import {Link} from 'react-router'
import './Issue.scss'
import * as handleMethod from '../../utility/handleMethod'; 
var path = require('path');
interface props {
    infoIssue;
    params: object;
    searchStory?:Function;
    platform?:string;
    isScreenFlatFrom?:object;
    mode:string,
    fontSize:string,
    navigate:string,
    changeIFrame?:Function;
    orientation?:string;
    designPack?:string;
    layout:string;
    
}
 

export default class Issue extends React.Component<props,any>{
    constructor(props:props){
        super(props);
    }
    
    handleOpenNav = () =>{
        if(document.getElementById("btn-sidebar").className.indexOf("close-btn") != -1){
            document.getElementById("btn-sidebar").classList.remove("close-btn");
            document.getElementById("btn-sidebar").className += " open-btn";
            document.getElementById("nav-issue").className += " open-nav";
            document.getElementById("wrap-frame").className += " isOpenFrame";
        }
        else{
            document.getElementById("btn-sidebar").className += " close-btn";
            document.getElementById("btn-sidebar").classList.remove("open-btn");
            document.getElementById("nav-issue").classList.remove("open-nav");
            document.getElementById("wrap-frame").classList.remove("isOpenFrame");
        }
    }
    handleSearchStory = (event) =>{
        console.log(event.target.value);
        const check = !/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(event.target.value.trim());
        if(check){
            let searchName = event.target.value.trim();
            this.props.searchStory(searchName);
        }else{
            event.target.value = "";
        }
        
    }
    handleActiveStory = (event,params,designPack,tocID,storyID,layout,orientation,mode,fontSize,navigate,isScreenFlatFrom,platform,issueTitle,layoutTiwg)=>{
        event.preventDefault();
        var parent = event.target.parentElement.parentElement;
        if(parent.classList.value.indexOf("Each-story") != -1){
            var current = parent.parentElement.parentElement.querySelectorAll(".Each-story.active");
            if(current.length > 0){
                current[0].classList.remove("active");
            }
            parent.className += " active";
        }
        //todo get layout with custom template
        var url="";
        this.props.changeIFrame(url,params,designPack,tocID,storyID,layout,orientation,mode,fontSize,navigate,isScreenFlatFrom,platform,issueTitle,layoutTiwg);

    }
    render(){
        const {infoIssue,params,platform,mode,fontSize,isScreenFlatFrom,navigate,orientation,designPack,layout} = this.props;
        return(
            <div className="wrap-nav">
                <div className="Button-Sidebar issue-content navbar navbar-default navbar-fixed-top">
                    <button onClick={() => this.handleOpenNav()} type="button" id="btn-sidebar" className="navbar-toggle open-btn">
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                </div>
                <div id="nav-issue" className="open-nav nav-issue navmenu navmenu-default navmenu-fixed-left">
                    <h2>List Story</h2>
                    <Link title="come back to sites" className="replay" to={'/sites/'+this.props.params['siteId'] }><i className="material-icons">reply_all</i></Link>
                    <div className="container-fluid">
                        <div className="Issue-search">
                            <input onChange={(event)=>this.handleSearchStory(event)} type="text" className="form-control" placeholder="Search..." />
                        </div>
                        <div className="Issue-story">
                                    <div className="parent-Each" key={0}>
                                       {infoIssue!= undefined && infoIssue.map((sections, idx) => {
                                            const tocID = sections.id;
                                            return(
                                                <div className="" key={idx}>
                                                        {sections.stories!= undefined && sections.stories.map((story, i) => {
                                                            const storyID = story.id;
                                                            const issueTitle = story.title;
                                                            const layoutTiwg = story.layout;
                                                            return(
                                                                    <div className="Each-story" key={i}  >
                                                                        <div className="col-md-5 Story-image">
                                                                            <img src={story.thumbnail}  />
                                                                        </div>
                                                                        <div className="col-md-7 Story-Content">
                                                                            <a href="#"  onClick={(event)=>this.handleActiveStory(event,params,designPack,tocID,storyID,layout,orientation,mode,fontSize,navigate,isScreenFlatFrom,platform,issueTitle,layoutTiwg)}>
                                                                                {sections.section_name} {story.title}
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                            );
                                                        })}
                                                </div>
                                            );
                                        })}
                                    </div>
                            
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}