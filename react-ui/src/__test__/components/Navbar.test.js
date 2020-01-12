import React from 'react';
import Navbar from '../../components/NavBar';
import renderer from 'react-test-renderer';

test('Can see navbar', () => {
  const userState = {
    about: '',
    email: '',
    firstname: '',
    id: 0,
    mount: 1,
    profileimgurl: ''
  };
  const emptyFunc = () => {};
  const component = renderer.create(
    <Navbar
      userInformation={userState}
      loggedIn={false}
      sidebar={emptyFunc}
      changeState={emptyFunc}
      changeView={emptyFunc}
    />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
