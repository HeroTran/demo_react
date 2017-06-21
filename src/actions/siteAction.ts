import * as types from './types';
import * as api from '../api/cms';
import * as handleJson from '../utility/handleJson';

export function showAllIssue(params) {
    return (dispatch, getState) => {
        var promise = api.getIssues(params.id);
        dispatch(getListSiteRequest("waiting..."));
        return promise.then((result) => {
            dispatch(getListSiteSuccess(result,true));
        })
            .catch(e => {
                dispatch(getListSiteFailed("Failed...."))
            })
    }
}

export function getListSiteSuccess(issueList,isLoadding) {
    return {
        type: types.FETCH_DATA_SUCCCESS,
        payload:{
            issueList:issueList,
            isLoadding:isLoadding
        }
    };
}

export function getListSiteRequest(isRequest) {
    return {
        type: types.FETCH_DATA_REQUESTED,
        payload: isRequest
    };
}

export function getListSiteFailed(isFailed) {
    return {
        type: types.FETCH_DATA_FAILED,
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
export const  eventDownLoad = (isDown) => {
    return {
        type:types.EVENT_DOWNLOAD,
        payload: isDown
    }
}

export const  eventView = (isView) => {
    return {
        type:types.EVENT_VIEW,
        payload: isView
    }
}

export const  eventDeleted = (isDeleted,idx) => {
    return {
        type:types.EVENT_DELETE,
        payload:{
            isDeleted:isDeleted,
            idx:idx
        }
    }
}
export const  eventDownload = (isDowloaded,idx) => {
    return {
        type:types.EVENT_DOWNLOAD,
        payload: {
            isDowloaded:isDowloaded,
            idx:idx
        }
    }
}

export const  eventConfig = (isConfig) => {
    return {
        type:types.EVENT_CONFIG,
        payload: isConfig
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