import React, { Component } from 'react';
import styled from 'styled-components';
import { Form, Icon, Image, Modal } from 'semantic-ui-react';
import axios from 'axios';

const FlickRContainer = styled.div`
  position: relative;
  height: 90%;
`;

const Button = styled.button`
  color: white;
  border-radius: 5px;
  border: none;
  background: #0063dc;
  height: 45px;
  margin: 5px;
  min-width: 100px;
  cursor: pointer;
  &:hover {
    transform: translate(0, -5px);
    transition: all 0.2s ease-in-out;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  }
`;

const CameraLensImage = styled.img`
  max-width: 250px;
  height: auto;
`;

export default class FlickrImages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      tag: '',
      pastTags: [],
      page: 1
    };
    this.myRef = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearImages = this.clearImages.bind(this);
  }

  componentDidMount() {
    // console.log('Flickr Modal mounted for ', this.props.lensname);
  }

  handleSubmit = async () => {
    await this.setState({
      pastTags: this.state.pastTags.concat(this.state.tag),
      tag: ''
    });
    await this.searchQueryTag();
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  searchQueryTag = async () => {
    // clear images loaded
    await this.setState((state, props) => ({
      photos: [],
      page: 1
    }));
    await this.loadImages(
      this.props.flickr,
      this.state.page,
      this.state.pastTags[this.state.pastTags.length - 1]
    );
  };

  scroll(ref) {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  }

  loadImages(groupId, page, tag) {
    // check to see if no images are there, we can stop a server call early!
    let query = `/flickr/${groupId}/${page}`;
    if (tag) {
      console.log(`Searching tag: ${tag}`);
      query += `/${tag}`;
    }
    if (groupId.length > 0) {
      axios
        .get(query)
        .then(({ data }) => {
          const temp = [];
          // console.log(`Recieved ${data.photos.photo.length} images`);
          data.photos.photo.forEach(img => {
            temp.push(img);
          });
          this.setState((state, props) => ({
            photos: state.photos.concat(temp),
            page: (state.page += 1)
          }));
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  clearImages() {
    this.setState(() => ({
      photos: []
    }));
  }

  render() {
    const { tag } = this.state;
    return (
      <Modal
        trigger={
          <Button>
            <Icon name="flickr" />
            View Real Photos via FlickR
          </Button>
        }
        closeIcon
        onClose={this.clearImages}
        onOpen={() => {
          this.loadImages(this.props.flickr, 1);
        }}
        style={{ position: 'relative', marginTop: '75px' }}
      >
        <FlickRContainer>
          <Modal.Header>
            <h1>
              Photos Taken with{' '}
              <a
                ref={this.myRef}
                href={`https://www.flickr.com/groups/${this.props.flickr}/`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {this.props.lensname}
              </a>
            </h1>
          </Modal.Header>

          <Modal.Content>
            <Modal.Description>
              <div style={{ height: '100%' }}>
                <Form onSubmit={this.handleSubmit}>
                  <div
                    style={{
                      display: 'flex',
                      height: '100%',
                      justifyContent: 'center',
                      flexWrap: 'wrap',
                      width: '100%'
                    }}
                  >
                    <CameraLensImage src={this.props.lensInfo.image} alt="cameralens" />
                    <Form.Input
                      placeholder="Filter results by Tag"
                      name="tag"
                      value={tag}
                      onChange={this.handleChange}
                      action="Search"
                      style={{ height: '45px', margin: '30px 0', width: '100%' }}
                    />
                  </div>
                </Form>
              </div>

              {this.state.photos.length > 0
                ? this.state.photos.map((image, i) => (
                    <div key={i} className="flickrwrap">
                      <Image fluid className="flickrimg" src={image.url_c} />
                      <p className="flickrcontent">
                        {image.title.length === 0 ? image.description._content : image.title}
                        <br />
                        {image.ownername ? `Photographer: ${image.ownername}` : ''} views:{' '}
                        {image.views}
                      </p>
                    </div>
                  ))
                : 'No Images Found'}
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button
              primary
              onClick={() => {
                this.loadImages(
                  this.props.flickr,
                  this.state.page,
                  this.state.pastTags[this.state.pastTags.length - 1]
                );
              }}
            >
              Load More Images
              <Icon name="right chevron" />
            </Button>
            <Button
              onClick={() => {
                this.scroll(this.myRef);
              }}
            >
              Top
            </Button>
          </Modal.Actions>
        </FlickRContainer>
      </Modal>
    );
  }
}
