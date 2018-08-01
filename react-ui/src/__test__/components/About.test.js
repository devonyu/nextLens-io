import React from 'react';
import AboutPage from '../../components/About';
import renderer from 'react-test-renderer';
 
test('Can see header', () => {
  const component = renderer.create(
    <AboutPage />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});