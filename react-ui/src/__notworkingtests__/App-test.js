// import React from 'react';
// import renderer from 'react-test-renderer';
// import { shallow, mount, render } from 'enzyme';
// import NavBar from '../components/NavBar';


// describe('<NavBar />', function() {
//   it ('should render the navbar', () => {
//       const tree = renderer.create(
//         <NavBar></NavBar>
//       ).toJSON();

//       expect(tree).toMatchSnapshot();
//     )
//   });

//   it('should render without throwing an error', () => {
//       const wrapper = shallow(<App />)
//       const userState = wrapper.state;
//       expect(userState.userid).toBe(null)
//   });

//   it('should have initial userState empty', function() {
//     expect(shallow(<App />).contains(<div className="container"></div>)).toBe(true);
//   });

//   it('should be selectable by class "container"', function() {
//     expect(shallow(<App />).is('.container')).toBe(true);
//   });

//   it('should mount in a full DOM', function() {
//     expect(mount(<App />).find('.container').length).toBe(1);
//   });

//   it('should render to static HTML', function() {
//     expect(render(<App />).text()).toEqual('hello');
//   });
//   expect(1).toBe(1);

// });

// Other Examples to test later

// test('render a label', () => {
//   const wrapper = shallow(
//       <NavBar>Hello Jest!</Navbar>
//   );
//   expect(wrapper).toMatchSnapshot();
// });

// test('render a small label', () => {
//   const wrapper = shallow(
//       <Label small>Hello Jest!</Label>
//   );
//   expect(wrapper).toMatchSnapshot();
// });

// test('render a grayish label', () => {
//   const wrapper = shallow(
//       <Label light>Hello Jest!</Label>
//   );
//   expect(wrapper).toMatchSnapshot();
// });