import SiteReducer from '../SiteReducer'
import * as types from '../../actions/types';

describe('todos reducer', () => {
  it('should return the initial state', () => {
    expect(SiteReducer(undefined, {})).toEqual(
      {
        listInfoSite:[],
        query: '',
        isShowTab:"ALL",
        isflatForm:true,
        isReload:false,
        isLoadding:false,
      }
    )
  })
});