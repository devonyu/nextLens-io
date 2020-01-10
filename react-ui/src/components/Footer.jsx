import React from 'react';
import styled from 'styled-components';
import { Icon, Button, Header, Image, Menu, Modal } from 'semantic-ui-react';

const FooterContainer = styled.div`
  background-color: black;
  border: none !important;
  display: flex;
  justify-content: space-between;
  height: 30px;
`;

const FooterSide = styled.div`
  width: 100%;
  background-color: black;
  border: none !important;
  color: white;
  display: flex;
  justify-content: center;
`;

const SocialIcons = styled.a`
  padding-right: 2em;
  color: white;
  cursor: pointer;
  :hover {
    color: red;
  }
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
      <Modal
        dimmer="blurring"
        trigger={
          <SocialIcons>
            <Icon name="code" />
          </SocialIcons>
        }
        closeIcon
      >
        <Modal.Header>Developed by Devon Yu</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Image
              id="About"
              wrapped
              size="small"
              src="https://devonyu.com/pf2.png"
              circular
              centered
            />
            <Header>
              I wanted to create an application to help new photographers find their next lens
            </Header>
            <p>Built using React, Node+Express, PostgreSQL, Deployed with Heroku</p>
            <p>
              Are you Hiring? Checkout my{' '}
              <a href="https://devonyu.com" target="_blank" rel="noopener noreferrer">
                portfolio
              </a>
              , Download my{' '}
              <a
                href="https://devonyu.com/devonyuresume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download="true"
              >
                Resume!
              </a>
            </p>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    </FooterSide>
  </FooterContainer>
);

export default Footer;
