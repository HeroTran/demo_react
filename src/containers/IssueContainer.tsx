import * as React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router';
import * as issueAction from '../actions/issueAction';
import Issue from '../components/Issue/Issue';
import ButtonIssue from '../components/Helpers/ButtonIssue/ButtonIssue';



interface Props {
    showInfoIssue?:Function;
    infoIssue?:StateIssue.infoIssue[];
    params?:object;
    searchStory?:Function;
    changeFlatForm?:Function;
    changeMode?:Function;
    changeSize?:Function;
    isScreenFlatFrom?:object;
    changeScreenDevice?:Function;
    isZoom:string;
    zoomFrame?:Function;
    isFlatform?:string;
    
}


class SiteContainer extends React.Component<Props, {}> {
    componentDidMount() {
        this.props.showInfoIssue(this.props.params);
    }
    
    
    render() {
        const{infoIssue , params, searchStory,changeFlatForm} = this.props;
        return (
                 <div  className="Main-Issue">
                    <div id="page-wrapper">
                        <div  className="container">
                            <Issue params={this.props.params} infoIssue={this.props.infoIssue}
                            searchStory={this.props.searchStory}/>
                            <ButtonIssue  changeFlatForm={this.props.changeFlatForm}
                            isScreenFlatFrom={this.props.isScreenFlatFrom}
                            changeScreenDevice = {this.props.changeScreenDevice}
                            isZoom={this.props.isZoom}
                            zoomFrame={this.props.zoomFrame}
                            isFlatform={this.props.isFlatform}
                            />
                        </div>
                    </div>
                </div>
               
            
        );
    }
}

const mapStateToProps = state =>  {
    return {
        infoIssue: state.IssueReducer.Issue,
        isScreenFlatFrom:state.IssueReducer.isScreenFlatFrom,
        isZoom:state.IssueReducer.isZoom,
        isFlatform:state.IssueReducer.isFlatform,
        
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        showInfoIssue:(params) => dispatch(issueAction.showInfoIssue(params)),
        searchStory:(searchName)=>dispatch(issueAction.searchStory(searchName)),
        changeFlatForm:(isFlatForm)=>dispatch(issueAction.changeFlatForm(isFlatForm)),
        changeMode:(isMode)=>dispatch(issueAction.changeMode(isMode)),
        changeSize:(isSize)=>dispatch(issueAction.changeSize(isSize)),
        changeScreenDevice:(isScreen,isValue)=>dispatch(issueAction.changeScreenDevice(isScreen,isValue)),
        zoomFrame:(isZoom)=>dispatch(issueAction.zoomFrame(isZoom)),
    }
}


const ConnectIssueContainer = connect(
    mapStateToProps, 
    mapDispatchToProps
)(SiteContainer)


export default ConnectIssueContainer;