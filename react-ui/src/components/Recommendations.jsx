import React, { Component } from 'react';
// import { Form } from 'semantic-ui-react'
// import axios from 'axios';
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
          lensRecommendations: []
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

    componentDidMount() {
        console.log('recommendations mounted, axios call to DB for algorithm!');
        this.loadRecommendations();
    }

    render() {
        return(
            <div>
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
            </div>
        )
    }
}