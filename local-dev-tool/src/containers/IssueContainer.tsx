import * as React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router';
import * as issueAction from '../actions/IssueAction';
import Issue from '../components/Issue/Issue';
import ButtonIssue from '../components/Helpers/ButtonIssue/ButtonIssue';
import * as cx from 'classnames';
import * as handleMethod from '../utility/handleMethod'; 

interface Props {
    showInfoIssue?:Function;
    infoIssue?:StateIssue.infoIssue[];
    searchStory?:Function;
    changeFlatForm?:Function;
    changeMode?:Function;
    changeFontSize?:Function;
    changeScreenDevice?:Function;
    getListConfig?:Function;
    changeTemplate?:Function;
    zoomFrame?:Function;
    changeLoadding?:Function;
    changeIFrame?:Function;
    isZoom:string;
    params?:object;
    platform?:string;
    isScreenFlatFrom?:object;
    mode:string,
    fontSize:string,
    navigate:string
    isLoadding?:boolean;
    url?:string;
    orientation?:string;
    designPack?:string;
    listFileTwig,
    currentPage:number,
    changeSwipe?:Function,
    layout:string;
}


class SiteContainer extends React.Component<Props, {}> {
    componentDidMount() {
        this.props.showInfoIssue(this.props.params);
        this.props.getListConfig(this.props.params);
    }
    componentWillUnmount() {
        this.props.changeLoadding(false);
    }
    
    
    render() {
        const{infoIssue , params, searchStory,changeFlatForm,isLoadding} = this.props;
        const loadding = cx({
            'remove-load': isLoadding === true
        });
        return (

                 <div  className="Main-Issue">
                    <div className={cx(['loader-wrapper', loadding])}>
                        <div className="loader">
                            
                        </div>
                        <div className="loader-section section-left"></div>
                            <div className="loader-section section-right"></div>
                    </div>
                    <div id="page-wrapper">
                        <div  className="container">
                            <Issue params={this.props.params} infoIssue={this.props.infoIssue}
                            searchStory={this.props.searchStory}
                            platform={this.props.platform}
                            isScreenFlatFrom={this.props.isScreenFlatFrom}
                            mode={this.props.mode}
                            fontSize={this.props.fontSize}
                            navigate={this.props.navigate}
                            changeIFrame={this.props.changeIFrame}
                            orientation={this.props.orientation}
                            designPack={this.props.designPack}
                            layout={this.props.layout}

                            />
                            <ButtonIssue params={this.props.params}  
                            changeFlatForm={this.props.changeFlatForm}
                            isScreenFlatFrom={this.props.isScreenFlatFrom}
                            changeScreenDevice = {this.props.changeScreenDevice}
                            isZoom={this.props.isZoom}
                            zoomFrame={this.props.zoomFrame}
                            platform={this.props.platform}
                            changeIFrame={this.props.changeIFrame}
                            url={this.props.url}
                            orientation={this.props.orientation}
                            changeFontSize={this.props.changeFontSize}
                            changeMode={this.props.changeMode}
                            listFileTwig={this.props.listFileTwig}
                            changeTemplate={this.props.changeTemplate}
                            currentPage={this.props.currentPage}
                            changeSwipe={this.props.changeSwipe}
                            layout={this.props.layout}
                            />
                        </div>
                    </div>
                </div>
               
            
        );
    }
}

const mapStateToProps = state =>  {
    const issue: StateIssue.infoIssue = state.IssueReducer;
    const searchRegex = issue.query ? new RegExp(issue.query, 'i') : null;
    var infoIssue;
    if(issue.Issue != null){
            infoIssue = issue.Issue.filter(issue => {
            if(!searchRegex) return true;
            return searchRegex.test(issue.section_name);
        })
    }
    
    return {
        infoIssue: infoIssue,
        isZoom:state.IssueReducer.isZoom,
        isLoadding:state.IssueReducer.isLoadding,
        platform:state.IssueReducer.platform,
        orientation:state.IssueReducer.orientation,
        isScreenFlatFrom:state.IssueReducer.isScreenFlatFrom,
        mode:state.IssueReducer.mode,
        fontSize:state.IssueReducer.fontSize,
        navigate:state.IssueReducer.navigate,
        url:state.IssueReducer.url,
        designPack:state.IssueReducer.designPack,
        listFileTwig:state.IssueReducer.listFileTwig,
        currentPage:state.IssueReducer.currentPage,
        layout:state.IssueReducer.layout


    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        showInfoIssue:(params) => dispatch(issueAction.showInfoIssue(params)),
        getListConfig:(params)=>dispatch(issueAction.getListConfig(params)),
        searchStory:(searchName)=>dispatch(issueAction.searchStory(searchName)),
        changeFlatForm:(orientation,issueTitle)=>dispatch(issueAction.changeFlatForm(orientation,issueTitle)),
        changeMode:(isMode)=>dispatch(issueAction.changeMode(isMode)),
        changeFontSize:(isSize)=>dispatch(issueAction.changeFontSize(isSize)),
        changeScreenDevice:(isScreen,isValue)=>dispatch(issueAction.changeScreenDevice(isScreen,isValue)),
        zoomFrame:(isZoom)=>dispatch(issueAction.zoomFrame(isZoom)),
        changeLoadding:(isLoadding)=>dispatch(issueAction.changeLoadding(isLoadding)),
        changeIFrame:(url,params,designPack,tocID,storyID,layout,orientation,mode,fontSize,navigate,isScreenFlatFrom,platform,issueTitle,layoutTwig)=>dispatch(issueAction.changeIFrame(url,params,designPack,tocID,storyID,layout,orientation,mode,fontSize,navigate,isScreenFlatFrom,platform,issueTitle,layoutTwig)),
        changeTemplate:(nameLayout) => dispatch(issueAction.changeTemplate(nameLayout)),
        changeSwipe:(currentpage) => dispatch(issueAction.changeSwipe(currentpage)),
    }
}


const ConnectIssueContainer = connect(
    mapStateToProps, 
    mapDispatchToProps
)(SiteContainer)


export default ConnectIssueContainer;