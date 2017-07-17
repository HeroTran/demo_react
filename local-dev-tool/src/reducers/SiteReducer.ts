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
};



export default function SiteReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_DATA_SUCCCESS_SITE:
        state.listInfoSite = action.payload.issueList;
        var listConfig = [
            {
                designPack:"DVP",
                selected:false
            },
            {
                designPack:"macWord",
                selected:true
            },
            {
                designPack:"pcWord",
                selected:false
            }
        ]
        for(let i =0;i<state.listInfoSite.length;i++){
            state.listInfoSite[i].listConfig = listConfig;
        }
        state.isLoadding = action.payload.isLoadding;
        return {...state};
    case types.SEARCH_ISSUE:
        return {
            ...state,
            query: action.payload.name
        };
    case types.CHANGE_LOADDING:
        return {...state,isLoadding:action.payload}
    
    case types.EVENT_CONFIG:
        for(let i=0;i<state.listInfoSite[action.payload.idx].listConfig.length;i++){
            state.listInfoSite[action.payload.idx].listConfig[i].selected = false;
        }
        state.listInfoSite[action.payload.idx].listConfig[action.payload.idx_child].selected = action.payload.isConfig;
        return {...state};
    case types.SHOW_TAB:
        return {
            ...state,
            isShowTab: action.payload
        };
    case types.SHOW_FLAT_FORM:
        let isCheckFR = action.payload;
        return {...state,isflatForm:isCheckFR};

    case types.DOWNLOAD_SUCCESS:
        let list =  Object.assign([], state.listInfoSite);
        list[action.payload.idx].downloaded = action.payload.isDowload;
        return {...state,listInfoSite:list};
    case types.DELETED_ISSUE_SUCCESS:
        let newList =  Object.assign([], state.listInfoSite);
        newList[action.payload.idx].downloaded = action.payload.isDowload;
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











