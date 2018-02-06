import React from 'react'
import { Button, Container, Image, Popup, Reveal, Transition } from 'semantic-ui-react'

const PhotoLiker = () => (
    <Container fluid>
        <Transition animation='scale' duration={900} transitionOnMount={true}>

            <Popup
                trigger={
                    <Image src='https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjE5NjU3fQ&s=71d55ddd14ae7f978ecbcb4fe64a8e78'
                        fluid
                        size='huge'
                        rounded
                        centered='true'
                    />}
                header='Photographers Name'
                content='Descriptions and link to profile'
                on={['click']}
            />


        </Transition>
    </Container>
)

export default PhotoLiker