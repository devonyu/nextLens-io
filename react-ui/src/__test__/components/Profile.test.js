import React from 'react';
import Profile from '../../components/Profile';
import renderer from 'react-test-renderer';
 
test('Loads Profile Card with Props', () => {
    const userInformation = {
        'profileimgurl': 'http://test.com/image.jpg',
        'firstname' : 'Tester',
        'mount': '3',
    }
    const component = renderer.create(
        <Profile userInformation={userInformation} />
    );
    let tree = component.toJSON();
expect(tree).toMatchSnapshot();
});