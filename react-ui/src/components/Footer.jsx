import React from 'react';
import styled from 'styled-components';
// import { Button, Container, Grid, Segment, Icon, Divider } from 'semantic-ui-react';
import { Icon } from 'semantic-ui-react';

const FooterContainer = styled.div`
  background-color: #1b1c1d;
  display: flex;
  justify-content: space-between;
  height: 30px;
  position: static;
`;

const FooterSide = styled.div`
  width: 100%;
  background-color: #1b1c1d;
  border: none !important;
  color: white;
  display: flex;
  justify-content: center;
`;

const SocialIcons = styled.a`
  padding-right: 2em;
  color: white;
`;

const Footer = () => (
  <FooterContainer>
    <FooterSide>
      <SocialIcons href="https://nextlens.io">
        <Icon name="camera retro" />
        <span>2020 Nextlens.io</span>
      </SocialIcons>
    </FooterSide>
    <FooterSide>
      <SocialIcons href="https://github.com/devonyu/nextLens-io">
        <Icon name="github" />
      </SocialIcons>
      <SocialIcons href="https://www.facebook.com/nextlens.io/">
        <Icon name="facebook" />
      </SocialIcons>
      <SocialIcons href="https://www.instagram.com/nextlens.io/">
        <Icon name="instagram" />
      </SocialIcons>
      <SocialIcons href="https://twitter.com/nextlens">
        <Icon name="twitter" />
      </SocialIcons>
    </FooterSide>
  </FooterContainer>
);

export default Footer;

/* <Container id="footer" fluid>
<Grid columns={2} relaxed>
  <Grid.Column id="ft1" inverted="true">
    <Segment basic inverted>
      <Icon name="camera retro" />
      <a href="https://www.nextlens.io">© 2018 NextLens.io</a>
    </Segment>
  </Grid.Column>

  <Divider vertical fitted />

  <Grid.Column id="ft2" inverted="true">
    <Segment basic inverted>
      <Button
        circular
        color="facebook"
        icon="facebook"
        href="https://www.facebook.com/nextlens.io/"
      />
      <Button
        circular
        color="grey"
        icon="github"
        href="https://github.com/devonyu/nextLens-io"
      />
      <Button circular color="twitter" icon="twitter" href="https://twitter.com/nextlens" />
      <Button
        circular
        color="instagram"
        icon="instagram"
        href="https://www.instagram.com/nextlens.io/"
      />
    </Segment>
  </Grid.Column>
</Grid>
</Container> */
