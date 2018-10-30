import React, { Component } from 'react';
import { Form } from 'semantic-ui-react'
import axios from 'axios';
import FlickrImages from './FlickrImages';

let imageGroups = {
    canonfifty: '2800875@N25',
    mavicpro: '3049151@N20',
    sigmatentwenty: '94829136@N00',
    tamronseventeenfifty: '37412600@N00',
    canoneightyfiveonetwo: '84346957@N00'
}
// Having a loading screen before mounting component when algorithm is loading.
// Progress bar or another animated loading object for a better ui/ux.  Look into Placeholder element in Semantic UI
// Also lazy load images from Flickr for better UI
// Current making calls to Flickr server endpoint to get latest images.  Cache them to state or (local session) so user will do less calls.

export default class Recommendations extends Component {
    constructor(props) {
        super(props);
        this.state = {
          photos: [],
          current: '',
          tag: '',
          id: 5,
          lensRecommendations: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    changePool = async (groupId) => {
        await this.setState(()=> {
            return {
                current: groupId
            }
        })
        await this.loadImages(this.state.current);
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

    loadRecommendations(){
        let holder = [];
        for (let lens in imageGroups) {
            holder.push([lens, imageGroups[lens]]);
        }
        this.setState({lensRecommendations: holder});
    }

    componentDidMount() {
        console.log('recommendations mounted, axios call to DB for algorithm!');
        this.loadRecommendations();
    }

    render() {
        const { tag } = this.state
        return(
            <div>
                <div>
                    <h1>{this.props.userInfo.firstname}'s Lens Recommendations!</h1>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group>
                            <Form.Input placeholder='Search by Tags' name='tag' value={tag} onChange={this.handleChange} action='Search'/>
                        </Form.Group>
                    </Form>
                    <ul>
                        {this.state.lensRecommendations.map((lens, i) => {
                            return <li key={i} onClick={()=>{this.changePool(lens[1])}}>
                                <FlickrImages
                                    images={ this.state.photos }
                                    lens={ lens[0]}
                                />
                            </li>
                        })}
                    </ul>
                </div>
            </div>
        )
    }
}