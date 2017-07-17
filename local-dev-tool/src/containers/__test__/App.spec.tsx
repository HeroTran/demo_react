import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {mount, shallow} from 'enzyme';
import App from '../App';
import Header from '../../components/Helpers/Header/Header';

describe("App component", () => {
    it("renders only 1 App component", () => {
        const component = shallow(<App />);
        expect(component).toHaveLength(1);
    });
    it('renders a snapshot', () => {
        const tree = renderer.create(<App/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('should contains a header', () => {
        const component = mount(<App />);
        expect(component.contains(<Header />)).toEqual(true);
    })
});