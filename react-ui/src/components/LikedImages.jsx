import React, { Component } from 'react'
import axios from 'axios';
import Masonry from 'react-masonry-component';

const masonryOptions = {
    transitionDuration: '0.8s',
    itemSelector: '.grid-item',
    columnWidth: 20,
    gutter: 10,
    horizontalOrder: true,
    fitWidth: true,
};

const imagesLoadedOptions = { background: '.my-bg-image-el' }

export default class LikedImages extends Component {
    constructor(props) {
      super(props);
      this.state = {
        photos: [],
      }
    }
    componentDidMount() {
        axios.get(`/users/${this.props.userInfo.id}/likedphotos`)
        .then(({ data }) => {
                const temp = [];
                data.forEach((img)=> {
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

    render() {
        const childElements = this.state.photos.map((photo, i) => {
           return (
                <div className='grid-item' key={i}>
                    <img className='grid-item-photo' src={photo.smallurl} alt={photo.photographername} />
                    <p className='grid-item-photographer'>Photographer: {photo.photographername}</p>
                </div>
                );
        });

        return (
            <Masonry
                className={'my-gallery-class'} // default ''
                elementType={'div'} // default 'div'
                options={masonryOptions} // default {}
                disableImagesLoaded={false} // default false
                updateOnEachImageLoad={true} // default false and works only if disableImagesLoaded is false
                imagesLoadedOptions={imagesLoadedOptions} // default {}
            >
                {childElements}
            </Masonry>
        );
    }
}