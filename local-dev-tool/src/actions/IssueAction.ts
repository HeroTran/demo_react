import * as types from './types';
import * as api from '../api/cms';
import * as handleMethod from '../utility/handleMethod';


export function showInfoIssue(params) {
    return (dispatch, getState) => {
        var promise = api.getInfoIssues(params.siteId, params.issueId);
        dispatch(getListSiteRequest("waiting fecth for Issue..."));
        return promise.then((result) => {
            dispatch(getListSiteSuccess(result, true));
        })
        .catch(e => {
            dispatch(getListSiteFailed("Failed fecth for Issue...."))
        })
    }
}

export function getListSiteSuccess(issue, isLoadding) {
    return {
        type: types.FETCH_DATA_SUCCCESS_ISSUE,
        payload: {
            issue: issue,
            isLoadding: isLoadding
        }
    };
}

export function getListSiteRequest(isRequest) {
    return {
        type: types.FETCH_DATA_REQUESTED_ISSUE,
        payload: isRequest
    };
}

export function getListSiteFailed(isFailed) {
    return {
        type: types.FETCH_DATA_FAILED_ISSUE,
        payload: isFailed
    };
}

export function getListConfig(params){
    var designPack = handleMethod.getDesignPack(params);
    return (dispatch, getState) => {
        var promise = api.getInfoConfig(designPack);
        dispatch(getInfoConfigRequest("waiting fecth for Info Config..."));
        return promise.then((result) => {
            dispatch(getInfoConfigSuccess(handleMethod.xmlToArray(result),designPack));
        })
        .catch(e => {
            dispatch(getListSiteFailed("Failed fecth for Info Config...."))
        })
    }
}




export function getInfoConfigSuccess(result, designPack) {
    return {
        type: types.FETCH_INFO_CONFIG_SUCCESS,
        payload: {
            result: result,
            designPack: designPack
        }
    };
}

export function getInfoConfigRequest(isRequest) {
    return {
        type: types.FETCH_INFO_CONFIG_REQUEST,
        payload: isRequest
    };
}

export function getInfoConfigFailed(isFailed) {
    return {
        type: types.FETCH_INFO_CONFIG_FAILED,
        payload: isFailed
    };
}

export function changeTemplate(nameLayout){
    return {
        type:types.CHANGE_LAYOUT,
        payload:nameLayout
    }
}


export const searchStory = (searchName) => {
    return {
        type: types.SEARCH_STORY,
        payload: searchName
    }
}

export const changeFlatForm = (orientation, issueTitle) => {
    return {
        type: types.BUTTON_CHANGE_FLATFORM,
        payload: {
            orientation: orientation,
            issueTitle: issueTitle
        }
    }
}

export const changeMode = (isMode) => {
    return {
        type: types.BUTTON_CHANGE_MODE,
        payload: isMode
    }
}

export const changeFontSize = (isSize) => {
    return {
        type: types.BUTTON_CHANGE_SIZE,
        payload: isSize
    }
}

export const changeScreenDevice = (isScreen, isValue) => {
    return {
        type: types.BUTTON_CHANGE_WIDTH,
        payload: {
            isScreen: isScreen,
            isValue: isValue

        }
    }
}


export const zoomFrame = (isZoom) => {
    return {
        type: types.ZOOM_FRAME,
        payload: isZoom
    }
}

export const changeLoadding = (isLoadding) => {
    return {
        type: types.CHANGE_LOADDING,
        payload: isLoadding
    }
}

export const changeSwipe = (currentPage) =>{
    return {
        type: types.CHANGE_SWIPE,
        payload: currentPage
    }
}

export const changeIFrame = (isURL, params, designPack, tocID, storyID, layout, orientation, mode, fontSize, navigate, isScreenFlatFrom, platform, issueTitle, layoutTiwg) => {
    return {
        type: types.CHANGE_URL_IFRAME,
        payload: {
            isURL: isURL,
            params: params,
            designPack: designPack,
            tocID: tocID,
            storyID: storyID,
            layout: layout,
            orientation: orientation,
            mode: mode,
            fontSize: fontSize,
            navigate: navigate,
            isScreenFlatFrom: isScreenFlatFrom,
            platform: platform,
            issueTitle: issueTitle,
            layoutTiwg:layoutTiwg
        }
    }
}
