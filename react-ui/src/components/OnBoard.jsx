import React from 'react';
import styled from 'styled-components';
import photoswipergif from '../images/photoswiperipad.gif';

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
  height: 500px;
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
  margin-bottom: 10px;
`;
const WalkthroughDescription = styled.div`
  color: #1b1c1d;
`;

const PhotoContainer = styled.div`
  object-fit: contain;
  align-items: center;
  display: flex;
  justify-content: center;
`;

const IpadPhotoswiper = styled.img`
  width: auto;
  height: 75%;
  border-radius: 1em;
  background-color: transparent;
  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.62);
  filter: drop-shadow(10px 10px 14px rgba(0, 0, 0, 0.7));
  cursor: pointer;
`;

const OnBoard = inputProps => {
  const { changeViews } = inputProps;
  return (
    <Container>
      <Title>ONBOARDING / HELP</Title>
      <WalkthroughContainer>
        <WalkthroughCard>
          <WalkthroughTitle>How it works?</WalkthroughTitle>
          <PhotoContainer>
            <IpadPhotoswiper
              src={photoswipergif}
              alt="photoswiper"
              onClick={() => changeViews('photoSwiper')}
            />
          </PhotoContainer>
          <WalkthroughDescription>
            The main application uses your likes and dislikes to give you a list of lenses that
            match your preferences. Use Photoswiper untill it reaches 100%.
          </WalkthroughDescription>
        </WalkthroughCard>
        <WalkthroughCard>
          <WalkthroughTitle>Navigating the App</WalkthroughTitle>
          <PhotoContainer>
            <IpadPhotoswiper
              src={photoswipergif}
              alt="photoswiper"
              onClick={() => changeViews('photoSwiper')}
            />
          </PhotoContainer>
          <WalkthroughDescription>
            Navigating the App is primarly accessed by the Sidebar. To toggle in/out the sidebar,
            click the button the the top left.
          </WalkthroughDescription>
        </WalkthroughCard>
        <WalkthroughCard>
          <WalkthroughTitle>PhotoSwiper</WalkthroughTitle>
          <PhotoContainer>
            <IpadPhotoswiper
              src={photoswipergif}
              alt="photoswiper"
              onClick={() => changeViews('photoSwiper')}
            />
          </PhotoContainer>
          <WalkthroughDescription>
            Swipe left or right to like and dislike an image. The app will be collecting data on
            your preferences and a notification will show when your recommendations are available!
          </WalkthroughDescription>
        </WalkthroughCard>
        <WalkthroughCard>
          <WalkthroughTitle>Reccomendations</WalkthroughTitle>
          <PhotoContainer>
            <IpadPhotoswiper
              src={photoswipergif}
              alt="photoswiper"
              onClick={() => changeViews('photoSwiper')}
            />
          </PhotoContainer>
          <WalkthroughDescription>
            Once we have enough data (likes), The recommendations tab will display the lenses that
            we have calculated for you. Links to rent/ pruchase are included. A User can also view
            real life images taken with lenses via FlickR.
          </WalkthroughDescription>
        </WalkthroughCard>
        <WalkthroughCard>
          <WalkthroughTitle>Reviewing Lenses</WalkthroughTitle>
          <PhotoContainer>
            <IpadPhotoswiper
              src={photoswipergif}
              alt="photoswiper"
              onClick={() => changeViews('photoSwiper')}
            />
          </PhotoContainer>
          <WalkthroughDescription>
            Future feature to let users give reviews to lenses and example images. Also let them
            upload images for that lens.
          </WalkthroughDescription>
        </WalkthroughCard>
        <WalkthroughCard>
          <WalkthroughTitle>Editing Profile</WalkthroughTitle>
          <PhotoContainer>
            <IpadPhotoswiper
              src={photoswipergif}
              alt="photoswiper"
              onClick={() => changeViews('photoSwiper')}
            />
          </PhotoContainer>
          <WalkthroughDescription>
            Users can edit their profiles by opening the sidebar and clicking on the profile card on
            top. Live updates are shown as edites are made.
          </WalkthroughDescription>
        </WalkthroughCard>
      </WalkthroughContainer>
    </Container>
  );
};
// Can use TransitionablePortal to display certain things to user

export default OnBoard;
