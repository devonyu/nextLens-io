import React from 'react';
import { Button, Container, Grid, Segment, Icon, Divider } from 'semantic-ui-react';

const Footer = () => (
  <Container id="footer" fluid>
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
  </Container>
);

export default Footer;
