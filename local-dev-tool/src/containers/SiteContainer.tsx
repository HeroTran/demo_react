import * as React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router';
import ButtonFlatFrom from '../components/Helpers/ButtonFlatFrom/ButtonFlatFrom';
import Pannel from '../components/Helpers/Pannel/Pannel';
import Site from '../components/Site/Site';
import * as siteAction from '../actions/SiteAction';
import * as cx from 'classnames';



interface Props {
    showAllIssue?: Function;
    listSite?: StateSite.InfoSite[];
    listConfig?: string[];
    showTab?: Function;
    showFlatFrom?: Function;
    isShowTab?: String;
    isflatForm?: boolean;
    downLoadIssue?: Function;
    deleteIssue?: Function;
    onClick?: Function;
    eventOpenModal?: Function;
    eventCloseModal?: Function;
    params?: object;
    searchIssue?: Function;
    isLoadding?: boolean;
    changeLoadding?: Function;
    eventConfig?: Function;

}


class SiteContainer extends React.Component<Props, {}> {
    componentDidMount() {
        this.props.showAllIssue(this.props.params);
    }

    componentWillUnmount() {
        this.props.changeLoadding(false);
    }
    render() {
        const { isLoadding } = this.props;
        let flatFrom = this.props.isflatForm ? "Tablet" : "Mobile";
        const loadding = cx({
            'remove-load': isLoadding === true
        });
        return (
            <div>
                <div className={cx(['loader-wrapper', loadding])}>
                    <div className="loader">

                    </div>
                    <div className="loader-section section-left"></div>
                    <div className="loader-section section-right"></div>
                </div>
                <div className="Main-Issue">
                    <div className="Main-Section">
                        <ul className="Section">
                            <li className="Section-group">
                                <div className="Group-header">
                                    <h2 className="Group-Title">List Issue Magazine {flatFrom}</h2>
                                </div>
                                <ButtonFlatFrom params={this.props.params} searchIssue={this.props.searchIssue} showFlatForm={this.props.showFlatFrom} />
                                <Pannel showTab={this.props.showTab} isShowTab={this.props.isShowTab} />
                                <Site listSite={this.props.listSite}
                                    listConfig={this.props.listConfig}
                                    downLoadIssue={this.props.downLoadIssue}
                                    deleteIssue={this.props.deleteIssue}
                                    eventOpenModal={this.props.eventOpenModal}
                                    eventCloseModal={this.props.eventCloseModal}
                                    params={this.props.params}
                                    eventConfig={this.props.eventConfig}
                                />


                            </li>
                        </ul>
                    </div>

                </div>
            </div>

        );
    }
}

const getListSites = (state) => {
    const siteReducer: StateSite.ListSiteMagazine = state.SiteReducer;
    const searchRegex = siteReducer.query ? new RegExp(siteReducer.query, 'i') : null;
    const isShowTab = siteReducer.isShowTab;
    const isDownload = isShowTab === "DOWNLOADED" ? true : false;
    var listSite;

    if (siteReducer.listInfoSite != null) {
        listSite = siteReducer.listInfoSite.filter(site => {
            let isValid = site.downloaded === isDownload;
            if (isShowTab == "ALL") { isValid = true }
            if (searchRegex) {
                isValid = isValid && (searchRegex.test(site.issue_name) || searchRegex.test(site.id));
            }
            return isValid;
        })
    }
    return listSite; 
}

const mapStateToProps = (state) => {
    const siteReducer: StateSite.ListSiteMagazine = state.SiteReducer;
    const searchRegex = siteReducer.query ? new RegExp(siteReducer.query, 'i') : null;
    const isShowTab = siteReducer.isShowTab;
    const isDownload = isShowTab === "DOWNLOADED" ? true : false;
   

    return {
        listSite: getListSites(state),
        listConfig: state.SiteReducer.listConfig,
        isShowTab: state.SiteReducer.isShowTab,
        isflatForm: state.SiteReducer.isflatForm,
        isLoadding: state.SiteReducer.isLoadding,
        


    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        showAllIssue: (siteId) => dispatch(siteAction.showAllIssue(siteId)),
        showTab: (isShowTab) => dispatch(siteAction.showTab(isShowTab)),
        showFlatFrom: (isCheck) => dispatch(siteAction.showFlatFrom(isCheck)),
        reloadPage: (isCheck) => dispatch(siteAction.reloadPage(isCheck)),
        downLoadIssue: (isDowload, siteId, issueId, idx) => dispatch(siteAction.downLoadIssue(isDowload, siteId, issueId, idx)),
        eventView: (isCheck) => dispatch(siteAction.eventView(isCheck)),
        deleteIssue: (isDowload, siteId, issueId, idx) => dispatch(siteAction.deleteIssue(isDowload, siteId, issueId, idx)),
        eventConfig: (isCheck, idx, idx_child) => dispatch(siteAction.eventConfig(isCheck, idx, idx_child)),
        eventOpenModal: (idx) => dispatch(siteAction.eventOpenModal(idx)),
        eventCloseModal: (idx) => dispatch(siteAction.eventCloseModal(idx)),
        searchIssue: (nameIssue, siteId) => dispatch(siteAction.searchIssue(nameIssue, siteId)),
        changeLoadding: (isLoadding) => dispatch(siteAction.changeLoadding(isLoadding)),
    }
}


const ConnectSiteContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SiteContainer)


export default ConnectSiteContainer;