import * as types from '../actions/types';
import validate from '../utility/validateForm';
import objectAssign = require('object-assign');

export const initialState: StateIssue.infoIssue = {
    Issue:[],
    isFlatform:"Landscap",
    isScreenFlatFrom:{
        width:"1024",
        height:"768"
    },
    isMode:"Light",
    isSize:"Small",
    isZoom:"100",
    isLoadding:false
};

export default function IssueReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_DATA_SUCCCESS:
        state.Issue = action.payload.issue;
        state.isLoadding = action.payload.isLoadding;
        return {...state};
    case types.SEARCH_STORY:
        let newList =  Object.assign([], state.Issue);
        if(newList.length == 0){newList = initialState.Issue}
        if(action.payload.length > 0 ){
            newList = newList.filter(function(data){
                return data.name.toLowerCase().search(
                    action.payload.toLowerCase()) !== -1;
            });
        }else{
            newList = initialState.Issue;
        }
        return {...state,infoIssue:newList};
    case types.BUTTON_CHANGE_FLATFORM:
        var isScreen;
        if(action.payload === "Landscap"){
            isScreen = {width:"1024",height:"768"}
        }else if(action.payload === "Portrait"){
            isScreen = {width:"768",height:"1024"}
        }else{
            isScreen = { width:"320",height:"480"}
        }
        return {...state,isScreenFlatFrom:isScreen,isFlatform:action.payload};
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
    case types.ZOOM_FRAME:
        
        return{...state,isZoom:action.payload}
    default:
      return state
  }
}











