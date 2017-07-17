import * as types from './types';
import * as api from '../api/cms';
import * as handleJson from '../utility/handleJson';

export function showAllIssue(params) {
    return (dispatch, getState) => {
        var promise = api.getIssues(params.id);
        dispatch(getListSiteRequest("waiting fecth for Site..."));
        return promise.then((result) => {
            dispatch(getListSiteSuccess(result,true));
        })
            .catch(e => {
                dispatch(getListSiteFailed("Failed fecth for Site...."))
            })
    }
}

export function getListSiteSuccess(issueList,isLoadding) {
    return {
        type: types.FETCH_DATA_SUCCCESS_SITE,
        payload:{
            issueList:issueList,
            isLoadding:isLoadding
        }
    };
}

export function getListSiteRequest(isRequest) {
    return {
        type: types.FETCH_DATA_REQUESTED_SITE,
        payload: isRequest
    };
}

export function getListSiteFailed(isFailed) {
    return {
        type: types.FETCH_DATA_FAILED_SITE,
        payload: isFailed
    };
}





/**
 * 
 * Show tab 2 option:download and not yet download
 */
export const  showTab = (isShow) => {
    return {
        type:types.SHOW_TAB,
        payload:isShow
    }
}




/**
 * 
 * event click button show with tab mobile,table,reload page
 */
export const  showFlatFrom = (isFlatForm) => {
    return {
        type:types.SHOW_FLAT_FORM,
        payload: isFlatForm
    }
}



export const  reloadPage = (isReload) => {
    return {
        type:types.SHOW_RELOAD_PAGE,
        payload: isReload
    }
}

/**
 * 
 * All event on magazine
 */

export function downLoadIssue(isDowload,siteId,issueId,idx) {
    return (dispatch, getState) => {
        var promise = api.downloadIssue(siteId,issueId);
        dispatch(downLoadRequest("waiting downloading..."));
        return promise.then((result) => {
            dispatch(downLoadSuccess(result,true,idx));
        })
        .catch(e => {
            dispatch(downLoadFailed("Failed download...."))
        })
    }
}

export const  downLoadSuccess = (result,isDowload,idx) => {
    return {
        type:types.DOWNLOAD_SUCCESS,
        payload:{
            result:result,
            isDowload:isDowload,
            idx:idx
        }
    }
}

export const  downLoadRequest = (isDowload) => {
    return {
        type:types.DOWNLOAD_REQUEST,
        payload:isDowload
    }
}

export const  downLoadFailed = (isDowload) => {
    return {
        type:types.DOWNLOAD_FAILED,
        payload:isDowload
    }
}




export const  eventView = (isView) => {
    return {
        type:types.EVENT_VIEW,
        payload: isView
    }
}


export function deleteIssue(isDowload,siteId,issueId,idx) {
    return (dispatch, getState) => {
        var promise = api.deleteIssue(siteId,issueId);
        dispatch(deleteRequest("waiting delete..."));
        return promise.then((result) => {
            dispatch(deleteSuccess(result,false,idx));
        })
            .catch(e => {
                dispatch(deleteFailed("Failed delete...."))
            })
    }
}

export const  deleteSuccess = (result,isDowload,idx) => {
    return {
        type:types.DELETED_ISSUE_SUCCESS,
        payload:{
            result:result,
            isDowload:isDowload,
            idx:idx
        }
    }
}

export const  deleteRequest = (isDelete) => {
    return {
        type:types.DELETED_ISSUE_REQUEST,
        payload:isDelete
    }
}

export const  deleteFailed = (isDelete) => {
    return {
        type:types.DELETED_ISSUE_FAILED,
        payload:isDelete
    }
}



export const  eventConfig = (isConfig,idx,idx_child) => {
    return {
        type:types.EVENT_CONFIG,
        payload:{
            isConfig:isConfig,
            idx:idx,
            idx_child:idx_child
        }
    }
}

export const  eventOpenModal = (idx) => {
    return {
        type:types.OPEN_MODAL,
        payload: idx
    }
}

export const  eventCloseModal = (idx) => {
    return {
        type:types.CLOSE_MODAL_CONFIG,
        payload: idx
    }
}


/**
 * Seach
 */
export const searchIssue = (name,siteId)=>{
    return {
        type:types.SEARCH_ISSUE,
        payload: {
            name:name,
            siteId:siteId
        }
    }
}

export const changeLoadding = (isLoadding)=>{
    return {
        type: types.CHANGE_LOADDING,
        payload:isLoadding
    }
}