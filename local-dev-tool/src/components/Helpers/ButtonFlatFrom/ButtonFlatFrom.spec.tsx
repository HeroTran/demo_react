import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';
import ButtonFlatFrom from './ButtonFlatFrom';
// function setup() {
//   const props = {
//     addTodo: jest.fn()
//   }

//   const enzymeWrapper = mount(<ButtonFlatFrom {...props} />)

//   return {
//     props,
//     enzymeWrapper
//   }
// }
describe('ButtonFlatFrom component', function () {
      it('should show platform', () => {
        const component = shallow(<ButtonFlatFrom showFlatForm={() => ('Tablet')} />);
        component.simulate('click');
      })
});