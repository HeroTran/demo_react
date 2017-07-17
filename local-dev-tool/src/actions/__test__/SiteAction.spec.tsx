import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';
import * as siteAction from '../../actions/SiteAction';
import ButtonFlatFrom from '../../components/Helpers/ButtonFlatFrom/ButtonFlatFrom';

describe('Site Action', function () {
  describe('action - show tab', () => {
      it('should have a type of "SHOW_TAB"', function() {
        expect(siteAction.showTab(true).type).toBe('SHOW_TAB');
      });
      it('should have correct payload', function() {
        console.log(siteAction.showTab(true).payload)
        expect(siteAction.showTab(true).payload).toEqual(true);
      });
      it('should have a type getListSiteRequest', function() {
        expect(siteAction.getListSiteRequest(true).type).toBe('FETCH_DATA_REQUESTED_SITE');
      });
  })
});