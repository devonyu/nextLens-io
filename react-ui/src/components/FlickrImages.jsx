import React from 'react'
import { Button, Header, Icon, Image, Modal } from 'semantic-ui-react'

console.log('inside flickr')

const FlickrImages = (props) => (

  <Modal trigger={<Button>See Real life Images by lens</Button>}>
    <Modal.Header>Header should be the lens name</Modal.Header>
    <Modal.Content image>
      <Image wrapped size='medium' src='https://cdn.dxomark.com/dakdata/measures/Optics/Sigma_50mm_F14_DG_HSM_A_Nikon/Marketing_PV/Sigma_50mm_F14_DG_HSM_A_Nikon.png' />
      <Modal.Description>
        <Header>Header, Real life images by Nikon 50mmm</Header>
        {props.images.length > 0 ? 
            props.images.map((image, i)=> {
                return <Image src={image.url_c} key={i} />
            }) : ''
        }
      </Modal.Description>
    </Modal.Content>
    <Modal.Actions>
      <Button primary>
        Load More Images <Icon name='right chevron' />
      </Button>
    </Modal.Actions>
  </Modal>
)

export default FlickrImages
