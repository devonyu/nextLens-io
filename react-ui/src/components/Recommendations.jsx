import React, { Component } from 'react';
import { Image } from 'semantic-ui-react'
// import axios from 'axios';
import photolikergif from '../images/photoliker.gif';
import FlickrImages from './FlickrImages';

let imageGroups = {
    canonfifty: '2800875@N25',
    mavicpro: '3049151@N20',
    sigmatentwenty: '94829136@N00',
    tamronseventeenfifty: '37412600@N00',
    canoneightyfiveonetwo: '84346957@N00'
}
// Having a loading screen before mounting component when algorithm is loading.

export default class Recommendations extends Component {
    constructor(props) {
        super(props);
        this.state = {
          lensRecommendations: [null]
        }
    }

    loadRecommendations(){
        //call algo to get best lens recommendations here and get their information
        let holder = [];
        for (let lens in imageGroups) {
            holder.push([lens, imageGroups[lens]]);
        }
        this.setState({lensRecommendations: holder});
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
                                        flickr={ lens[1] }
                                        lensname= { lens[0] }
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