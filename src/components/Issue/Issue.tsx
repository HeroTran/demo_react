import * as React from 'react'
import {Link} from 'react-router'
import './Issue.scss'

interface props {
    infoIssue?:StateIssue.infoIssue[];
    params: object;
    searchStory?:Function;
    
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
    handleActiveStory = (event)=>{
        event.preventDefault();
        var parent = event.target.parentElement.parentElement;
        if(parent.classList.value.indexOf("Each-story") != -1){
            var current = parent.parentElement.parentElement.querySelectorAll(".Each-story.active");
            if(current.length > 0){
                current[0].classList.remove("active");
            }
            parent.className += " active";
        }
        console.log(event);
    }
    render(){
        const {infoIssue,params} = this.props;
        console.log(infoIssue);
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
                    <div className="container-fluid">
                        <div className="Issue-search">
                            <input onChange={(event)=>this.handleSearchStory(event)} type="text" className="form-control" placeholder="Search..." />
                        </div>
                        <div className="Issue-story">
                            {this.props.infoIssue.map((data,idx) => {
                                return(
                                    
                                    <div className="parent-Each" key={idx}>
                                        
                                        {/**
                                         * {data.stories.map((section,index) => {
                                            return (
                                                <div className="Each-story" key={index} >
                                                    <div className="col-md-5 Story-image">
                                                        <img src={section.image}  />
                                                    </div>
                                                    <div className="col-md-7 Story-Content">
                                                        <Link to="/" onClick={(event)=>this.handleActiveStory(event)}>
                                                            {data.name}{section.name}
                                                        </Link>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                         */}
                                        
                                    </div>
                                );
                            })}
                            
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}