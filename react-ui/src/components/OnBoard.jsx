import React, { Component } from 'react';

export default class OnBoard extends Component {
    render() {
        return(
            <div>
                <h1>Welcome to NextLens.io</h1>
                <p>The purpose of this app is to intake your image preferences to help our algorithm recommend lenses for you</p>

                <h2>Navigating the App</h2>
                <p>The Nav bar and the buttons.  How to display and hide the SideBar.  All the buttons that bring up
                    certain components to the main view.  Use a modal to show where to click on the nav/sidebar and activating and hiding te SB.
                </p>
                <h2>How it works?</h2>
                <p>By using Photoliker, the application intakes certain key factors from your likes AND dislikes.
                    Once we have enough data, the algorithm will return lenses (at different price ranges)
                    to you via the nextlens tab (highlight).
                </p>
                <h2>PhotoLiker</h2>
                <p>PL is the component that lets a user dislike and like an image.  A user can click on the like and nope buttons,
                    use the left/right arrow keys, or swipe left/right (mobile/with mouse).  We have a progress bar to help the user 
                    visualize how many more likes are needed.
                </p>
                <h2>Recommendations</h2>
                <p>Once you we have enough data (affinities on your likes/dislikes), 
                    The recommendations tab will display the lenses that we have found for you.
                    Along with links to purchase and rent the lens,  We have set up a flow to display
                    real images that were taken with the specific lenses via Flickr to represent real photos that are 
                    achievable.  
                </p>
                <h2>Reviewing Lenses</h2>
                <p>This part needs to be more clearly thought about.  How can a user write a review and give a rating for a specific lens?
                    Can a user upload their images based on certain lens.  Can we force check exif data?  Is there ways for a program to
                    alter Exif data to falsify an image?
                </p>
                <h2>Editing Profiles</h2>
                <p>You can edit your profile by clicking opening the sidebar and clicking on the profile card on top.
                    You will be able to view a live update within the edit profile tab.
                </p>
            </div>
        )
    }
}

//Can use TransitionablePortal to display certain things to user