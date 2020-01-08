import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  height: calc(100vh - 75px);
  width: 100vw;
  background-color: #c7c9d3;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  position: relative;
`;

const Title = styled.h2`
  color: black;
  font-size: 3em;
  text-align: center;
`;

const WalkthroughContainer = styled.div`
  max-height: 100%;
  max-width: 100%;
  overflow: auto;
  background-color: #c7c9d3;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

const WalkthroughCard = styled.div`
  height: 400px;
  max-width: calc(100vw / 4);
  min-width: 350px;
  background-color: white;
  border-radius: 0.3em;
  box-shadow: 13px 21px 53px -13px rgba(1, 1, 1, 0.65);
  padding: 2em;
  margin: 2em;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  cursor: pointer;
`;

const WalkthroughTitle = styled.div`
  font-size: 2em;
  text-align: center;
`;

const WalkthroughGif = styled.div`
  height: 300px;
  width: 100%;
  background-color: grey;
  display: flex;
  justify-content: center;
  margin: 0.5em 0 0.5em 0;
`;

const OnBoard = () => (
  <Container>
    <Title>ONBOARDING / HELP</Title>
    <WalkthroughContainer>
      <WalkthroughCard>
        <WalkthroughTitle>How it works?</WalkthroughTitle>
        <WalkthroughGif />
        <p>
          By using Photoliker, the application intakes certain key factors from your likes AND
          dislikes. Once we have enough data, the algorithm will return lenses (at different price
          ranges) to you via the nextlens tab (highlight).
        </p>
      </WalkthroughCard>
      <WalkthroughCard>
        <WalkthroughTitle>Navigating the App</WalkthroughTitle>
        <WalkthroughGif />
        <p>
          The Nav bar and the buttons. How to display and hide the SideBar. All the buttons that
          bring up certain components to the main view. Use a modal to show where to click on the
          nav/sidebar and activating and hiding te SB.
        </p>
      </WalkthroughCard>
      <WalkthroughCard>
        <WalkthroughTitle>PhotoLiker</WalkthroughTitle>
        <WalkthroughGif />
        <p>
          PL is the component that lets a user dislike and like an image. A user can click on the
          like and nope buttons, use the left/right arrow keys, or swipe left/right (mobile/with
          mouse). We have a progress bar to help the user visualize how many more likes are needed.
        </p>
      </WalkthroughCard>
      <WalkthroughCard>
        <WalkthroughTitle>Next Lens (Reccomendations)</WalkthroughTitle>
        <WalkthroughGif />
        <p>
          Once you we have enough data (affinities on your likes/dislikes), The recommendations tab
          will display the lenses that we have found for you. Along with links to purchase and rent
          the lens, We have set up a flow to display real images that were taken with the specific
          lenses via Flickr to represent real photos that are achievable.
        </p>
      </WalkthroughCard>
      <WalkthroughCard>
        <WalkthroughTitle>Reviewing Lenses</WalkthroughTitle>
        <WalkthroughGif />
        <p>
          How can a user write a review and give a rating for a specific lens? Can a user upload
          their images based on certain lens. Is there ways for a program to alter Exif data to
          falsify an image?
        </p>
      </WalkthroughCard>
      <WalkthroughCard>
        <WalkthroughTitle>Editing Profile</WalkthroughTitle>
        <WalkthroughGif />
        <p>
          You can edit your profile by clicking opening the sidebar and clicking on the profile card
          on top. You will be able to view a live update within the edit profile tab.
        </p>
      </WalkthroughCard>
    </WalkthroughContainer>
  </Container>
);
// Can use TransitionablePortal to display certain things to user

export default OnBoard;
