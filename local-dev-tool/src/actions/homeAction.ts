import * as types from './types';
import * as api from '../api/cms';
import * as handleJson from '../utility/handleJson';
import * as handleMethod from '../utility/handleMethod'; 

export function showListSite() {
    return (dispatch, getState) => {
        var promise = api.getSites();
        dispatch(getListSiteRequest("waiting fecth for Home..."));
        return promise.then((result) => {
            var data = handleJson.convertJsonToArray(result);
            handleMethod.setLocalStore("listSite",data);
            dispatch(getListSiteSuccess(data,true));
        })
            .catch(e => {
                dispatch(getListSiteFailed("failed..."))
            })
    }
}

export function getListSiteSuccess(site,isLoadding) {
    return {
        type: types.FETCH_DATA_SUCCCESS_MAGAZINE,
        payload:{
            site:site,
            isLoadding:isLoadding
        }
    };
}

export function getListSiteRequest(isRequest) {
    return {
        type: types.FETCH_DATA_REQUESTED_MAGAZINE,
        payload: isRequest
    };
}

export function getListSiteFailed(isFailed) {
    return {
        type: types.FETCH_DATA_FAILED_MAGAZINE,
        payload: isFailed
    };
}

export const showModal = (isShow) => {
    return {
        type: types.SHOW_MODAL,
        payload: isShow
    }
}

export const closeModal = (isHide) => {
    return {
        type: types.CLOSE_MODAL,
        payload: isHide
    }
}

export const submitConfig = (infoConfig) => {
    return {
        type: types.SUBMIT_CONFIG,
        payload: infoConfig
    }
}

export const onChangeInput = (propertyName, value) => {
    return {
        type: types.ON_CHANGE_INPUT,
        payload: {
            propertyName: propertyName,
            value: value
        }
    }
}

export const deleteSite = (siteID) => {
    return {
        type: types.DELETE_SITE,
        payload: siteID
    }
}

export const changeLoadding = (isLoadding)=>{
    return {
        type: types.CHANGE_LOADDING,
        payload:isLoadding
    }
}

export const searchSite = (name)=>{
    return {
        type:types.SEARCH_SITE,
        payload: name
    }
}