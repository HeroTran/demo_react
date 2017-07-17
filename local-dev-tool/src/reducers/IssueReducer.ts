import * as types from '../actions/types';
import validate from '../utility/validateForm';
import objectAssign = require('object-assign');
import * as handleMethod from '../utility/handleMethod';
import * as api from '../api/cms';

export const initialState: StateIssue.infoIssue = {
    Issue:[],
    isScreenFlatFrom:{
        width:"1024",
        height:"768"
    },
    platform:"tablet",
    mode:"0",
    fontSize:"0",
    isZoom:"100",
    isLoadding:false,
    navigate:"11",
    url:"",
    orientation:"landscape",
    layout:"",
    designPack:"",
    tocID:"",
    storyID:"",
    issueTitle:"",
    params:{},
    query: "",
    listPortrait:[],
    listLandscap:[],
    listFileTwig:[],
    currentPage:0,
    layoutTiwg:{}


};

export default function IssueReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_DATA_SUCCCESS_ISSUE:
        state.Issue = [];
        let obIssue = action.payload.issue.issue.sections;
        state.Issue = obIssue;
        state.isLoadding = action.payload.isLoadding;
        state.layout = "";
        return {...state};
    case types.FETCH_INFO_CONFIG_SUCCESS:
        state.designPack = action.payload.designPack;
        state.listLandscap = action.payload.result['landscape'];
        state.listPortrait = action.payload.result['portrait'];
        return {...state};
    case types.SEARCH_STORY:
        return {
                ...state,
                query: action.payload
            };
    case types.CHANGE_LOADDING:
        state.isScreenFlatFrom = {width:"1024",height:"768"};
        state.orientation = "landscape";
        state.platform = "tablet";
        state.currentPage = 0;
        state.fontSize = "0";
        state.mode = "0";
        state.isZoom = "100";
        return {...state,isLoadding:action.payload,url:""}
         case types.CHANGE_URL_IFRAME:
         state.url = action.payload.isURL;
         state.designPack = action.payload.designPack;
         state.params = action.payload.params;
         state.tocID  = action.payload.tocID;
         state.storyID = action.payload.storyID;
         state.orientation = state.orientation;
         state.mode = action.payload.mode;
         state.fontSize = action.payload.fontSize;
         state.navigate = action.payload.navigate;
         state.isScreenFlatFrom =  action.payload.isScreenFlatFrom;
         state.platform = action.payload.platform;
         state.issueTitle = action.payload.issueTitle;
       
        state.layoutTiwg = action.payload.layoutTiwg;
         if(state.listLandscap.length > 2 && state.orientation === "landscape"){
            state.listFileTwig = state.listLandscap;
            state.layout = state.layout != "" ? state.layout : state.listFileTwig[0];
            if(state.layoutTiwg != undefined){
                state.layout = action.payload.layoutTiwg["landscape"] != undefined ? action.payload.layoutTiwg["landscape"].link : state.listFileTwig[0];
            }
         }
         else if(state.listPortrait.length > 2 && ( state.orientation === "portrait" || state.orientation === "mobile")){
            state.listFileTwig = state.listPortrait;
            state.layout = state.layout != "" ? state.layout : state.listFileTwig[0];
            if(state.layoutTiwg != undefined){
                state.layout = action.payload.layoutTiwg["portrait"] != undefined ? action.payload.layoutTiwg["portrait"].link : state.listFileTwig[0];
            }
         }
         else{
             state.listFileTwig = [];
             state.layout = state.layout != "" ? state.layout : "";
         }
         state.currentPage = 0;
         state.url = handleMethod.createUrlForIFrame(state.params,state.designPack,state.tocID,state.storyID,state.layout,state.orientation,state.mode,state.fontSize,state.navigate,state.isScreenFlatFrom.width,state.isScreenFlatFrom.height,state.platform,state.issueTitle);
         return {...state};

    case types.BUTTON_CHANGE_FLATFORM:
        if(action.payload.orientation === "landscape"){
            state.isScreenFlatFrom = {width:"1024",height:"768"};
            state.orientation = "landscape";
            state.platform = "tablet";
        }else if(action.payload.orientation === "portrait"){
            state.isScreenFlatFrom = {width:"768",height:"1024"};
            state.orientation = "portrait";
            state.platform = "tablet";
        }else{
            state.isScreenFlatFrom = { width:"320",height:"480"};
            state.orientation = "mobile";
            state.platform = "mobile";
        }
        if(state.listLandscap.length > 2 && state.orientation === "landscape"){
            state.listFileTwig = state.listLandscap;
            if(state.layoutTiwg != undefined){
                state.layout = state.layoutTiwg["landscape"] != undefined ? state.layoutTiwg["landscape"].link : state.listFileTwig[0];
            }
        }
        else if(state.listPortrait.length > 2 && ( state.orientation === "portrait" || state.orientation === "mobile")){
            state.listFileTwig = state.listPortrait;
            if(state.layoutTiwg != undefined){
                state.layout = state.layoutTiwg["portrait"] != undefined ? state.layoutTiwg["portrait"].link : state.listFileTwig[0];
            }
        }
        else{
            state.listFileTwig = [];
            state.layout = state.layout != "" ? state.layout : "";
        }

        state.currentPage = 0;
        state.url = handleMethod.createUrlForIFrame(state.params,state.designPack,state.tocID,state.storyID,state.layout,state.orientation,state.mode,state.fontSize,state.navigate,state.isScreenFlatFrom.width,state.isScreenFlatFrom.height,state.platform,state.issueTitle);
        return {...state};
    case types.BUTTON_CHANGE_SIZE:
        state.fontSize = action.payload;
        state.url = handleMethod.createUrlForIFrame(state.params,state.designPack,state.tocID,state.storyID,state.layout,state.orientation,state.mode,state.fontSize,state.navigate,state.isScreenFlatFrom.width,state.isScreenFlatFrom.height,state.platform,state.issueTitle);
        return {...state};
    case types.BUTTON_CHANGE_MODE:
        state.mode = action.payload;
        state.url = handleMethod.createUrlForIFrame(state.params,state.designPack,state.tocID,state.storyID,state.layout,state.orientation,state.mode,state.fontSize,state.navigate,state.isScreenFlatFrom.width,state.isScreenFlatFrom.height,state.platform,state.issueTitle);
        state.currentPage = 0;
        return {...state};
    
    case types.BUTTON_CHANGE_WIDTH:
        var isScreenDevice;
        if(action.payload.isScreen == "width"){
            isScreenDevice = {
                width:action.payload.isValue,
                height:state.isScreenFlatFrom.height.toString()
            }
        }else{
            isScreenDevice = {
                width:state.isScreenFlatFrom.width,
                height:action.payload.isValue.toString()
            }
        }
        return {...state,isScreenFlatFrom:isScreenDevice};
    case types.CHANGE_LAYOUT:
        state.layout = action.payload;
        state.currentPage = 0;
        state.url = handleMethod.createUrlForIFrame(state.params,state.designPack,state.tocID,state.storyID,state.layout,state.orientation,state.mode,state.fontSize,state.navigate,state.isScreenFlatFrom.width,state.isScreenFlatFrom.height,state.platform,state.issueTitle);
        return {...state};
    case types.ZOOM_FRAME:
        return{...state,isZoom:action.payload}
    case types.CHANGE_SWIPE:
        state.currentPage = action.payload;
        return {...state};
    default:
      return state
  }
}











