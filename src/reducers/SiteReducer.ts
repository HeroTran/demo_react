import * as types from '../actions/types';
import validate from '../utility/validateForm';
import * as api from '../api/cms';
import objectAssign = require('object-assign');

export const initialState: StateSite.ListSiteMagazine = {
    listInfoSite:[
    ],
    query: '',
    isShowTab:"ALL",
    isflatForm:true,
    isReload:false,
    isLoadding:false,
    listConfig:["DVP","PCWord","MacWord","Mutiple Column"]
    
    
    
};



export default function SiteReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_DATA_SUCCCESS:
        state.listInfoSite = action.payload.issueList;
        state.isLoadding = action.payload.isLoadding;
        return {...state};
    case types.SEARCH_ISSUE:
        return {
            ...state,
            query: action.payload.name
        };
    case types.CHANGE_LOADDING:
        return {...state,isLoadding:action.payload}
    case types.SHOW_TAB:
        return {
            ...state,
            isShowTab: action.payload
        };
    case types.SHOW_FLAT_FORM:
        let isCheckFR = action.payload;
        return {...state,isflatForm:isCheckFR};

    case types.EVENT_DOWNLOAD:
        let list =  Object.assign([], state.listInfoSite);
        list[action.payload.idx].isDowload = false;
        return {...state,listInfoSite:list};
    case types.EVENT_DELETE:
        let newList =  Object.assign([], state.listInfoSite);
        newList[action.payload.idx].isDowload = true;
        return {...state,listInfoSite:newList};
    case types.OPEN_MODAL:
        let newListInfo =  Object.assign([], state.listInfoSite);
        newListInfo[action.payload].isConfig = true;
        return {...state,listInfoSite:newListInfo};
    case types.CLOSE_MODAL_CONFIG:
        let newCloseModal =  Object.assign([], state.listInfoSite);
        newCloseModal[action.payload].isConfig = false;
        return {...state,listInfoSite:newCloseModal};

    default:
      return state
  }
}











