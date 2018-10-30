import React, { Component } from 'react';
import { Button, Form, Header, Icon, Image, Modal } from 'semantic-ui-react'
import axios from 'axios';

console.log('inside flickr')

export default class FlickrImages extends Component {
    constructor(props) {
        super(props);
        this.state = {
          photos: [],
          current: '',
          tag: '',
          id: 5,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    handleSubmit = async () => {
        await this.searchQueryTag();
        await this.setState({ tag: '' });
    }

    searchQueryTag() {
        axios.get(`/flickr/search/${this.state.tag}`)
        .then(({ data }) => {
                const temp = [];
                data.photos.photo.forEach((img)=> {
                    temp.push(img);
                })
                this.setState(() => {
                    return {
                        photos: temp,
                    };
                  });
        })
        .catch((error) => {
            console.log(error);
        });
    }

    loadImages(groupId) {
        if (groupId.length > 0) {
            //console.log(groupId);
            axios.get(`/flickr/${groupId}`)
            .then(({ data }) => {
                    const temp = [];
                    console.log('First Image EX: ', data.photos.photo[0]);
                    data.photos.photo.forEach((img)=> {
                        temp.push(img);
                    })
                    this.setState(() => {
                        return {
                            photos: temp,
                        };
                      });
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }

    render() {
        const { tag } = this.state
        return(
                <Modal trigger={<Button>See Real life Images by lens {this.props.lens}</Button>}>
                    <Modal.Header>Photos Taken with {this.props.lens}</Modal.Header>
                    <Form onSubmit={this.handleSubmit}>
                                        <Form.Group>
                                            <Form.Input placeholder='Search by Tags' name='tag' value={tag} onChange={this.handleChange} action='Search'/>
                                        </Form.Group>
                    </Form>

                    <Modal.Content image>
                    <Image wrapped size='medium' src='https://cdn.dxomark.com/dakdata/measures/Optics/Sigma_50mm_F14_DG_HSM_A_Nikon/Marketing_PV/Sigma_50mm_F14_DG_HSM_A_Nikon.png' />
                    <Modal.Description>
                        <Header>Header, Real life images by {this.props.lens}</Header>
                        {this.props.images.length > 0 ? 
                            this.props.images.map((image, i)=> {
                                return <Image src={image.url_c} key={i} />
                            }) : ''
                        }
                    </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                    <Button primary>
                        Load More Images (axios => nP) <Icon name='right chevron' />
                    </Button>
                    </Modal.Actions>
            </Modal>
        )
    }
}


//other styling to load images
        // let images = this.state.photos.map((image, i) => {
        //     return  <Grid.Column key={i} mobile={4} tablet={4} computer={4}>
        //               <Image src={image.url_c} />
        //             </Grid.Column>
        //  });
        /* <Grid relaxed>
            { this.state.show === false ? '' : images }
        </Grid> */
        //Somehow load masonry grid of images?