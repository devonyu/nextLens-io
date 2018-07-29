// import Enzyme, { shallow, render, mount } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
// // React 16 Enzyme adapter
// Enzyme.configure({ adapter: new Adapter() });
// // Make Enzyme functions available in all test files without importing
// global.shallow = shallow;
// global.render = render;
// global.mount = mount;






const Enzyme = require('enzyme');
// this is where we reference the adapter package we installed  
// earlier
const EnzymeAdapter = require('enzyme-adapter-react-16');
// This sets up the adapter to be used by Enzyme
Enzyme.configure({ adapter: new EnzymeAdapter() });

