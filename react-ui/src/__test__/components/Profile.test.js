import React from 'react';
import Profile from '../../components/Profile';
import renderer from 'react-test-renderer';

test('Loads Profile Card with Props', () => {
  const userInformation = {
    firstname: 'Tester',
    profileimgurl: 'https://devonyu.com/pf2.png',
    mount: '3',
    email: 'devonyu415@gmail.com'
  };
  const component = renderer.create(<Profile userInformation={userInformation} />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
