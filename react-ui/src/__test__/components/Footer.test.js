import React from 'react';
import Footer from '../../components/Footer';
import renderer from 'react-test-renderer';

test('Can see footer', () => {
  const component = renderer.create(<Footer />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
