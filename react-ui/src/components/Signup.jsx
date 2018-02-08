import React from 'react'
import { Button, Checkbox, Container, Form, Segment, Transition } from 'semantic-ui-react'

//use Redux Form and implement redux.  Oauth with Facebook next?

const Signup = () => (
    <Container>
        <Transition animation='jiggle' duration={500} transitionOnMount={true}>
            <Segment>
                <Form>
                    <Form.Field>
                        <label>First Name</label>
                        <input placeholder='First Name' />
                    </Form.Field>
                    <Form.Field>
                        <label>Email</label>
                        <input placeholder='Email' />
                    </Form.Field>
                    <Form.Field>    
                        <label>Password</label>
                        <input placeholder='Password' />
                    </Form.Field>
                        <Form.Field>
                        <Checkbox label='I agree to the Terms and Conditions' />
                    </Form.Field>
                    <Button type='submit'>Submit</Button>
                </Form>
            </Segment>

        </Transition>
    </Container>
)

export default Signup