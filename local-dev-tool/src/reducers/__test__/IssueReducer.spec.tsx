import IssueReducer from '../IssueReducer'
import * as types from '../../actions/types';

const initState =       {
        listInfoSite:[],
        query: '',
        isShowTab:"ALL",
        isflatForm:true,
        isReload:false,
        isLoadding:false,
      };
describe('Issue reducer', () => {
  it('should return the initial state', () => {
    expect(IssueReducer(undefined, {})).toEqual(initState)
  })
});