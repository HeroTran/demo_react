import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';
import Magazine from './Magazine';
import * as siteAction from '../../actions/SiteAction';
import ButtonFlatFrom from '../../components/Helpers/ButtonFlatFrom/ButtonFlatFrom';


const testMagazine = [
    {
        "siteId":"987",
        "name": "PC World",
        "designPack": "dp-PCWorld",
        "url": "http://pcworld-us.audiencemedia.com/api/amm/v1/auth-issues",
        "image": "images/magazines/pcworld.jpg"
    }
]

describe('Magazine component', () => {
    it('render with correct UI', () => {
        const component = renderer.create(<Magazine siteMagazine={testMagazine}/>).toJSON();
        expect(component).toMatchSnapshot();
    })
    it('render correctly number of magazines', () => {
        const component =mount(<Magazine siteMagazine={testMagazine}/>);
        expect(component.find('.Section-issue')).toHaveLength(1);
    })
    it('render with correct thumbnail of magazine', () => {
        const component =mount(<Magazine siteMagazine={testMagazine}/>);
        expect(component.find('.Issue-cover img').prop('src') !== '/images/logo.png').toBeTruthy();
    })
    it('render correctly with default thumbnail', () => {
        const noThumb = [...testMagazine];
        noThumb[0].image = null;
        const component =mount(<Magazine siteMagazine={noThumb}/>);
        expect(component.find('.Issue-cover img').prop('src') === '/images/logo.png').toBeTruthy();
    })
    it('each Magazine has two button View and CMS', () => {
        const component = shallow(<Magazine siteMagazine={testMagazine}/>);
        expect(component.find('.Issue-remove a')).toHaveLength(1);
    })
    it('info of Magazine should renders name and siteID', () => {
        const component = mount(<Magazine siteMagazine={testMagazine}/>);
        expect(component.find('.Issue-info li')).toHaveLength(2);
    })
});