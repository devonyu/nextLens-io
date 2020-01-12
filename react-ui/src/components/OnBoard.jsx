import React from 'react';
import styled from 'styled-components';
import editprofilelandscapeclick from '../images/editprofilelandscapeclick.gif';
import feedbackipadlandscapeclick from '../images/feedbackipadlandscapeclick.gif';
import flickripadportraitclick from '../images/flickripadportraitclick.gif';
import flickrviewiphone from '../images/flickrviewiphone.gif';
import likedphotosipadlandscapeclick from '../images/likedphotosipadlandscapeclick.gif';
import navigationipadlandscapeclick from '../images/navigationipadlandscapeclick.gif';
import photoswiperipad from '../images/photoswiperipad.gif';
// import recommendationsipad from '../images/recommendationsipad.gif';
import recommendationsipadportraitclick from '../images/recommendationsipadportraitclick.gif';
import reviewlensipadlandscapeclick from '../images/reviewlensipadlandscapeclick.gif';

const Container = styled.div`
  width: 100vw;
  height: calc(100vh - 75px);
  background-color: #c7c9d3;
  position: relative;
  overflow: auto;
`;

const Title = styled.h2`
  color: black;
  font-size: 3em;
  text-align: center;
`;

const WalkthroughContainer = styled.div`
  height: calc(100vh - 75px);
  position: relative;
  max-width: 100%;
  box-sizing: border-box;
  background-color: #c7c9d3;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

const WalkthroughCard = styled.div`
  height: 500px;
  max-width: calc(100vw / 4);
  min-width: 310px;
  background-color: white;
  border-radius: 0.8em;
  box-shadow: 13px 21px 53px -13px rgba(1, 1, 1, 0.65);
  padding: 2em;
  margin: 2em;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0s;
  // -webkit-backface-visibility: hidden;
  :hover {
    transform: translateY(-10px);
    cursor: pointer;
    box-shadow: 0 50px 50px rgba(0, 0, 0, 0.1);
  }
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
  height: 80%;
`;

const IpadPhotoswiper = styled.img`
  width: auto;
  max-width: 90%;
  height: auto;
  max-height: 90%;
  border-radius: 1.1em;
  background-color: transparent;
  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.62);
  filter: drop-shadow(10px 10px 14px rgba(0, 0, 0, 0.7));
  cursor: pointer;
`;

const OnBoard = inputProps => {
  const { changeViews, status, toggleSidebar } = inputProps;
  return (
    <Container>
      <Title>{status === 0 ? `ONBOARDING` : `HELP`}</Title>
      <WalkthroughContainer>
        <WalkthroughCard onClick={() => changeViews('photoSwiper')}>
          <WalkthroughTitle>How it works?</WalkthroughTitle>
          <PhotoContainer>
            <IpadPhotoswiper src={flickrviewiphone} alt="photoswiper" />
          </PhotoContainer>
          <WalkthroughDescription>
            The main application uses your likes and dislikes to give you a list of lenses that
            match your preferences. Use Photoswiper untill it reaches 100%.
          </WalkthroughDescription>
        </WalkthroughCard>
        <WalkthroughCard onClick={() => toggleSidebar()}>
          <WalkthroughTitle>Navigating the App</WalkthroughTitle>
          <PhotoContainer>
            <IpadPhotoswiper src={navigationipadlandscapeclick} alt="photoswiper" />
          </PhotoContainer>
          <WalkthroughDescription>
            Navigating the App is primarly accessed by the Sidebar. To toggle in/out the sidebar,
            click the button the the top left.
          </WalkthroughDescription>
        </WalkthroughCard>
        <WalkthroughCard onClick={() => changeViews('photoSwiper')}>
          <WalkthroughTitle>PhotoSwiper</WalkthroughTitle>
          <PhotoContainer>
            <IpadPhotoswiper src={photoswiperipad} alt="photoswiper" />
          </PhotoContainer>
          <WalkthroughDescription>
            Swipe left or right to like and dislike an image. The app will be collecting data on
            your preferences and a notification will show when your recommendations are available!
          </WalkthroughDescription>
        </WalkthroughCard>
        <WalkthroughCard onClick={() => changeViews('recommendations')}>
          <WalkthroughTitle>Reccomendations</WalkthroughTitle>
          <PhotoContainer>
            <IpadPhotoswiper src={recommendationsipadportraitclick} alt="photoswiper" />
          </PhotoContainer>
          <WalkthroughDescription>
            Once we have enough data (likes), The recommendations tab will display the lenses that
            we have calculated for you. General Info, recommendation reasons, and links to rent /
            purchase lenses are included.
          </WalkthroughDescription>
        </WalkthroughCard>
        <WalkthroughCard onClick={() => changeViews('editProfile')}>
          <WalkthroughTitle>Explore Real Images</WalkthroughTitle>
          <PhotoContainer>
            <IpadPhotoswiper src={flickripadportraitclick} alt="photoswiper" />
          </PhotoContainer>
          <WalkthroughDescription>
            Click the Flickr button on a recommendation card to view photos taken by other
            photographers. Enter a tag to filter photos by a specific query.
          </WalkthroughDescription>
        </WalkthroughCard>
        <WalkthroughCard onClick={() => changeViews('likedImages')}>
          <WalkthroughTitle>View Images you liked</WalkthroughTitle>
          <PhotoContainer>
            <IpadPhotoswiper src={likedphotosipadlandscapeclick} alt="likedimages" />
          </PhotoContainer>
          <WalkthroughDescription>
            Check out the past images you've already liked to see how your preferences has changed
            thoughout time. Features a Masonary Grid View to dynamically fit your screen
          </WalkthroughDescription>
        </WalkthroughCard>
        <WalkthroughCard onClick={() => changeViews('reviews')}>
          <WalkthroughTitle>Reviewing Lenses</WalkthroughTitle>
          <PhotoContainer>
            <IpadPhotoswiper src={reviewlensipadlandscapeclick} alt="reviewing" />
          </PhotoContainer>
          <WalkthroughDescription>
            Future feature to let users give reviews to lenses and example images. Also let them
            upload images for that lens.
          </WalkthroughDescription>
        </WalkthroughCard>
        <WalkthroughCard onClick={() => changeViews('editProfile')}>
          <WalkthroughTitle>Editing Profile</WalkthroughTitle>
          <PhotoContainer>
            <IpadPhotoswiper src={editprofilelandscapeclick} alt="editing" />
          </PhotoContainer>
          <WalkthroughDescription>
            Users can edit their profiles by opening the sidebar and clicking on the profile card on
            top. Live updates are shown as edites are made.
          </WalkthroughDescription>
        </WalkthroughCard>
        <WalkthroughCard onClick={() => changeViews('suggestions')}>
          <WalkthroughTitle>Feedback and Suggestions</WalkthroughTitle>
          <PhotoContainer>
            <IpadPhotoswiper src={feedbackipadlandscapeclick} alt="suggestions" />
          </PhotoContainer>
          <WalkthroughDescription>
            Do you have feedback or suggestions for the Nextlens Platform? We'd love to hear your
            thoughts!
          </WalkthroughDescription>
        </WalkthroughCard>
      </WalkthroughContainer>
    </Container>
  );
};

export default OnBoard;
