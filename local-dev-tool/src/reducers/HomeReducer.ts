import * as types from '../actions/types';
import validate from '../utility/validateForm';
import * as api from '../api/cms';

export const initialState: State.ListMagazine = {
    listMagazine:[],
    infoConfig:{
        siteLink:"",
        siteId:"",
        siteName:"",
        siteUser:"",
        sitePass:""
    },
    isLoadding:false,
    isShow:false,
    isError:"",
    query:"",
};

export default function HomeReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_DATA_SUCCCESS_MAGAZINE:
        state.listMagazine = action.payload.site;
        state.isLoadding = action.payload.isLoadding;
        return {...state};
    case types.CHANGE_LOADDING:
        return {...state,isLoadding:action.payload}
    case types.SHOW_MODAL:
        return {...state,isShow:true}
    case types.CLOSE_MODAL:
        return {...state,isShow:false}
    case types.ON_CHANGE_INPUT:
        const ifConfig = state.infoConfig;
        ifConfig[action.payload.propertyName] = (action.payload.value).trim();
        return {...state,infoConfig:ifConfig};
    case types.SEARCH_SITE:
        return {
                ...state,
                query: action.payload
            };
    case types.SUBMIT_CONFIG:
         return {...state,isError:""};
    default:
      return state
  }
}











