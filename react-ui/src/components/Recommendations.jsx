import React, { Component } from 'react';
import { Image } from 'semantic-ui-react'
import axios from 'axios';
import photolikergif from '../images/photoliker.gif';
import FlickrImages from './FlickrImages';

// let imageGroups = {
//     canonfifty: '2800875@N25',
//     mavicpro: '3049151@N20',
//     sigmatentwenty: '94829136@N00',
//     tamronseventeenfifty: '37412600@N00',
//     canoneightyfiveonetwo: '84346957@N00'
// }
// Having a loading screen before mounting component when algorithm is loading.

export default class Recommendations extends Component {
    constructor(props) {
        super(props);
        this.state = {
          lensRecommendations: []
        }
    }

    loadRecommendations(){
        //call algo to get best lens recommendations here and get their information
        console.log(`Calling AXIOS WITH: ${this.props.userInfo.id}/${this.props.userInfo.mount} route!`);
        axios.get(`/users/${this.props.userInfo.id}/${this.props.userInfo.mount}/recommendations`)
        .then(({ data }) => {
          console.log('FE DATA', data)
          // dynamically loads recommendations on mount and category likes MVP
          this.setState({lensRecommendations: data});
        })
        .catch((err) => {
          console.log('error with AXIOS, ', err);
        })
    }

    componentWillMount() {
        console.log('recommendations mounted');
        if (this.props.likeProgress < 30 && this.props.topProgress < 30) {
            console.log('NOT ENOUGH DATA');
        } else {
            this.loadRecommendations();
        }
    }

    render() {
        return(
            <div>
                {this.state.lensRecommendations.length === 0 ? 
                    <div>
                        <h1>Not enough data, Please continue to use PhotoLiker until your progress reaches 100%!</h1>
                        <Image src={photolikergif} alt="liking" />
                    </div>:
                    <div>
                        <h1>{this.props.userInfo.firstname}'s Lens Recommendations!</h1>
                        <ul>
                            {this.state.lensRecommendations.map((lens, i) => {
                                return <li key={i}>
                                    <FlickrImages
                                        images={ this.state.photos }
                                        flickr={ lens.Flickr }
                                        lensname= { lens.Name }
                                    />
                                </li>
                            })}
                        </ul>
                    </div>
                }
            </div>
        )
    }
}