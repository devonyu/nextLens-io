import React, { Component } from 'react';
import { Button, Form, Header, Icon, Image, Modal, } from 'semantic-ui-react'
import axios from 'axios';

export default class FlickrImages extends Component {
    constructor(props) {
        super(props);
        this.state = {
          photos: [],
          tag: '',
          pastTags: [],
          page: 1,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    handleSubmit = async () => {
        await this.setState({ 
            pastTags: this.state.pastTags.concat(this.state.tag),
            tag: '',
         });
        await this.searchQueryTag();
    }

    searchQueryTag = async () => {
        // clear images loaded
        await this.setState((state, props) => ({
            photos: [],
            page: 1
        }));
        await this.loadImages(this.props.flickr, this.state.page, this.state.pastTags[this.state.pastTags.length - 1]);
    }

    loadImages(groupId, page, tag) {
        //check to see if no images are there, we can stop a server call early!
        let query = `/flickr/${groupId}/${page}`;
        //console.log('state when axios called => ', this.state)
        if (tag) {
            query += `/${tag}`;
        }
        if (groupId.length > 0) {
            axios.get(query)
            .then(({ data }) => {
                    const temp = [];
                    //console.log('Example Image from API: ', data.photos.photo[1]);
                    data.photos.photo.forEach((img)=> {
                        temp.push(img);
                    })
                    this.setState((state, props) => ({
                        photos: state.photos.concat(temp),
                        page: state.page += 1
                    }));
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }

    componentDidMount(){
        console.log('Flickr Modal mounted');
        this.loadImages(this.props.flickr, 1)
    }

    render() {
        const { tag } = this.state
        return(
                <Modal trigger={<Button><Icon name='flickr'></Icon>FlickR</Button>} closeIcon >
                    <Modal.Header>Photos Taken with {this.props.lensname}</Modal.Header>
                    <Modal.Content>
                    {/* <Image  src='https://cdn.dxomark.com/dakdata/measures/Optics/Sigma_50mm_F14_DG_HSM_A_Nikon/Marketing_PV/Sigma_50mm_F14_DG_HSM_A_Nikon.png' /> */}
                    <Modal.Description>
                    
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group>
                                <Form.Input placeholder='Filter results by Tag' name='tag' value={tag} onChange={this.handleChange} action='Search'/>
                            </Form.Group>
                        </Form>
                        <Header>FlickR Results for {this.props.lensname}</Header>
                        {this.state.photos.length > 0 ? 
                            this.state.photos.map((image, i)=> {
                                return <div key={i} className='flickrwrap'>
                                    <Image fluid
                                        className='flickrimg'
                                        src={image.url_c}
                                    >
                                    </Image>
                                    <p className='flickrcontent'>
                                        {image.title.length === 0 ? image.description._content : image.title} 
                                        <br/>
                                        {image.ownername ?  `Photographer: ${image.ownername}` : ''} views: {image.views}
                                    </p>
                                    </div>
                            }) : 'No Images Found'
                        }
                    </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                    <Button primary onClick={()=>{this.loadImages(this.props.flickr, this.state.page, this.state.pastTags[this.state.pastTags.length - 1])}}>
                        Load More Images<Icon name='right chevron' />
                    </Button>
                    </Modal.Actions>
            </Modal>
        )
    }
}