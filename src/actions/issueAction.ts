import * as types from './types';
import * as api from '../api/cms';



export function showInfoIssue(params) {
    return (dispatch, getState) => {
        var promise = api.getInfoIssues(params.siteId,params.issueId);
        dispatch(getListSiteRequest("waiting..."));
        return promise.then((result) => {
            dispatch(getListSiteSuccess(result,true));
        })
            .catch(e => {
                dispatch(getListSiteFailed("Failed...."))
            })
    }
}

export function getListSiteSuccess(issue,isLoadding) {
    return {
        type: types.FETCH_DATA_SUCCCESS,
        payload:{
            issueList:issue,
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




export const searchStory = (searchName)=> {
    return {
        type:types.SEARCH_STORY,
        payload:searchName
    }
}

export const changeFlatForm = (isNameFR)=> {
    return {
        type:types.BUTTON_CHANGE_FLATFORM,
        payload:isNameFR
    }
}

export const changeMode = (isMode)=> {
    return {
        type:types.BUTTON_CHANGE_MODE,
        payload:isMode
    }
}

export const changeSize = (isSize)=> {
    return {
        type:types.BUTTON_CHANGE_SIZE,
        payload:isSize
    }
}

export const changeScreenDevice = (isScreen,isValue) =>{
    return {
        type:types.BUTTON_CHANGE_WIDTH,
        payload:{
            isScreen:isScreen,
            isValue:isValue

        }
    }
}

export const zoomFrame = (isZoom) =>{
    return {
        type:types.ZOOM_FRAME,
        payload:isZoom
    }
}