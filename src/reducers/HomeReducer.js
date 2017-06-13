import * as types from '../actions/types';



const initialState = {
  listSiteManagize:[
      {
          id:"123",
          name:"playBoy",
          image:"../app/assets/images/default-img.png"

      }
  ]
}

export default function HomeReducer(state = initialState, action) {
  switch (action.type) {
    case types.SHOW_LIST_SITE:
        return {...state,listSiteManagize:action.payload};
       

    default:
      return state
  }
}











