import * as React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router';
import Magazine from '../components/Magazine/Magazine';
import Modal from '../components/Helpers/Modal/Modal';
import * as homeAction from '../actions/homeAction';
import * as cx from 'classnames';



interface Props {
    magazines?: State.InfoMagazine[];
    infoConfig?: State.InfoConfig;
    isShow?:boolean,
    isError?:string,
    showListSite?: Function;
    showModal?: Function;
    closeModal?:Function;
    onChangeInput?:Function;
    submitConfig?:Function;
    deleteSite?:Function;
    isLoadding?:boolean;
    changeLoadding?:Function;
    handleSearchSite?:Function;
    searchSite?:Function;
}


class HomeContainer extends React.Component<Props, {}> {
    componentDidMount() {
        this.props.showListSite();
    }
    
    componentWillUnmount(){
        this.props.changeLoadding(false);
    }
    
    clickShowModal = (event) => {
        event.preventDefault();
        this.props.showModal(true);
    }
    handleSearchSite = (event) =>{
        const check = !/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(event.target.value.trim());
        if(check){
            let searchName = event.target.value.trim();
            this.props.searchSite(searchName);
        }else{
            event.target.value = "";
        }
    }
    render() {
        const{deleteSite,isLoadding} = this.props;
        const loadding = cx({
                'remove-load': isLoadding === true,
                'open-load': isLoadding === false
            });
        console.log("bbb");
        return (
             <div className="Main-Issue">
                 <div className={cx(['loader-wrapper', loadding])}>
                    <div className="loader">
                    </div>
                 </div>
                 
                 <div  className="Main-Section">
                    <ul className="Section">
                        <li className="Section-group">
                            <div className="Group-header">
                                <h2 className="Group-Title">List Site Magazine</h2>
                                
                                <div className="search-site">
                                    <input type="text" onChange={(event)=>this.handleSearchSite(event)}   className="button-searchInput form-control" placeholder="Search for Site..." />
                                </div>
                            </div>

                            <Magazine siteMagazine={this.props.magazines} deleteSite={this.props.deleteSite}/>
                        </li>
                    </ul>
                </div>
                <Modal isShow = {this.props.isShow} closeModal={this.props.closeModal}
                    submitConfig ={this.props.submitConfig} infoConfig={this.props.infoConfig}
                    isError={this.props.isError} onChangeInput={this.props.onChangeInput}
                />
             </div>
            
        );
    }
}

const mapStateToProps = state =>  {
    const siteMagazine: State.ListMagazine = state.HomeReducer;
    const searchRegex = siteMagazine.query ? new RegExp(siteMagazine.query, 'i') : null;
    var listSiteMagazine;
    if(siteMagazine.listMagazine != null){
            listSiteMagazine = siteMagazine.listMagazine.filter(site => {
            if(!searchRegex) return true;
            return searchRegex.test(site.siteId) || searchRegex.test(site.name);
        })
    }

    
    return {
        magazines: listSiteMagazine,
        infoConfig: state.HomeReducer.infoConfig,
        isShow: state.HomeReducer.isShow,
        isError:state.HomeReducer.isError,
        isLoadding:state.HomeReducer.isLoadding,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        showListSite: () => dispatch(homeAction.showListSite()),
        showModal: (isShow) => dispatch(homeAction.showModal(isShow)),
        closeModal: (isHide) => dispatch(homeAction.closeModal(isHide)),
        onChangeInput: (propertyName,value) => dispatch(homeAction.onChangeInput(propertyName,value)),
        submitConfig: (infoForm) => dispatch(homeAction.submitConfig(infoForm)),
        deleteSite:(siteId)=> dispatch(homeAction.deleteSite(siteId)),
        changeLoadding:(isLoadding)=> dispatch(homeAction.changeLoadding(isLoadding)),
        searchSite:(isName) =>dispatch(homeAction.searchSite(isName)),
    }
}


const ConnectHomeContainer = connect(
    mapStateToProps, 
    mapDispatchToProps
)(HomeContainer)


export default ConnectHomeContainer;